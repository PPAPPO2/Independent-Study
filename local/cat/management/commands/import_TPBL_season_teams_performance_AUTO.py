import requests
import json
from django.core.management.base import BaseCommand
from cat.models import TPBL_Season_Teams_Performance_24_25

class Command(BaseCommand):

    help = 'Fetch and import average stats of team standings from TPBL API'

    def handle(self, *args, **kwargs):
        url = 'https://api.tpbl.basketball/api/games/stats/teams?division_id=2'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}

        response = requests.get(url, headers=headers)
        data = json.loads(response.text)

        TPBL_Season_Teams_Performance_24_25.objects.all().delete()

        for team in data:
            team_name = team['team']['name']
            average_stats = team.get('average_stats', None)
            percentage_stats = team.get('percentage_stats', None)

            if not average_stats or not percentage_stats:
                self.stdout.write(self.style.WARNING(f'No FINAL data found for team: {team_name}'))
                continue  # 跳過沒有數據的球隊

            total_made = average_stats.get('two_pointers_made', 0) + average_stats.get('three_pointers_made', 0)
            total_attempts = average_stats.get('two_pointers_attempted', 0) + average_stats.get('three_pointers_attempted', 0)

            if total_attempts == 0:
                all_goals_pct = 0
            else:
                all_goals_pct = round(total_made / total_attempts * 100, 2)

            TPBL_Season_Teams_Performance_24_25.objects.create(
                team=team_name,
                points=average_stats.get('won_score', 0),
                All_goals_made=total_made,
                All_goals=total_attempts,
                All_goals_pct=all_goals_pct / 100 if all_goals_pct else 0,  # 除以100
                field_goals_two_made=average_stats.get('two_pointers_made', 0),
                field_goals_two=average_stats.get('two_pointers_attempted', 0),
                field_goals_two_pct=float(percentage_stats.get('two_pointers_percentage', 0)) / 100,  # 除以100
                field_goals_three_made=average_stats.get('three_pointers_made', 0),
                field_goals_three=average_stats.get('three_pointers_attempted', 0),
                field_goals_three_pct=float(percentage_stats.get('three_pointers_percentage', 0)) / 100,  # 除以100
                free_throws_made=average_stats.get('free_throws_made', 0),
                free_throws=average_stats.get('free_throws_attempted', 0),
                free_throws_pct=float(percentage_stats.get('free_throws_percentage', 0)) / 100,  # 除以100
                offensive_rebounds=average_stats.get('offensive_rebounds', 0),
                defensive_rebounds=average_stats.get('defensive_rebounds', 0),
                rebounds=average_stats.get('rebounds', 0),
                assists=average_stats.get('assists', 0),
                steals=average_stats.get('steals', 0),
                blocks=average_stats.get('blocks', 0),
                turnovers=average_stats.get('turnovers', 0),
                fouls=average_stats.get('fouls', 0),
            )


        self.stdout.write(self.style.SUCCESS('Successfully imported team standings data!'))
