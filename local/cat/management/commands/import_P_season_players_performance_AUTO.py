import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import P_Season_Players_Performance_24_25
from datetime import datetime
import pandas as pd
import json
from django.db import connection

class Command(BaseCommand):
    help = 'Fetch and import player statistics from P League+ for season 2024-25'

    def handle(self, *args, **kwargs):
        # 爬取資料的年份和網址
        year = '2024-25'
        url = f'https://pleagueofficial.com/stat-player/{year}/2#record'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}

        # 發送GET請求並獲取響應
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            self.stdout.write(self.style.ERROR(f"Failed to fetch data: {response.status_code}"))
            return

        # 使用BeautifulSoup解析HTML
        soup = BeautifulSoup(response.text, "html.parser")
        datas = soup.find("table", {'id': 'main-table'})

        # 提取表頭和數據行
        header = [th.get_text(strip=True) for th in datas.find('thead').find_all('th')]
        rows = []
        for tr in datas.find('tbody').find_all('tr'):
            cells = [td.get_text(strip=True) for td in tr.find_all('td')]
            team_name = tr.find('th').get_text(strip=True)
            row = [team_name] + cells
            rows.append(row)

        # 將數據轉換為DataFrame
        df = pd.DataFrame(rows, columns=header)

        # 將DataFrame轉換為JSON格式
        data = df.to_json(orient='records', force_ascii=False)
        temp = json.loads(data)

        # 刪除現有數據
        P_Season_Players_Performance_24_25.objects.all().delete()

        # 將百分比和數字格式轉換為浮點數
        def convert_to_float(data):
            for key, value in data.items():
                try:
                    data[key] = float(value.replace('%', '').replace(',', ''))
                except (ValueError, AttributeError):
                    pass
            return data

        temp = [convert_to_float(item) for item in temp]

        # 解析分鐘數為時間格式
        def get_time(time_str):
            try:
                # 嘗試直接將 MM:SS 格式解析
                return datetime.strptime(time_str, "%M:%S").time()
            except ValueError:
                try:
                    # 如果 MM:SS 解析失敗，嘗試將時間補足為 HH:MM:SS 格式
                    return datetime.strptime("00:" + time_str, "%H:%M:%S").time()
                except ValueError:
                    # 若解析失敗，返回預設值 "00:00:00"
                    return datetime.strptime("00:00:00", "%H:%M:%S").time()


        # 重設自增ID列
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM sqlite_sequence WHERE name = 'cat_p_season_players_performance_24_25';")

        # 遍歷JSON數據並儲存至資料庫
        for rosters in temp:
            total_made = rosters.get("兩分命中", 0) + rosters.get("三分命中", 0)
            total_attempts = rosters.get("兩分出手", 0) + rosters.get("三分出手", 0)
            All_goals_pct = round(total_made / total_attempts, 2) if total_attempts > 0 else 0

            # 建立資料庫記錄
            P_Season_Players_Performance_24_25.objects.create(
                player=rosters.get("球員", ""),
                jersey=int(rosters.get("背號", 0)),
                team=rosters.get("球隊", ""),
                points=round(rosters.get("得分", 0), 1),
                game_played=rosters.get("出賽次數", 0),
                minutes=get_time(rosters.get("時間 (分)", "00:00")),
                All_goals_made=round(total_made, 1),
                All_goals=round(total_attempts, 1),
                All_goals_pct=All_goals_pct,
                # 兩分球數據
                field_goals_two_made=round(rosters.get("兩分命中", 0), 1),
                field_goals_two=round(rosters.get("兩分出手", 0) + rosters.get("兩分命中", 0), 1),
                field_goals_two_pct=round(float(rosters.get('兩分%', 0)) / 100, 2),
                # 三分球數據
                field_goals_three_made=round(rosters.get("三分命中", 0), 1),
                field_goals_three=round(rosters.get("三分出手", 0) + rosters.get("三分命中", 0), 1),
                field_goals_three_pct=round(float(rosters.get('三分%', 0)) / 100, 2),
                # 罰球數據
                free_throws_made=round(rosters.get("罰球命中", 0), 1),
                free_throws=round(rosters.get("罰球出手", 0) + rosters.get("罰球命中", 0), 1),
                free_throws_pct=round(float(rosters.get('罰球%', 0)) / 100, 2),
                # 其他數據
                offensive_rebounds=round(rosters.get("攻板", 0), 1),
                defensive_rebounds=round(rosters.get("防板", 0), 1),
                rebounds=round(rosters.get("籃板", 0), 1),
                assists=round(rosters.get("助攻", 0), 1),
                steals=round(rosters.get("抄截", 0), 1),
                blocks=round(rosters.get("阻攻", 0), 1),
                turnovers=round(rosters.get("失誤", 0), 1),
                fouls=round(rosters.get("犯規", 0), 1),
            )

        self.stdout.write(self.style.SUCCESS(f'Successfully fetched and imported player statistics from P League+ for {year}'))
