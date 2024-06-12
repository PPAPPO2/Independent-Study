import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import T1_Season_Players_Performance_21_22, T1_Season_Players_Performance_22_23, T1_Season_Players_Performance_23_24
from datetime import datetime
from decimal import Decimal
import json
from datetime import timedelta
class Command(BaseCommand):

    # 命令的簡短說明
    help = 'Fetch and import team standings from T1'

    def handle(self, *args, **kwargs):
        # 爬取JSON檔案的URL
        url = 'https://api.t1league.basketball/season/4/stages/13/rosters'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}
        last_roster = None
        # 發送GET請求並獲取響應
        response = requests.get(url, headers=headers)
        # 將響應內容從JSON格式轉換為Python字典
        data = json.loads(response.text)
        # 刪除現有的T1_TeamStanding21_22模型實例
        T1_Season_Players_Performance_23_24.objects.all().delete()
        def get_time(seconds):
            return str(timedelta(seconds=int(seconds)))
        # 用於計算games_behind欄位


        # 遍歷JSON數據
        for roster in data:
            rosters = roster["average"]
            #創建一個T1_TeamStanding21_22模型實例
            T1_Season_Players_Performance_23_24.objects.create(
            player = rosters["name_alt"],
            jersey =  rosters["jersey"],
            team = rosters["team_name_alt"],
            games_played = rosters["gp"],
            minutes=get_time(rosters["seconds"]),# 使用自定義函數轉換時間格式
            #總出手，命中，機率
            All_goals = rosters["two_m"]+rosters["two_a"]+rosters["trey_m"]+rosters["trey_a"],
            All_goals_made = rosters["two_m"]+rosters["trey_m"],
            All_goals_pct = rosters["two_pct"]+rosters["trey_pct"],
            #兩分球數據
            field_goals_two=rosters["two_m"]+rosters["two_a"],
            field_goals_two_made=rosters["two_m"],
            field_goals_two_pct=rosters["two_pct"],
            #三分球數據
            field_goals_three=rosters["trey_m"]+rosters["trey_a"],
            field_goals_three_made=rosters["trey_m"],
            field_goals_three_pct=rosters["trey_pct"],
            #罰球數據
            free_throws=rosters["ft_m"]+rosters["ft_a"] ,
            free_throws_attempts= rosters["ft_a"],
            free_throws_pct=rosters["ft_pct"],
            #其他數據
            points=rosters["points"],
            offensive_rebounds= rosters["reb_o"],
            defensive_rebounds = rosters["reb_d"],
            rebounds=rosters["reb"],
            assists=rosters["ast"],
            steals=rosters["stl"],
            blocks=rosters["blk"],
            turnovers=rosters["turnover"],
            fouls=rosters["pfoul"],
            )
            # 更新last_team變量為當前遍歷的資料
            last_roster = rosters
        