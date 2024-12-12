# cat/management/commands/run_all_imports.py

from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Run all import scripts'

    def handle(self, *args, **options):
        import_scripts = [
            'import_P_season_players_performance_AUTO',
            'import_P_season_teams_performance_AUTO',
            'import_P_standings_AUTO',
            'import_TPBL_season_players_performance_AUTO',
            'import_TPBL_season_teams_performance_AUTO',
            'import_T1_standings_AUTO',
            'import_player_AUTO',
            'import_Standing_json_AUTO',
            'import_team_AUTO',
            't',
            'p_single_data',
            'P_Schedule',
            'copy'

        ]

        self.stdout.write('Starting import process...')
        
        for script in import_scripts:
            try:
                self.stdout.write(f'Running {script}...')
                # 假設每個 import 檔案都已經被轉換成 Django management command
                call_command(script)
            except Exception as e:
                self.stderr.write(f'Error running {script}: {str(e)}')
        
        self.stdout.write(self.style.SUCCESS('All imports completed successfully'))