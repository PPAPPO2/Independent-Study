# standings/management/commands/import_standings.py
import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import P_Season_Players_Performance_20_21, P_Season_Players_Performance_21_22, P_Season_Players_Performance_22_23, P_Season_Players_Performance_23_24
from datetime import datetime
from decimal import Decimal

class Command(BaseCommand):
    
    def handle(self, *args, **kwargs):
        url = 'https://pleagueofficial.com/stat-player/2023-24/2#record'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}
        response = requests.get(url, headers=headers)

        soup = BeautifulSoup(response.text, "html.parser")
        data = [th.text.strip('\n').split() for th in soup.find_all('tr')]
        temp = data[1:]
        # 清空現有數據
        P_Season_Players_Performance_23_24.objects.all().delete()

        def get_time(time_str):
            try:
                temp = datetime.strptime(time_str, "%M:%S").time()
            except ValueError:
                temp = time_str+'00'
                temp = datetime.strptime(temp, '%M:%S').time()
            return temp
        
        for row in temp:
            P_Season_Players_Performance_23_24.objects.create(
                player = row[0],
                jersey = int(row[1]),
                team = row[2],
                games_played = int(row[3]),
                minutes = get_time(row[4]), # 使用自定義函數轉換時間格式
                field_goals_two=Decimal(row[5]),
                field_goals_two_attempts=Decimal(row[6]),
                field_goals_two_pct=Decimal(row[7].strip('%')) / 100,
                field_goals_three=Decimal(row[8]),
                field_goals_three_attempts=Decimal(row[9]),
                field_goals_three_pct=Decimal(row[10].strip('%')) / 100,
                free_throws=Decimal(row[11]),
                free_throws_attempts=Decimal(row[12]),
                free_throws_pct=Decimal(row[13].strip('%')) / 100,
                points=Decimal(row[14]),
                offensive_rebounds=Decimal(row[15]),
                defensive_rebounds=Decimal(row[16]),
                rebounds=Decimal(row[17]),
                assists=Decimal(row[18]),
                steals=Decimal(row[19]),
                blocks=Decimal(row[20]),
                turnovers=Decimal(row[21]),
                fouls=Decimal(row[22]),
            )
        # print(body)
        self.stdout.write(self.style.SUCCESS('Successfully imported team standings'))
