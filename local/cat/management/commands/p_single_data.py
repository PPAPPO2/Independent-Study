from django.core.management.base import BaseCommand
import requests
import json
import pandas as pd
import os
from bs4 import BeautifulSoup
import time

class Command(BaseCommand):
   help = '爬取籃球比賽數據並保存為CSV檔案'

   def handle(self, *args, **options):
       # 設定輸出目錄
       output_directory = 'frontend/public/static/Standings/TeamData'
       if not os.path.exists(output_directory):
           os.makedirs(output_directory)
           self.stdout.write(self.style.SUCCESS(f"創建資料夾: {output_directory}"))

       def get_latest_game_id():
           output_path = os.path.join(output_directory, 'p_currentgame.csv')
           if not os.path.exists(output_path):
               return 598  # 如果檔案不存在，從598開始
           
           try:
               # 讀取CSV檔案
               with open(output_path, 'r', encoding='utf-8-sig') as f:
                   lines = f.readlines()
               if not lines:
                   return 598
               
               # 獲取最後一行的比賽ID
               last_line = lines[-1].strip()
               last_game_id = int(last_line.split(',')[0])
               return last_game_id + 1  # 返回下一場比賽的ID
           except Exception as e:
               self.stdout.write(self.style.ERROR(f"讀取最新比賽ID時發生錯誤: {str(e)}"))
               return 598

       def get_game_info(game_id):
           try:
               url = f'https://pleagueofficial.com/game/{game_id}'
               headers = {
                   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'}
               response = requests.get(url, headers=headers)
               
               if response.status_code != 200:
                   self.stdout.write(self.style.WARNING(f"比賽 ID {game_id} 請求失敗，狀態碼: {response.status_code}"))
                   return None, None, None

               soup = BeautifulSoup(response.text, "html.parser")

               away_div = soup.find('div', class_='col-lg-7 col-12 text-right align-self-center')
               home_div = soup.find('div', class_='col-lg-7 col-12 text-left align-self-center')
               time_span = soup.find("span", class_="fs14 text-white")

               if not all([away_div, home_div, time_span]):
                   self.stdout.write(self.style.WARNING(f"比賽 ID {game_id} 找不到必要的資料"))
                   return None, None, None

               away_raw = away_div.text.strip()
               home_raw = home_div.text.strip()

               try:
                   away = away_raw.split('\n')[4].strip()
                   home = home_raw.split('\n')[4].strip()
                   game_time = time_span.text.strip().split('\n')[1].strip()
               except (IndexError, AttributeError) as e:
                   self.stdout.write(self.style.ERROR(f"比賽 ID {game_id} 資料格式異常: {str(e)}"))
                   return None, None, None

               return home, away, game_time

           except Exception as e:
               self.stdout.write(self.style.ERROR(f"獲取比賽 {game_id} 資訊時發生錯誤: {str(e)}"))
               return None, None, None

       def single_game_data(game_id):
           try:
               parameters = {
                   "id": game_id,
                   'away_tab': 'total',
                   'home_tab': 'total'
               }
               response = requests.get("https://pleagueofficial.com/api/boxscore.php?", params=parameters)
               
               if response.status_code != 200:
                   self.stdout.write(self.style.WARNING(f"比賽 ID {game_id} API 請求失敗，狀態碼: {response.status_code}"))
                   return None

               return response.text

           except Exception as e:
               self.stdout.write(self.style.ERROR(f"獲取比賽 {game_id} 數據時發生錯誤: {str(e)}"))
               return None

       def toJson(game_id):
           time.sleep(1)
           
           home_team, away_team, game_time = get_game_info(game_id)
           if None in (home_team, away_team, game_time):
               self.stdout.write(self.style.WARNING(f"無法獲取比賽 {game_id} 的基本信息，跳過處理"))
               return False

           data = single_game_data(game_id)
           if not data:
               self.stdout.write(self.style.WARNING(f"無法獲取比賽 {game_id} 的數據，跳過處理"))
               return False

           try:
               parsed_data = json.loads(data)
           except json.JSONDecodeError as e:
               self.stdout.write(self.style.ERROR(f"解析比賽 {game_id} 的 JSON 數據時發生錯誤: {str(e)}"))
               return False

           if parsed_data.get('error') == "":
               try:
                   game_data = parsed_data['data']
                   home_total = game_data['home_total']
                   away_total = game_data['away_total']

                   # 檢查是否有 None 值
                   for value in home_total.values():
                       if value is None or value == "None":
                           self.stdout.write(self.style.WARNING(f"比賽 {game_id} 的主隊數據含有空值，停止爬取"))
                           return None

                   for value in away_total.values():
                       if value is None or value == "None":
                           self.stdout.write(self.style.WARNING(f"比賽 {game_id} 的客隊數據含有空值，停止爬取"))
                           return None

                   output_path = os.path.join(output_directory, 'p_currentgame.csv')

                   home_row = f"{game_id},{home_team},1,{home_total['two_m']},{home_total['two']},{home_total['twop']},{home_total['trey_m']},{home_total['trey']},{home_total['treyp']},{home_total['ft_m']},{home_total['ft']},{home_total['ftp']},{home_total['points']},{home_total['reb']},{home_total['reb_o']},{home_total['reb_d']},{home_total['ast']},{home_total['stl']},{home_total['blk']},{home_total['turnover']},{home_total['pfoul']}"
                   away_row = f"{game_id},{away_team},0,{away_total['two_m']},{away_total['two']},{away_total['twop']},{away_total['trey_m']},{away_total['trey']},{away_total['treyp']},{away_total['ft_m']},{away_total['ft']},{away_total['ftp']},{away_total['points']},{away_total['reb']},{away_total['reb_o']},{away_total['reb_d']},{away_total['ast']},{away_total['stl']},{away_total['blk']},{away_total['turnover']},{away_total['pfoul']}"

                   with open(output_path, 'a', encoding='utf-8-sig') as f:
                       f.write(home_row + '\n')
                       f.write(away_row + '\n')
                   
                   self.stdout.write(self.style.SUCCESS(f"成功添加比賽 {game_id} 的數據"))
                   return True

               except Exception as e:
                   self.stdout.write(self.style.ERROR(f"處理比賽 {game_id} 的數據時發生錯誤: {str(e)}"))
                   return False
           else:
               self.stdout.write(self.style.WARNING(f"比賽 {game_id} 返回錯誤: {parsed_data.get('error')}"))
               return False

       # 主要執行邏輯
       start_id = get_latest_game_id()
       self.stdout.write(self.style.SUCCESS(f"從比賽ID {start_id} 開始爬取"))

       current_id = start_id

       while True:
           try:
               result = toJson(current_id)
               if result is None:  # 如果返回 None，表示遇到空值，應該停止爬取
                   self.stdout.write(self.style.SUCCESS(f"遇到空值資料，停止爬取"))
                   break
               elif not result:  # 如果返回 False，表示這場比賽處理失敗，繼續下一場
                   current_id += 1
                   continue
               
               current_id += 1

           except Exception as e:
               self.stdout.write(self.style.ERROR(f"處理比賽 ID {current_id} 時發生錯誤: {str(e)}"))
               current_id += 1

       self.stdout.write(self.style.SUCCESS('數據爬取完成'))