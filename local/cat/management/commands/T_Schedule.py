import csv
from datetime import datetime
from django.core.management.base import BaseCommand
from cat.models import ScheduleT  # 確保替換為正確的應用程式名稱
import pytz

class Command(BaseCommand):
    help = '匯入籃球賽程資料到資料庫'

    def handle(self, *args, **kwargs):
        self.import_games_from_csv('E:/Independent_Study_data/T賽程_更新.csv')

    def import_games_from_csv(self, filename):
        with open(filename, 'r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            next(reader)  # 跳過標題行
            schedules = []

            for row in reader:
                try:
                    home_team = row[0]
                    away_team = row[1]
                    game_time_str = row[2]  # 比賽時間，假設格式為 YYYY-MM-DD HH:MM
                    location = row[3]
                    
                    # 將比賽時間轉換為 datetime 對象
                    game_time = datetime.strptime(game_time_str, '%Y-%m-%d %H:%M')
                    
                    # 建立 Schedule 實例
                    schedule = ScheduleT(
                        team_home=home_team,
                        team_away=away_team,
                        game_date=game_time,
                        location=location
                    )

                    schedules.append(schedule)
                except Exception as e:
                    print(f"錯誤: {e} 在比賽資料 {row}")
            
            # 批量寫入資料庫
            ScheduleT.objects.bulk_create(schedules)
            self.stdout.write(self.style.SUCCESS(f'成功匯入 {len(schedules)} 筆賽程資料'))
