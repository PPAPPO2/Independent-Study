# standings/management/commands/import_standings.py
import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import P_Season_Players_Performance_20_21, P_Season_Players_Performance_21_22, P_Season_Players_Performance_22_23, P_Season_Players_Performance_23_24
from datetime import datetime
from decimal import Decimal
import pandas as pd
import json

class Command(BaseCommand):
    
    def handle(self, *args, **kwargs):
        year = '2020-21'
        url = f'https://pleagueofficial.com/stat-player/{year}/2#record'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}

        # 發送GET請求並獲取響應
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, "html.parser")
        datas = soup.find("table", {'id': 'main-table'})

        header = [th.get_text(strip=True) for th in datas.find('thead').find_all('th')]

        # 獲取表格內容
        rows = []
        for tr in datas.find('tbody').find_all('tr'):
            cells = [td.get_text(strip=True) for td in tr.find_all('td')]
            team_name = tr.find('th').get_text(strip=True)
            row = [team_name] + cells
            rows.append(row)

        df = pd.DataFrame(rows, columns=header)

        # 將 DataFrame 轉換為 JSON 並存檔
        data = df.to_json(orient='records', force_ascii=False)
        # print(data)
        # 將響應內容從JSON格式轉換為Python字典
        temp = json.loads(data)
        # 清空現有數據
        P_Season_Players_Performance_20_21.objects.all().delete()

        def convert_to_float(data):
            for key, value in data.items():
                try:
                    data[key] = float(value.replace('%', '').replace(',', ''))
                except ValueError:
                    pass
            return data
        temp = [convert_to_float(item) for item in temp]

        def get_time(time_str):
            try:
                temp = datetime.strptime(time_str, "%M:%S").time()
            except ValueError:
                temp = time_str+'00'
                temp = datetime.strptime(temp, '%M:%S').time()
            return temp
        
# 遍歷JSON數據
        for rosters in temp:
            # 計算總命中數和總出手數
            total_made = rosters["兩分命中"] + rosters["三分出手"]
            total_attempts = rosters["兩分出手"] + rosters["三分出手"]
            
            # 防止除零錯誤
            if total_attempts == 0:
                All_goals_pct = 0
            else:
                All_goals_pct = round(total_made / total_attempts, 2)

            # 創建一個T1_Season_Players_Performance模型實例
            P_Season_Players_Performance_20_21.objects.create(
                player=rosters["球員"],
                jersey=rosters["背號"],
                team=rosters["球隊"],
                points=round(rosters["得分"], 1),
                # minutes = get_time(rosters["時間 (分)"]),
                All_goals_made=round(total_made, 1),
                All_goals=round(total_attempts, 1),
                All_goals_pct=All_goals_pct,
                # 兩分球數據
                field_goals_two_made=round(rosters["兩分命中"], 1),
                field_goals_two=round(rosters["兩分出手"] + rosters["兩分命中"], 1),
                field_goals_two_pct=rosters['兩分%'],
                # 三分球數據
                field_goals_three_made=round(rosters["三分命中"], 1),
                field_goals_three=round(rosters["三分出手"] + rosters["三分命中"], 1),
                field_goals_three_pct=rosters['三分%'],
                # 罰球數據
                free_throws_made=round(rosters["罰球命中"], 1),
                free_throws=round(rosters["罰球出手"] + rosters["罰球命中"], 1),
                free_throws_pct=rosters['罰球%'],
                # 其他數據
                offensive_rebounds=round(rosters["攻板"], 1),
                defensive_rebounds=round(rosters["防板"], 1),
                rebounds=round(rosters["籃板"], 1),
                assists=round(rosters["助攻"], 1),
                steals=round(rosters["抄截"], 1),
                blocks=round(rosters["阻攻"], 1),
                turnovers=round(rosters["失誤"], 1),
                fouls=round(rosters["犯規"], 1),
            )

        self.stdout.write(self.style.SUCCESS(f'Successfully fetched and imported team standings from P in {year}'))
