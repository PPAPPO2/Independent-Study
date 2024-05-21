import requests
import json
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import T1_TeamStanding20_21, T1_TeamStanding21_22, T1_TeamStanding22_23, T1_TeamStanding23_24


class Command (BaseCommand):
    help = 'Fetch and import team standings from T1'
    def handle(self, *args, **kwargs):
        url = 'https://api.t1league.basketball/season/1/stages/2/teams'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}
        response = requests.get(url, headers=headers)
        data = json.loads(response.text)
        T1_TeamStanding21_22.objects.all().delete()
        last_team = None
        for team in data:
            T1_TeamStanding21_22.objects.create(
                rank = team["rank"],
                team_name = team["team_name"],
                games_played = team["win_count"]+team["loss_count"],
                wins =  team["win_count"],
                losses = team["loss_count"],
                pct = f'{int(team["win_count"] / (team["win_count"]+ team["loss_count"]) * 100)}%',
                games_behind = last_team["win_count"] - team["win_count"] if last_team is not None else 0,
                wins_losses_streak = team["win_lose_status"],
            )
            last_team = team
        # soup = BeautifulSoup(response.text, "html.parser")
        # print(soup.find_all('tr'))
        # data = [th.text for th in soup.find_all('tr')]
        # print(data ,len(data))
        #清空現有數據
        
"""      body = []
        for i in range(1,6):
            temp_body = data[i].split('\n')
            temp_body = temp_body[1:8]
            body = body + [temp_body]

        for row in body:
            T1_TeamStanding23_24.objects.create(
                rank = int(row[0]),
                team_name = row[1],
                games_played = int(row[2]),
                wins = int(row[3]),
                losses = int(row[4]),
                games_behind = (row[5]),
                wins_losses_streak = row[6],
            )
        # print(body)
        self.stdout.write(self.style.SUCCESS('Successfully imported team standings'))
        """