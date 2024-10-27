import requests
from django.core.management.base import BaseCommand
from cat.models import TPBL_Season_Players_Performance_24_25
import json
from datetime import datetime, timedelta
from django.db import connection

class Command(BaseCommand):
    help = 'Fetch and import player statistics from TPBL API'

    def handle(self, *args, **kwargs):
        # API URL
        url = 'https://api.tpbl.basketball/api/divisions/2/games/players/stats'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}

        # Fetch the data from API
        response = requests.get(url, headers=headers)
        data = json.loads(response.text)

        # Delete old data
        TPBL_Season_Players_Performance_24_25.objects.all().delete()

        def get_time(seconds):
            """Convert seconds to HH:MM:SS format."""
            if isinstance(seconds, (int, float)):
                time_delta = timedelta(seconds=seconds)
                hours, remainder = divmod(int(time_delta.total_seconds()), 3600)
                minutes, seconds = divmod(remainder, 60)
                return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
            else:
                try:
                    return datetime.strptime(seconds, "%H:%M:%S").time().strftime("%H:%M:%S")
                except ValueError:
                    return "00:00:00"

        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM sqlite_sequence WHERE name = 'cat_tpbl_season_players_performance_24_25';")

        # Function to map player positions to G, F, or C
        def map_position(position):
            if position in ["PointGuardAndShootingGuard", "ShootingGuard", "PointGuard"]:
                return "G"
            elif position in ["SmallForwardAndPowerForward", "SmallForward"]:
                return "F"
            elif position in ["Center", "PowerForward"]:
                return "C"
            else:
                return position  # Return the original if it doesn't match

        # Iterate over players data in API response
        for player_stats in data:
            player = player_stats["player"]
            accumulated_stats = player_stats["accumulated_stats"]
            percentage_stats = player_stats["percentage_stats"]

            # Calculating total field goals made and attempted
            total_made = accumulated_stats["field_goals_made"]
            total_attempts = accumulated_stats["field_goals_attempted"]

            # Map the player's position
            _position = map_position(player["meta"]["position"])

            # Avoid division by zero error
            if total_attempts == 0:
                All_goals_pct = 0
            else:
                All_goals_pct = round(total_made / total_attempts, 2)

            # Create a new TPBL_Season_Players_Performance_24_25 entry
            TPBL_Season_Players_Performance_24_25.objects.create(
                player=player["name"],
                jersey=int(player["number"]) if player["number"].isdigit() else 0,
                position=_position,
                team=player["team"]["name"],
                points=round(accumulated_stats["score"], 1),
                game_played=player_stats["game_count"],
                minutes=get_time(accumulated_stats["time_on_court"]),
                All_goals_made=round(total_made, 1),
                All_goals=round(total_attempts, 1),
                All_goals_pct=All_goals_pct,
                # Two pointers data
                field_goals_two_made=round(accumulated_stats["two_pointers_made"], 1),
                field_goals_two=round(accumulated_stats["two_pointers_attempted"], 1),
                field_goals_two_pct=float(percentage_stats["two_pointers_percentage"]) / 100,
                # Three pointers data
                field_goals_three_made=round(accumulated_stats["three_pointers_made"], 1),
                field_goals_three=round(accumulated_stats["three_pointers_attempted"], 1),
                field_goals_three_pct=float(percentage_stats["three_pointers_percentage"]) / 100,
                # Free throws data
                free_throws_made=round(accumulated_stats["free_throws_made"], 1),
                free_throws=round(accumulated_stats["free_throws_attempted"], 1),
                free_throws_pct=float(percentage_stats["free_throws_percentage"]) / 100,
                # Other stats
                offensive_rebounds=round(accumulated_stats["offensive_rebounds"], 1),
                defensive_rebounds=round(accumulated_stats["defensive_rebounds"], 1),
                rebounds=round(accumulated_stats["rebounds"], 1),
                assists=round(accumulated_stats["assists"], 1),
                steals=round(accumulated_stats["steals"], 1),
                blocks=round(accumulated_stats["blocks"], 1),
                turnovers=round(accumulated_stats["turnovers"], 1),
                fouls=round(accumulated_stats["fouls"], 1),
            )

        self.stdout.write(self.style.SUCCESS('Successfully fetched and imported player statistics from TPBL'))
