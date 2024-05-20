# Generated by Django 4.2.5 on 2024-05-19 04:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cat', '0008_rename_season_players_performance_season_players_performance_22_23'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='season_players_performance_22_23',
            options={'ordering': ['-points']},
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='assists',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='blocks',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='defensive_rebounds',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='field_goals_three',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='field_goals_three_attempts',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='field_goals_three_pct',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='field_goals_two',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='field_goals_two_attempts',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='field_goals_two_pct',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='fouls',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='free_throws',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='free_throws_attempts',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='free_throws_pct',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='minutes',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='offensive_rebounds',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='points',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='rebounds',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='steals',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='turnovers',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]