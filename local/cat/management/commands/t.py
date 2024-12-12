from django.core.management.base import BaseCommand
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import pandas as pd
import os
import time

class Command(BaseCommand):
    help = '爬取TPBL籃球比賽數據並保存為CSV檔案'

    def handle(self, *args, **options):
        # 設定輸出目錄
        output_directory = 'frontend/public/static/Standings/TeamData'
        if not os.path.exists(output_directory):
            os.makedirs(output_directory)
            self.stdout.write(self.style.SUCCESS(f"創建資料夾: {output_directory}"))

        def get_latest_game_id():
            output_path = os.path.join(output_directory, 't_currentgame.csv')
            if not os.path.exists(output_path):
                return 9  # 如果檔案不存在，從9開始
            
            try:
                # 讀取CSV檔案
                with open(output_path, 'r', encoding='utf-8-sig') as f:
                    lines = f.readlines()
                if not lines:
                    return 9
                
                # 獲取最後一行的比賽ID
                last_line = lines[-1].strip()
                last_game_id = int(last_line.split(',')[0])
                return last_game_id + 1  # 返回下一場比賽的ID
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"讀取最新比賽ID時發生錯誤: {str(e)}"))
                return 9

        def setup_driver():
            chrome_options = Options()
            chrome_options.add_argument("--headless")
            chrome_options.add_argument("--disable-gpu")
            chrome_options.add_argument("--window-size=1920x1080")
            service = Service(ChromeDriverManager().install())
            return webdriver.Chrome(service=service, options=chrome_options)

        def get_game_data(game_id, driver):
            try:
                url = f'https://tpbl.basketball/schedule/{game_id}/box-score'
                driver.get(url)
                
                # 檢查是否存在找不到頁面的元素
                not_found_elements = driver.find_elements(By.CSS_SELECTOR, '.not-found')  # 替換成實際的選擇器
                if not_found_elements:
                    self.stdout.write(self.style.WARNING(f"比賽 ID {game_id} 不存在"))
                    return "not_found", "not_found"
                
                try:
                    wait = WebDriverWait(driver, 20)
                    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '.vgt-table.bordered')))
                except:
                    self.stdout.write(self.style.WARNING(f"比賽 ID {game_id} 找不到表格"))
                    return "not_found", "not_found"
                
                tables = driver.find_elements(By.CSS_SELECTOR, '.vgt-table.bordered')
                
                if len(tables) != 2:
                    self.stdout.write(self.style.WARNING(f"比賽 ID {game_id} 未檢測到兩個表格"))
                    return "not_found", "not_found"

                home_table_html = tables[0].get_attribute('outerHTML')
                away_table_html = tables[1].get_attribute('outerHTML')
                
                return home_table_html, away_table_html

            except Exception as e:
                self.stdout.write(self.style.ERROR(f"獲取比賽 {game_id} 數據時發生錯誤: {str(e)}"))
                return None, None

        def parse_table_data(soup, game_id, is_home):
            try:
                rows = soup.find_all('tr')
                if not rows:
                    return None

                data = []
                for row in rows:
                    cols = row.find_all(['th', 'td'])
                    cols = [col.get_text(strip=True) for col in cols]
                    data.append(cols)

                df = pd.DataFrame(data)

                def remove_percentage(value):
                    if isinstance(value, str) and '%' in value:
                        return float(value.replace('%', ''))
                    return value

                team_name = df.iloc[-2, 0]
                total_row = df.iloc[-1]

                row_data = f"{game_id},{team_name},{is_home},{total_row[3]},{total_row[4]},{remove_percentage(total_row[5])},{total_row[6]},{total_row[7]},{remove_percentage(total_row[8])},{total_row[9]},{total_row[10]},{remove_percentage(total_row[11])},{total_row[2]},{total_row[14]},{total_row[12]},{total_row[13]},{total_row[15]},{total_row[16]},{total_row[17]},{total_row[18]},{total_row[19]}"
                
                return row_data

            except Exception as e:
                self.stdout.write(self.style.ERROR(f"解析表格數據時發生錯誤: {str(e)}"))
                return None

        def process_game(game_id):
            driver = setup_driver()
            try:
                time.sleep(1)  # 避免請求過於頻繁
                
                home_html, away_html = get_game_data(game_id, driver)
                if home_html == "not_found" or away_html == "not_found":
                    self.stdout.write(self.style.SUCCESS(f"已達最新比賽，停止爬取"))
                    return None
                if home_html is None or away_html is None:
                    return False

                home_soup = BeautifulSoup(home_html, 'html.parser')
                away_soup = BeautifulSoup(away_html, 'html.parser')

                home_data = parse_table_data(home_soup, game_id, 1)
                away_data = parse_table_data(away_soup, game_id, 0)

                if home_data is None or away_data is None:
                    return False

                output_path = os.path.join(output_directory, 'p_currentgame.csv')
                
                with open(output_path, 'a', encoding='utf-8-sig') as f:
                    f.write(home_data + '\n')
                    f.write(away_data + '\n')

                self.stdout.write(self.style.SUCCESS(f"成功添加比賽 {game_id} 的數據"))
                return True

            except Exception as e:
                self.stdout.write(self.style.ERROR(f"處理比賽 {game_id} 時發生錯誤: {str(e)}"))
                return False
            finally:
                driver.quit()

        # 主要執行邏輯
        start_id = get_latest_game_id()
        self.stdout.write(self.style.SUCCESS(f"從比賽ID {start_id} 開始爬取"))

        current_id = start_id
        consecutive_failures = 0
        max_failures = 5  # 連續失敗5次後停止

        while consecutive_failures < max_failures:
            try:
                result = process_game(current_id)
                if result is None:  # 找不到比賽，終止程序
                    break
                elif not result:
                    consecutive_failures += 1
                else:
                    consecutive_failures = 0  # 重置連續失敗計數
                
                current_id += 1

            except Exception as e:
                self.stdout.write(self.style.ERROR(f"處理比賽 ID {current_id} 時發生錯誤: {str(e)}"))
                consecutive_failures += 1
                current_id += 1

        self.stdout.write(self.style.SUCCESS('數據爬取完成'))