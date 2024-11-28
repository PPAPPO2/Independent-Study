import json
import os
from django.conf import settings
from django.core.management.base import BaseCommand
from cat.models import P_Season_Players_Performance_24_25,TPBL_Season_Players_Performance_24_25,TPBL_Season_Teams_Performance_24_25,T1_Season_Teams_Playoff_Performance_22_23, T1_Season_Teams_Playoff_Performance_23_24,T1_Season_Teams_Final_Performance_22_23, T1_Season_Teams_Final_Performance_23_24,T1_Season_Playoff_Players_Performance_23_24, T1_Season_Playoff_Players_Performance_22_23,T1_Season_Players_Final_Performance_23_24, T1_Season_Players_Final_Performance_22_23,T1_Season_teams_Performance_21_22, T1_Season_teams_Performance_22_23, T1_Season_teams_Performance_23_24,T1_Season_Players_Performance_21_22, T1_Season_Players_Performance_22_23, T1_Season_Players_Performance_23_24
from datetime import time
from decimal import Decimal

class Command(BaseCommand):
    def update_positions(self, original_data):
        # 讀取 _ss 檔案
        ss_file_path = os.path.join('frontend/public/static/Standings', 'PlayerData', 'P_mapping_table.json')
        try:
            with open(ss_file_path, 'r', encoding='utf-8') as ss_file:
                ss_data = json.load(ss_file)
                
                # 建立 player+team 對應 position 的字典
                position_map = {(player['player'], player['team']): player['position'] 
                              for player in ss_data}
                
                # 更新原始資料的 position
                for player in original_data:
                    key = (player['player'], player['team'])
                    if key in position_map:
                        player['position'] = position_map[key]
                
                return original_data
        except FileNotFoundError:
            self.stdout.write(self.style.WARNING(f'Warning: {ss_file_path} not found. Positions not updated.'))
            return original_data
    
    def handle(self, *args, **kwargs):
        output_dir = os.path.join('frontend/public/static/Standings', 'PlayerData')
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        tables = [
            #(T1_Season_Players_Performance_21_22,'T1_Players_performance_21_22.json'),
            #(T1_Season_Players_Performance_22_23,'T1_Players_performance_22_23.json'),
            #(T1_Season_Players_Performance_23_24,'T1_Players_performance_23_24.json'),
            #(T1_Season_Players_Final_Performance_22_23,'T1_Season_Players_Final_Performance_22_23.json'),
            #(T1_Season_Players_Final_Performance_23_24,'T1_Season_Players_Final_Performance_23_24.json'),
            #(T1_Season_Playoff_Players_Performance_22_23,'T1_Season_Playoff_Players_Performance_22_23.json'),
            #(T1_Season_Playoff_Players_Performance_23_24,'T1_Season_Playoff_Players_Performance_23_24.json')
            (TPBL_Season_Players_Performance_24_25,'T1_Players_performance_24_25.json'),
            (P_Season_Players_Performance_24_25,'P_Players_Performance_24_25.json')
        ]

        for model, json_file_name in tables:
            data = list(model.objects.all().values())
            for record in data:
                for key, value in record.items():
                    if isinstance(value, time):
                        record[key] = value.strftime('%H:%M:%S')
                    elif isinstance(value, Decimal):
                        record[key] = str(value)

            # 只在處理 P_Players_Performance_24_25 時更新位置
            if json_file_name == 'P_Players_Performance_24_25.json':
                data = self.update_positions(data)

            json_file_path = os.path.join(output_dir, json_file_name)
            with open(json_file_path, 'w', encoding='utf-8') as json_file:
                json.dump(data, json_file, ensure_ascii=False, indent=4)

        self.stdout.write(self.style.SUCCESS('Successfully exported tables to JSON files'))