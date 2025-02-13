# Generated by Django 4.2.5 on 2024-05-19 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cat', '0012_alter_season_players_performance_22_23_minutes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Season_Players_Performance_20_21',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player', models.CharField(max_length=10)),
                ('jersey', models.IntegerField()),
                ('team', models.CharField(max_length=10)),
                ('games_played', models.IntegerField()),
                ('minutes', models.TimeField()),
                ('field_goals_two', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_two_attempts', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_two_pct', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_three', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_three_attempts', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_three_pct', models.DecimalField(decimal_places=2, max_digits=10)),
                ('free_throws', models.DecimalField(decimal_places=2, max_digits=10)),
                ('free_throws_attempts', models.DecimalField(decimal_places=2, max_digits=10)),
                ('free_throws_pct', models.DecimalField(decimal_places=2, max_digits=10)),
                ('points', models.DecimalField(decimal_places=2, max_digits=10)),
                ('offensive_rebounds', models.DecimalField(decimal_places=2, max_digits=10)),
                ('defensive_rebounds', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rebounds', models.DecimalField(decimal_places=2, max_digits=10)),
                ('assists', models.DecimalField(decimal_places=2, max_digits=10)),
                ('steals', models.DecimalField(decimal_places=2, max_digits=10)),
                ('blocks', models.DecimalField(decimal_places=2, max_digits=10)),
                ('turnovers', models.DecimalField(decimal_places=2, max_digits=10)),
                ('fouls', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'ordering': ['-points'],
            },
        ),
        migrations.CreateModel(
            name='Season_Players_Performance_21_22',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player', models.CharField(max_length=10)),
                ('jersey', models.IntegerField()),
                ('team', models.CharField(max_length=10)),
                ('games_played', models.IntegerField()),
                ('minutes', models.TimeField()),
                ('field_goals_two', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_two_attempts', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_two_pct', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_three', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_three_attempts', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_three_pct', models.DecimalField(decimal_places=2, max_digits=10)),
                ('free_throws', models.DecimalField(decimal_places=2, max_digits=10)),
                ('free_throws_attempts', models.DecimalField(decimal_places=2, max_digits=10)),
                ('free_throws_pct', models.DecimalField(decimal_places=2, max_digits=10)),
                ('points', models.DecimalField(decimal_places=2, max_digits=10)),
                ('offensive_rebounds', models.DecimalField(decimal_places=2, max_digits=10)),
                ('defensive_rebounds', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rebounds', models.DecimalField(decimal_places=2, max_digits=10)),
                ('assists', models.DecimalField(decimal_places=2, max_digits=10)),
                ('steals', models.DecimalField(decimal_places=2, max_digits=10)),
                ('blocks', models.DecimalField(decimal_places=2, max_digits=10)),
                ('turnovers', models.DecimalField(decimal_places=2, max_digits=10)),
                ('fouls', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'ordering': ['-points'],
            },
        ),
        migrations.CreateModel(
            name='Season_Players_Performance_23_24',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player', models.CharField(max_length=10)),
                ('jersey', models.IntegerField()),
                ('team', models.CharField(max_length=10)),
                ('games_played', models.IntegerField()),
                ('minutes', models.TimeField()),
                ('field_goals_two', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_two_attempts', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_two_pct', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_three', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_three_attempts', models.DecimalField(decimal_places=2, max_digits=10)),
                ('field_goals_three_pct', models.DecimalField(decimal_places=2, max_digits=10)),
                ('free_throws', models.DecimalField(decimal_places=2, max_digits=10)),
                ('free_throws_attempts', models.DecimalField(decimal_places=2, max_digits=10)),
                ('free_throws_pct', models.DecimalField(decimal_places=2, max_digits=10)),
                ('points', models.DecimalField(decimal_places=2, max_digits=10)),
                ('offensive_rebounds', models.DecimalField(decimal_places=2, max_digits=10)),
                ('defensive_rebounds', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rebounds', models.DecimalField(decimal_places=2, max_digits=10)),
                ('assists', models.DecimalField(decimal_places=2, max_digits=10)),
                ('steals', models.DecimalField(decimal_places=2, max_digits=10)),
                ('blocks', models.DecimalField(decimal_places=2, max_digits=10)),
                ('turnovers', models.DecimalField(decimal_places=2, max_digits=10)),
                ('fouls', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'ordering': ['-points'],
            },
        ),
    ]
