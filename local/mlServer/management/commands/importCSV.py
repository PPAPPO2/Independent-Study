import csv
from django.core.management.base import BaseCommand
from mlServer.models import GameRecord

class Command(BaseCommand):
    help = 'Import game records from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The path to the CSV file to be imported')

    def handle(self, *args, **kwargs):
        csv_file_path = kwargs['csv_file']

        with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                GameRecord.objects.create(
                    points=row['points'],
                    turnover=row['turnover'],
                    ast=row['ast'],
                    blk=row['blk'],
                    reb_d=row['reb_d'],
                    reb_o=row['reb_o'],
                    pfoul=row['pfoul'],
                    stl=row['stl'],
                    reb=row['reb'],
                    two=row['two'],
                    twop=row['twop'],
                    trey=row['trey'],
                    treyp=row['treyp'],
                    ft=row['ft'],
                    ftp=row['ftp'],
                    team=row['team'],
                    two_m=row['two_m'],
                    trey_m=row['trey_m'],
                    ft_m=row['ft_m'],
                    match=row['match']
                )

        self.stdout.write(self.style.SUCCESS(f'Successfully imported data from {csv_file_path}'))
