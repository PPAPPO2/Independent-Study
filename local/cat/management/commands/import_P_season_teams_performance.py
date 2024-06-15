import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import P_Season_teams_Performance_20_21, P_Season_teams_Performance_21_22, P_Season_teams_Performance_22_23, P_Season_teams_Performance_23_24
import pandas as pd
import json
class Command(BaseCommand):

    # 命令的簡短說明
    help = 'Fetch and import team standings from P'

    def handle(self, *args, **kwargs):
        # 爬取JSON檔案的URL
        year = '2021-22'
        url = f'https://pleagueofficial.com/stat-team/{year}/2#record'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}

        # 發送GET請求並獲取響應
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, "html.parser")
        rows = soup.find("table", {'id': 'main-table'})

        # 獲取表格內容
        data = []
        for tr in rows.find('tbody').find_all('tr'):
            cells = [td.get_text(strip=True) for td in tr.find_all('td')]
            team_name = tr.find('th').get_text(strip=True)
            row = [team_name] + cells
            data.append(row)
        df = pd.DataFrame(rows, columns=headers)

        # 將 DataFrame 轉換為 JSON
        data = df.to_json(orient='records', force_ascii=False)
        # 將響應內容從JSON格式轉換為Python字典
        temp = json.loads(data)
        # 刪除現有的P_TeamStanding21_22模型實例
        P_Season_teams_Performance_20_21.objects.all().delete()

        #創建一個P_TeamStandingxx_xx模型
        for FINAL_data in temp:
            P_Season_teams_Performance_20_21.objects.create(
            team = data["球隊"],

            # 總數據
            All_goals_made = round(FINAL_data["兩分出手"]+FINAL_data["三分出手"],1),
            All_goals = round(FINAL_data["兩分出手"]+FINAL_data["三分出手"],1),
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