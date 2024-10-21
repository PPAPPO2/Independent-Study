import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import P_Season_Teams_Final_Performance_23_24,P_Season_Teams_Final_Performance_22_23
import pandas as pd
import json
import re
class Command(BaseCommand):

    # 命令的簡短說明
    help = 'Fetch and import team standings from P'

    def handle(self, *args, **kwargs):
        # 爬取JSON檔案的URL
        year = '2022-23'
        url = f'https://pleagueofficial.com/stat-team/{year}/4#record'
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

        # 刪除現有的P_TeamStanding模型實例
        P_Season_Teams_Final_Performance_22_23.objects.all().delete()

        #創建一個P_TeamStandingxx_xx模型
        # 遍歷JSON數據

        # 讓'28.43' 變成 28.43
        def convert_to_float(data):
            for key, value in data.items():
                try:
                    data[key] = float(value.replace('%', '').replace(',', ''))
                except ValueError:
                    pass
            return data
        temp = [convert_to_float(item) for item in temp]

        # 提取球隊名稱前面的數字
        def extract_team_name(raw_name):
            match = re.search(r'\d+(.*)', raw_name)  # 匹配以數字開頭後面所有文字
            if match:
                return match.group(1).strip()
            return raw_name  # 如果沒有匹配到，返回原始名稱
        
        for FINAL_data in temp:
            # 總命中數
            total_made = FINAL_data["兩分命中"] + FINAL_data["三分命中"]
            # 總出手數
            total_attempts = FINAL_data["兩分出手"] + FINAL_data["三分出手"]
            
            # 防止除零錯誤
            if total_attempts == 0:
                All_goals_pct = 0
            else:
                All_goals_pct = round(total_made / total_attempts, 2)

            #創建一個T1_TeamStanding模型實例
            P_Season_Teams_Final_Performance_22_23.objects.create(
            team = extract_team_name(FINAL_data['球隊']),

            All_goals_made = round(FINAL_data["兩分命中"]+FINAL_data["三分命中"],1),
            All_goals = round(FINAL_data["兩分出手"]+FINAL_data["三分出手"], 1),
            All_goals_pct = All_goals_pct,
            #兩分球數據
            field_goals_two_made = round(FINAL_data["兩分命中"],1),
            field_goals_two = round(FINAL_data["兩分出手"],1),
            field_goals_two_pct = round(float(FINAL_data["兩分%"])/100,2),
            #三分球數據
            field_goals_three_made = round(FINAL_data["三分命中"],1),
            field_goals_three= round(FINAL_data["三分出手"], 1),
            field_goals_three_pct = round(float(FINAL_data["三分%"])/100,2),
            #罰球數據
            free_throws_made = round(FINAL_data["罰球命中"],1),
            free_throws = round(FINAL_data["罰球出手"],1),
            free_throws_pct = round(float(FINAL_data['罰球%'])/100,2),
            #其他數據
            points = round(FINAL_data["得分"],1),
            offensive_rebounds = round(FINAL_data["攻板"],1),
            defensive_rebounds = round(FINAL_data["防板"],1),
            rebounds = round(FINAL_data["籃板"],1),
            assists = round(FINAL_data["助攻"],1),
            steals = round(FINAL_data["抄截"],1),
            blocks = round(FINAL_data["阻攻"],1),
            turnovers = round(FINAL_data["失誤"],1),
            fouls = round(FINAL_data["犯規"],1),
            )