import json
from django.core.management.base import BaseCommand
from cat.models import T1_Season_teams_Performance_21_22, T1_Season_teams_Performance_22_23, T1_Season_teams_Performance_23_24
from datetime import time
from decimal import Decimal

class Command(BaseCommand):
    
    def handle(self, *args, **kwargs):
        # 定義需要轉換的表
        tables = [
            (T1_Season_teams_Performance_21_22, 'teams_performance_21_22.json'),
            (T1_Season_teams_Performance_22_23, 'teams_performance_22_23.json'),
            (T1_Season_teams_Performance_23_24, 'teams_performance_23_24.json')
        ]

        for model, json_file_name in tables:
            data = list(model.objects.all().values())
            for record in data:
                for key, value in record.items():#硬轉格式
                    if isinstance(value, time):
                        record[key] = value.strftime('%H:%M:%S')
                    elif isinstance(value, Decimal):
                        record[key] = str(value)  
            with open(json_file_name, 'w', encoding='utf-8') as json_file:
                json.dump(data, json_file, ensure_ascii=False, indent=4)

        self.stdout.write(self.style.SUCCESS('Successfully exported tables to JSON files'))