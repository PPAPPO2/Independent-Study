import json
import os
from django.conf import settings  # 導入 settings
from django.core.management.base import BaseCommand
from cat.models import P_Season_Teams_Playoff_Performance_22_23,P_Season_Teams_Playoff_Performance_23_24,P_Season_Teams_Final_Performance_23_24,P_Season_Teams_Final_Performance_22_23,P_Season_Players_Palyoff_Performance_22_23, P_Season_Players_Playoff_Performance_23_24,P_Season_Players_Final_Performance_22_23, P_Season_Players_Final_Performance_23_24,P_Season_teams_Performance_20_21,P_Season_teams_Performance_21_22, P_Season_teams_Performance_22_23, P_Season_teams_Performance_23_24,P_Season_Players_Performance_20_21,P_Season_Players_Performance_21_22, P_Season_Players_Performance_22_23, P_Season_Players_Performance_23_24
from datetime import time
from decimal import Decimal

class Command(BaseCommand):
    
    def handle(self, *args, **kwargs):

        output_dir = os.path.join('frontend/public/static/Standings', 'TeamData')
        # 檢查資料夾是否存在，如果不存在則創建
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # 定義需要轉換的表
        tables = [
            # P teams performance
            (P_Season_teams_Performance_20_21, 'P_Season_teams_Performance_20_21.json'),
            (P_Season_teams_Performance_21_22, 'P_Season_teams_Performance_21_22.json'),
            (P_Season_teams_Performance_22_23, 'P_Season_teams_Performance_22_23.json'),
            (P_Season_teams_Performance_23_24, 'P_Season_teams_Performance_23_24.json'),
            #P players performance
            #(P_Season_Players_Performance_20_21,'P_Players_performance_20_21.json'),
            #(P_Season_Players_Performance_21_22,'P_Players_performance_21_22.json'),
            #(P_Season_Players_Performance_22_23,'P_Players_performance_22_23.json'),
            #(P_Season_Players_Performance_23_24,'P_Players_performance_23_24.json'),
            (P_Season_Teams_Playoff_Performance_22_23,'P_Season_Teams_Playoff_Performance_22_23.json'),
            (P_Season_Teams_Playoff_Performance_23_24,'P_Season_Teams_Playoff_Performance_23_24.json'),
            (P_Season_Teams_Final_Performance_22_23,'P_Season_Teams_Final_Performance_22_23.json'),
            (P_Season_Teams_Final_Performance_23_24,'P_Season_Teams_Final_Performance_23_24.json'),
            #(P_Season_Players_Final_Performance_22_23,'P_Season_Players_Final_Performance_22_23.json'),
            #(P_Season_Players_Final_Performance_23_24,'P_Season_Players_Final_Performance_23_24.json'),
            #(P_Season_Players_Palyoff_Performance_22_23,'P_Season_Players_Palyoff_Performance_22_23.json'),
            #(P_Season_Players_Playoff_Performance_23_24,'P_Season_Players_Playoff_Performance_23_24.json')
            
        ]

        for model, json_file_name in tables:
            data = list(model.objects.all().values())
            for record in data:
                for key, value in record.items():#硬轉格式
                    if isinstance(value, time):
                        record[key] = value.strftime('%H:%M:%S')
                    elif isinstance(value, Decimal):
                        record[key] = str(value)  

            # 組合 JSON 檔案的完整路徑
            json_file_path = os.path.join(output_dir, json_file_name)

            with open(json_file_path, 'w', encoding='utf-8') as json_file:
                json.dump(data, json_file, ensure_ascii=False, indent=4)

        self.stdout.write(self.style.SUCCESS('Successfully exported tables to JSON files'))