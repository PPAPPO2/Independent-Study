import requests
from django.core.management.base import BaseCommand
from cat.models import T1_TeamSteanding24_25

class Command(BaseCommand):
    help = 'Fetch and import team standings from T1 League API'

    def handle(self, *args, **kwargs):
        # T1 League API URL
        url = 'https://api.tpbl.basketball/api/divisions/2/games/standings'
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        }

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            self.stdout.write(self.style.ERROR('Failed to fetch data from API'))
            return

        standings_data = response.json()

        # 清空現有數據
        T1_TeamSteanding24_25.objects.all().delete()

        # 遍歷 API 回傳的每支球隊資料
        for team_data in standings_data:
            try:
                # 提取所需欄位
                team_name = team_data['team']['name']
                rank = team_data['rank']
                games_played = (
                    team_data['won_score'] + team_data['lost_score']
                )
                wins = team_data['score_won_matches']
                losses = team_data['score_lost_matches']
                pct = f"{team_data['score_ratio']:.3f}"
                games_behind = team_data.get('games_behind', '0')
                streaks = team_data.get('streaks', '-')

                # 儲存至資料庫
                T1_TeamSteanding24_25.objects.create(
                    rank=rank,
                    team_name=team_name,
                    games_played=games_played,
                    wins=wins,
                    losses=losses,
                    pct=pct,
                    games_behind=games_behind,
                    wins_losses_streak=streaks
                )
            except Exception as e:
                print(f"跳過資料：{team_data['team']['name']}，錯誤：{e}")

        self.stdout.write(self.style.SUCCESS('Successfully imported T1 League standings'))
