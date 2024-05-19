# standings/management/commands/import_standings.py
import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import TeamStanding20_21, TeamStanding21_22, TeamStanding22_23, TeamStanding23_24

class Command(BaseCommand):
    help = 'Fetch and import team standings from P.League+'

    def handle(self, *args, **kwargs):
        url = 'https://pleagueofficial.com/standings/2023-24'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}
        response = requests.get(url, headers=headers)

        soup = BeautifulSoup(response.text, "html.parser")
        data = [th.text for th in soup.find_all('tr')]
        # 清空現有數據
        TeamStanding23_24.objects.all().delete()

        # 爬取並存儲數據
        data = [th.text for th in soup.find_all('tr')]
        body = []
        for i in range(1,7):
            temp_body = data[i].split('\n')
            temp_body = temp_body[1:9]
            body = body + [temp_body]

        for row in body:
            TeamStanding23_24.objects.create(
                rank = int(row[0]),
                team_name = row[1],
                games_played = int(row[2]),
                wins = int(row[3]),
                losses = int(row[4]),
                pct = row[5],
                games_behind = (row[6]),
                wins_losses_streak = row[7],
            )
        # print(body)
        self.stdout.write(self.style.SUCCESS('Successfully imported team standings'))
