import csv
from django.core.management.base import BaseCommand
from cat.models import GameStats  # 替換為您的應用程式名稱
import os

class Command(BaseCommand):
    help = '匯入比賽數據到 GameStats 資料表'

    def handle(self, *args, **kwargs):
        
        # self.import_gamestats_from_csv('E:/Independent_Study_data/all_games_data.csv')
        self.import_gamestats_from_csv(r'E:\Independent_Study_data\box_score.csv')
        
    def import_gamestats_from_csv(self, filename):
        if not os.path.isfile(filename):
            self.stdout.write(self.style.ERROR(f"找不到檔案：{filename}"))
            return

        with open(filename, 'r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            # next(reader)  # 跳過標題行
            gamestats = []

            for row in reader:
                try:
                    game_id = row[0]
                    team_name = row[1]
                    is_home = bool(int(row[2]))
                    two_m = int(row[3])
                    two = int(row[4])
                    twop = float(row[5])
                    trey_m = int(row[6])
                    trey = int(row[7])
                    treyp = float(row[8])
                    ft_m = int(row[9])
                    ft = int(row[10])
                    ftp = float(row[11])
                    points = int(row[12])
                    reb = int(row[13])
                    reb_o = int(row[14])
                    reb_d = int(row[15])
                    ast = int(row[16])
                    stl = int(row[17])
                    blk = int(row[18])
                    turnover = int(row[19])
                    pfoul = int(row[20])

                    # 建立 GameStats 實例
                    gamestat = GameStats(
                        game_id=game_id,
                        team_name=team_name,
                        is_home=is_home,
                        two_m=two_m,
                        two=two,
                        twop=twop,
                        trey_m=trey_m,
                        trey=trey,
                        treyp=treyp,
                        ft_m=ft_m,
                        ft=ft,
                        ftp=ftp,
                        points=points,
                        reb=reb,
                        reb_o=reb_o,
                        reb_d=reb_d,
                        ast=ast,
                        stl=stl,
                        blk=blk,
                        turnover=turnover,
                        pfoul=pfoul
                    )

                    gamestats.append(gamestat)
                except Exception as e:
                    print(f"錯誤: {e} 在比賽資料 {row}")

            # 批量寫入資料庫
            GameStats.objects.bulk_create(gamestats)
            self.stdout.write(self.style.SUCCESS(f'成功匯入 {len(gamestats)} 筆比賽數據'))
