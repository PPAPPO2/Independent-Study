import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import P_TeamStanding24_25

class Command(BaseCommand):
    help = 'Fetch and import team standings from P.League+ 2024-25 season'

    def handle(self, *args, **kwargs):
        url = 'https://pleagueofficial.com/standings/2024-25'
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        }
        response = requests.get(url, headers=headers)

        # 檢查是否成功獲取網頁
        if response.status_code != 200:
            self.stdout.write(self.style.ERROR(f"Failed to fetch the webpage, status code: {response.status_code}"))
            return

        soup = BeautifulSoup(response.text, "html.parser")

        # 找到包含戰績表格的 HTML 節點
        table = soup.find('table', class_='table table-dark team_ranking')
        if not table:
            self.stdout.write(self.style.ERROR("Table not found on the webpage"))
            return

        rows = table.find_all('tr')[1:]  # 跳過表頭行

        # 清空現有的戰績數據
        P_TeamStanding24_25.objects.all().delete()

        for row in rows:
            columns = row.find_all('td')
            if len(columns) < 8:
                self.stdout.write(self.style.WARNING("Skipping row due to insufficient columns"))
                continue

            try:
                rank = int(columns[0].text.strip())
                team_name = columns[1].text.strip()
                games_played = int(columns[2].text.strip())
                wins = int(columns[3].text.strip())
                losses = int(columns[4].text.strip())
                pct = columns[5].text.strip().replace('%', '')
                pct = float(pct) / 100 if pct else 0.0
                games_behind = columns[6].text.strip()
                wins_losses_streak = columns[7].text.strip()

                # 匯入資料到資料庫
                P_TeamStanding24_25.objects.create(
                    rank=rank,
                    team_name=team_name,
                    games_played=games_played,
                    wins=wins,
                    losses=losses,
                    pct=pct,
                    games_behind=games_behind,
                    wins_losses_streak=wins_losses_streak
                )

            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error in data conversion: {e}"))
                continue

        self.stdout.write(self.style.SUCCESS('Successfully imported team standings'))
