from django.core.management.base import BaseCommand
import importlib
import os

class Command(BaseCommand):
    help = 'Run all import scripts'

    def handle(self, *args, **options):
        # 獲取 cat/management/commands 目錄下的所有 import 檔案
        import_dir = os.path.join('cat', 'management', 'commands')
        import_files = [
            f[:-3] for f in os.listdir(import_dir) 
            if f.startswith('import_') and f.endswith('.py')
        ]

        self.stdout.write('Starting import process...')
        
        for import_file in import_files:
            try:
                self.stdout.write(f'Running {import_file}...')
                # 動態導入並執行模組
                module = importlib.import_module(f'cat.management.commands.{import_file}')
                if hasattr(module, 'run_import'):
                    module.run_import()
                else:
                    self.stdout.write(self.style.WARNING(f'No run_import function found in {import_file}'))
            except Exception as e:
                self.stderr.write(f'Error running {import_file}: {str(e)}')
                
        self.stdout.write(self.style.SUCCESS('All imports completed successfully'))