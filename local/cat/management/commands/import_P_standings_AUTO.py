import requests 
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from cat.models import P_TeamStanding24_25

class Command(BaseCommand):
    help = 'Fetch and import team standings from P.League+'

    def handle(self, *args, **kwargs):
        url = 'https://pleagueofficial.com/standings/2024-25'
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        }

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, "html.parser")
            table = soup.find('table')
            
            if not table:
                self.stdout.write(self.style.ERROR("Table not found"))
                return
            
            # 清空现有数据
            P_TeamStanding24_25.objects.all().delete()
            
            # 获取表格行
            rows = table.find('tbody').find_all('tr')
            
            for row in rows:
                try:
                    # 获取排名（在第一个th中）
                    rank = int(row.find_all('th')[0].text.strip())
                    
                    # 获取队名（在第二个th中的a标签内）
                    team_name = row.find_all('th')[1].find('a').text.strip()
                    
                    # 获取其他数据（在td标签中）
                    tds = row.find_all('td')
                    
                    # 获取胜场和总场数
                    games_played = int(tds[0].text.strip())  # 已賽 GP
                    wins = int(tds[1].text.strip())         # 勝 W
                    losses = int(tds[2].text.strip())       # 敗 L
                    
                    # 计算胜率
                    pct = wins / games_played if games_played > 0 else 0
                    
                    # 创建记录
                    P_TeamStanding24_25.objects.create(
                        rank=rank,
                        team_name=team_name,
                        games_played=games_played,
                        wins=wins,
                        losses=losses,
                        pct=tds[3].text.strip(),  # 计算得出的胜率，而不是直接使用百分比字符串
                        games_behind=tds[4].text.strip(),
                        wins_losses_streak=tds[10].text.strip()  # L1, W1 等
                    )
                    
                    print(f"Successfully added team: {team_name} (Win PCT: {pct:.3f})")
                    
                except Exception as e:
                    print(f"Error processing row: {str(e)}")
                    continue
            
            count = P_TeamStanding24_25.objects.count()
            self.stdout.write(
                self.style.SUCCESS(f'Successfully imported {count} team standings')
            )
            
        except requests.RequestException as e:
            self.stdout.write(self.style.ERROR(f"Network error: {e}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Unexpected error: {e}"))