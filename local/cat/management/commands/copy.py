from django.core.management.base import BaseCommand
import shutil
import os

class Command(BaseCommand):
    help = '同步資料夾內容'

    def handle(self, *args, **options):
        # 定義來源和目標路徑
        source_dir = 'frontend/public/static/Standings'
        target_dir = 'cat/Model/dataset'

        # 要同步的檔案列表
        files_to_sync = [
            # CSV 檔案
            ('TeamData/p_currentgame.csv', 'p_currentgame.csv'),
            ('TeamData/t_currentgame.csv', 't_currentgame.csv'),
            
            # 球員數據
            ('PlayerData/P_Players_Performance_23_24.json', 'P_Players_Performance_23_24.json'),
            ('PlayerData/T1_Players_performance_23_24.json', 'T1_Players_performance_23_24.json'),
            ('PlayerData/P_Players_Performance_24_25.json', 'P_Players_Performance_24_25.json'),
            ('PlayerData/T1_Players_performance_24_25.json', 'T1_Players_performance_24_25.json'),
            
            # 球隊排名
            ('P_TeamStanding23_24.json', 'P_TeamStanding23_24.json'),
            ('T1_TeamStanding23_24.json', 'T1_TeamStanding23_24.json'),
            ('P_TeamStanding24_25.json', 'P_TeamStanding24_25.json'),
            ('T1_TeamStanding24_25.json', 'T1_TeamStanding24_25.json'),
            
            # 賽季數據
            ('TeamData/T1_Season_teams_performance_24_25.json', 'T1_Season_teams_performance_24_25.json'),
            ('TeamData/P_Season_teams_Performance_24_25.json', 'P_Season_teams_Performance_24_25.json'),
        ]

        try:
            # 確保目標資料夾存在
            if not os.path.exists(target_dir):
                os.makedirs(target_dir)
                self.stdout.write(self.style.SUCCESS(f"創建目標資料夾: {target_dir}"))

            # 進行同步
            for source_file, target_file in files_to_sync:
                source_path = os.path.join(source_dir, source_file)
                target_path = os.path.join(target_dir, target_file)
                
                if os.path.exists(source_path):
                    try:
                        # 確保目標檔案的目錄存在
                        os.makedirs(os.path.dirname(target_path), exist_ok=True)
                        
                        # 複製檔案（如果已存在會覆蓋）
                        shutil.copy2(source_path, target_path)
                        self.stdout.write(self.style.SUCCESS(
                            f"成功同步: {source_file} -> {target_file}"
                        ))
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(
                            f"同步失敗 {source_file}: {str(e)}"
                        ))
                else:
                    self.stdout.write(self.style.WARNING(
                        f"找不到來源檔案: {source_file}"
                    ))

            self.stdout.write(self.style.SUCCESS("同步完成"))
        
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"同步過程發生錯誤: {str(e)}"))