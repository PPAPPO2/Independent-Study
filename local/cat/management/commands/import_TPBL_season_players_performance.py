import requests
from django.core.management.base import BaseCommand
from cat.models import TPBL_Season_Players_Performance_24_25
import json
from datetime import datetime, timedelta
from django.db import connection
import os

class Command(BaseCommand):
    help = 'Fetch and import average player statistics from TPBL API'

    def handle(self, *args, **kwargs):
        # API URL
        url = 'https://api.tpbl.basketball/api/games/stats/players?division_id=2'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}

        # Fetch the data from API
        response = requests.get(url, headers=headers)

        # 檢查狀態碼，確保 API 請求成功
        if response.status_code != 200:
            self.stdout.write(self.style.ERROR(f"Failed to fetch data: {response.status_code}"))
            self.stdout.write(self.style.ERROR(f"Response content: {response.text}"))
            return

        # 將 JSON 解析為 Python 字典
        try:
            data = json.loads(response.text)
        except json.JSONDecodeError:
            self.stdout.write(self.style.ERROR("Failed to decode JSON"))
            self.stdout.write(self.style.ERROR(f"Response content: {response.text}"))
            return

        # 清除現有資料
        TPBL_Season_Players_Performance_24_25.objects.all().delete()

        # Helper function to convert seconds to HH:MM:SS format
        def get_time(seconds):
            if isinstance(seconds, (int, float)):
                time_delta = timedelta(seconds=seconds)
                hours, remainder = divmod(int(time_delta.total_seconds()), 3600)
                minutes, seconds = divmod(remainder, 60)
                return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
            else:
                return "00:00:00"

        # Helper function to map positions
        def map_position(position):
            if position in ["PointGuardAndShootingGuard", "ShootingGuard", "PointGuard"]:
                return "G"
            elif position in ["SmallForwardAndPowerForward", "SmallForward"]:
                return "F"
            elif position in ["Center", "PowerForward"]:
                return "C"
            return position

        # Directory for images
        image_dir = os.path.join('frontend', 'public', 'images', 'players')
        os.makedirs(image_dir, exist_ok=True)

        # Process each player's data
        for player_stats in data:
            player = player_stats["player"]
            average_stats = player_stats["average_stats"]
            percentage_stats = player_stats["percentage_stats"]

            # Calculating total field goals made and attempted
            total_made = average_stats["field_goals_made"]
            total_attempts = average_stats["field_goals_attempted"]

            # Map the player's position
            _position = map_position(player["meta"]["position"])

            # Avoid division by zero error
            All_goals_pct = round(total_made / total_attempts, 2) if total_attempts > 0 else 0

            # Download and save player image
            image_url = player["images"][0]["url"] if player["images"] else None
            if image_url:
                image_name = f"{player['name']}.png"
                image_path = os.path.join(image_dir, image_name)
                img_response = requests.get(image_url)
                if img_response.status_code == 200:
                    with open(image_path, 'wb') as img_file:
                        img_file.write(img_response.content)

            # Create a new TPBL_Season_Players_Performance_24_25 entry
            TPBL_Season_Players_Performance_24_25.objects.create(
                player=player["name"],
                jersey=int(player["number"]) if player["number"].isdigit() else 0,
                position=_position,
                team=player["team"]["name"],
                points=round(average_stats["score"], 1),
                game_played=player_stats["game_count"],
                minutes=get_time(average_stats["time_on_court"]),
                All_goals_made=round(total_made, 1),
                All_goals=round(total_attempts, 1),
                All_goals_pct=All_goals_pct,
                # Two pointers data
                field_goals_two_made=round(average_stats["two_pointers_made"], 1),
                field_goals_two=round(average_stats["two_pointers_attempted"], 1),
                field_goals_two_pct=float(percentage_stats["two_pointers_percentage"]) / 100,
                # Three pointers data
                field_goals_three_made=round(average_stats["three_pointers_made"], 1),
                field_goals_three=round(average_stats["three_pointers_attempted"], 1),
                field_goals_three_pct=float(percentage_stats["three_pointers_percentage"]) / 100,
                # Free throws data
                free_throws_made=round(average_stats["free_throws_made"], 1),
                free_throws=round(average_stats["free_throws_attempted"], 1),
                free_throws_pct=float(percentage_stats["free_throws_percentage"]) / 100,
                # Other stats
                offensive_rebounds=round(average_stats["offensive_rebounds"], 1),
                defensive_rebounds=round(average_stats["defensive_rebounds"], 1),
                rebounds=round(average_stats["rebounds"], 1),
                assists=round(average_stats["assists"], 1),
                steals=round(average_stats["steals"], 1),
                blocks=round(average_stats["blocks"], 1),
                turnovers=round(average_stats["turnovers"], 1),
                fouls=round(average_stats["fouls"], 1),
            )

        self.stdout.write(self.style.SUCCESS('Successfully fetched and imported average player statistics from TPBL'))
