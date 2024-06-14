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

        # 遍歷JSON數據
        for team in data:
            averages = team["averages"]
            for FINAL_data in averages:
                FINAL_data = averages["all"]["FINAL"]
            #創建一個T1_TeamStanding21_22模型實例
            T1_Season_teams_Performance_23_24.objects.create(
            team = FINAL_data["team_name_alt"],

            All_goals_made = round(FINAL_data["two_m"]+FINAL_data["trey_m"],1),
            All_goals = round(FINAL_data["two_m"]+FINAL_data["two_a"]+FINAL_data["trey_m"]+FINAL_data["trey_a"],1),
            All_goals_pct = FINAL_data["two_pct"]+FINAL_data["trey_pct"],
            #兩分球數據
            field_goals_two_made = round(FINAL_data["two_m"],1),
            field_goals_two = round(FINAL_data["two_m"]+FINAL_data["two_a"],1),
            field_goals_two_pct = FINAL_data["two_pct"],
            #三分球數據
             field_goals_three_made = round(FINAL_data["trey_m"],1),
            field_goals_three= round(FINAL_data["trey_m"] + FINAL_data["trey_a"],1),
            field_goals_three_pct = FINAL_data["trey_pct"],
            #罰球數據
            free_throws_made = round(FINAL_data["ft_m"],1),
            free_throws = round(FINAL_data["ft_m"] + FINAL_data["ft_a"] ,1),
            free_throws_pct = FINAL_data["ft_pct"],
            #其他數據
            points = round(FINAL_data["points"],1),
            offensive_rebounds = round(FINAL_data["reb_o"],1),
            defensive_rebounds = round(FINAL_data["reb_d"],1),
            rebounds = round(FINAL_data["reb"],1),
            assists = round(FINAL_data["ast"],1),
            steals = round(FINAL_data["stl"],1),
            blocks = round(FINAL_data["blk"],1),
            turnovers = round(FINAL_data["turnover"],1),
            fouls = round(FINAL_data["pfoul"],1),
            )