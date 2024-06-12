# Generated by Django 4.2.11 on 2024-05-22 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cat', '0018_alter_t1_teamstanding20_21_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='T1_Season_Players_Performance_21_22',
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
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='T1_Season_Players_Performance_22_23',
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
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='T1_Season_Players_Performance_23_24',
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
                'abstract': False,
            },
        ),
        migrations.AlterModelOptions(
            name='season_players_performance_20_21',
            options={},
        ),
        migrations.AlterModelOptions(
            name='season_players_performance_21_22',
            options={},
        ),
        migrations.AlterModelOptions(
            name='season_players_performance_22_23',
            options={},
        ),
        migrations.AlterModelOptions(
            name='season_players_performance_23_24',
            options={},
        ),
    ]