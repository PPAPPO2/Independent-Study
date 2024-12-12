import csv
from django.core.management.base import BaseCommand
from cat.models import GameStats
import os

class Command(BaseCommand):
    help = '匯入比賽數據到 GameStats 資料表'

    def handle(self, *args, **kwargs):
        # 設定基礎路徑和檔案清單
        base_path = 'frontend/public/static/Standings/TeamData'
        csv_files = [
            'p_currentgame.csv',
            't_currentgame.csv'
        ]
        
        # 清除現有數據
        try:
            GameStats.objects.all().delete()
            self.stdout.write(self.style.SUCCESS("已清除現有數據"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"清除數據時發生錯誤: {e}"))
            return

        # 處理每個CSV檔
        for csv_file in csv_files:
            file_path = os.path.join(base_path, csv_file)
            self.stdout.write(self.style.SUCCESS(f"\n開始處理 {csv_file}"))
            self.import_gamestats_from_csv(file_path)
    
    def get_mapped_team_name(self, team_name):
        # 定義隊名映射表 (新 -> 舊)
        team_name_mapping = {

        
        # T1歷史名稱對照
        "夢想家TEAM": "福爾摩沙夢想家",
        "特攻TEAM": "新北中信特攻", 
        "海神TEAM": "高雄全家海神",
        "國王TEAM": "新北國王",
        "戰神TEAM": "臺北戰神",
        "攻城獅TEAM": "新竹御嵿攻城獅",
        "雲豹TEAM": "台啤永豐雲豹",
        }
        return team_name_mapping.get(team_name, team_name)  # 如果找不到映射，返回原始名稱

    def import_gamestats_from_csv(self, filename):
        if not os.path.isfile(filename):
            self.stdout.write(self.style.ERROR(f"找不到檔案：{filename}"))
            return

        gamestats = []
        with open(filename, 'r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            next(reader)  # 跳過標題行
            
            for row in reader:
                try:
                    game_id = row[0]
                    team_name = self.get_mapped_team_name(row[1])  # 使用映射後的隊名
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
                    self.stdout.write(
                        self.style.ERROR(f"處理資料時發生錯誤: {e}, 在第 {reader.line_num} 行: {row}")
                    )

            try:
                # 批量寫入新數據
                GameStats.objects.bulk_create(gamestats)
                self.stdout.write(
                    self.style.SUCCESS(f'成功匯入 {len(gamestats)} 筆比賽數據從 {filename}')
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"寫入資料庫時發生錯誤: {e}")
                )