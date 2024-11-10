# standings/management/commands/import_standings.py
import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import P_TeamStanding20_21, P_TeamStanding21_22, P_TeamStanding22_23, P_TeamStanding23_24,P_TeamStanding24_25

class Command(BaseCommand):
    help = 'Fetch and import team standings from P.League+'

    def handle(self, *args, **kwargs):
        url = 'https://pleagueofficial.com/standings/2024-25'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}
        response = requests.get(url, headers=headers)

        soup = BeautifulSoup(response.text, "html.parser")
        rows = soup.find_all('tr')
        
        # 清空現有數據
        P_TeamStanding24_25.objects.all().delete()

        body = []
        for row in rows[1:]:  # 跳過表頭行
            columns = row.text.split('\n')[1:9]  # 確保提取正確的數據欄位
            body.append(columns)

        for row in body:
            try:
                P_TeamStanding24_25.objects.create(
                    rank=int(row[0]),
                    team_name=row[1],
                    games_played=int(row[2]),
                    wins=int(row[3]),
                    losses=int(row[4]),
                    pct=row[5],
                    games_behind=row[6],
                    wins_losses_streak=row[7],
                )
            except ValueError as e:
                print(f"Error in data conversion: {e}")
                continue

        self.stdout.write(self.style.SUCCESS('Successfully imported team standings'))
