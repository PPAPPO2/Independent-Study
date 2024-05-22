import requests
import json
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import T1_TeamStanding20_21, T1_TeamStanding21_22, T1_TeamStanding22_23, T1_TeamStanding23_24


class Command(BaseCommand):
    # 命令的簡短說明
    help = 'Fetch and import team standings from T1'

    def handle(self, *args, **kwargs):
        # 爬取JSON檔案的URL
        url = 'https://api.t1league.basketball/season/1/stages/2/teams'
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}

        # 發送GET請求並獲取響應
        response = requests.get(url, headers=headers)
        # 將響應內容從JSON格式轉換為Python字典
        data = json.loads(response.text)
        print(data)
        # 刪除現有的T1_TeamStanding21_22模型實例
        T1_TeamStanding21_22.objects.all().delete()

        # 用於計算games_behind欄位
        last_team = None

        # 遍歷JSON數據
        for team in data:
            #創建一個T1_TeamStanding21_22模型實例
            T1_TeamStanding21_22.objects.create(
                rank=team["rank"],
                team_name=team["team_name"],
                games_played=team["win_count"] + team["loss_count"],
                wins=team["win_count"],
                losses=team["loss_count"],
                pct=f'{int(team["win_count"] / (team["win_count"] + team["loss_count"]) * 100)}%',
                games_behind=last_team["win_count"] - team["win_count"] if last_team is not None else 0,
                wins_losses_streak=team["win_lose_status"],
            )
            # 更新last_team變量為當前遍歷的資料
            last_team = team
        # soup = BeautifulSoup(response.text, "html.parser")
        # print(soup.find_all('tr'))
        # data = [th.text for th in soup.find_all('tr')]
        # print(data ,len(data))
        #清空現有數據
        