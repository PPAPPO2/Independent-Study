import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import T1_Season_teams_Performance_21_22, T1_Season_teams_Performance_22_23, T1_Season_teams_Performance_23_24
from datetime import datetime
from decimal import Decimal
import json
from datetime import timedelta
class Command(BaseCommand):

    # 命令的簡短說明
    help = 'Fetch and import team standings from T1'

    def handle(self, *args, **kwargs):
        # 爬取JSON檔案的URL
        url = 'https://api.t1league.basketball/season/4/stages/13/teams'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}

        # 發送GET請求並獲取響應
        response = requests.get(url, headers=headers)
        # 將響應內容從JSON格式轉換為Python字典
        data = json.loads(response.text)
        # 刪除現有的T1_TeamStanding21_22模型實例
        T1_Season_teams_Performance_23_24.objects.all().delete()
        def get_time(seconds):
            return str(timedelta(seconds=int(seconds)))
        # 遍歷JSON數據
        for team in data:
            averages = team["averages"]
            for FINAL_data in averages:
                FINAL_data = averages["all"]["FINAL"]
            #創建一個T1_TeamStanding21_22模型實例
            T1_Season_teams_Performance_23_24.objects.create(
            team = FINAL_data["team_name_alt"],
            gp = FINAL_data["gp"],
            minutes=get_time(FINAL_data["seconds"]),# 使用自定義函數轉換時間格式
            #總出手，命中，機率
            All_goals = FINAL_data["two_m"]+FINAL_data["two_a"]+FINAL_data["trey_m"]+FINAL_data["trey_a"],
            All_goals_made = FINAL_data["two_m"]+FINAL_data["trey_m"],
            All_goals_pct = FINAL_data["two_pct"]+FINAL_data["trey_pct"],
            #兩分球數據
            field_goals_two = FINAL_data["two_m"]+FINAL_data["two_a"],
            field_goals_two_made = FINAL_data["two_m"],
            field_goals_two_pct = FINAL_data["two_pct"],
            #三分球數據
            field_goals_three= FINAL_data["trey_m"] + FINAL_data["trey_a"],
            field_goals_three_made = FINAL_data["trey_m"],
            field_goals_three_pct = FINAL_data["trey_pct"],
            #罰球數據
            free_throws = FINAL_data["ft_m"] + FINAL_data["ft_a"] ,
            free_throws_attempts = FINAL_data["ft_a"],
            free_throws_pct = FINAL_data["ft_pct"],
            #其他數據
            points = FINAL_data["points"],
            offensive_rebounds = FINAL_data["reb_o"],
            defensive_rebounds = FINAL_data["reb_d"],
            rebounds = FINAL_data["reb"],
            assists = FINAL_data["ast"],
            steals = FINAL_data["stl"],
            blocks = FINAL_data["blk"],
            turnovers = FINAL_data["turnover"],
            fouls = FINAL_data["pfoul"],
            )
