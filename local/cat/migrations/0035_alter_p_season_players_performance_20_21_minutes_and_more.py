# Generated by Django 4.1 on 2024-09-18 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cat', '0034_remove_p_season_players_performance_20_21_pos_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='p_season_players_performance_20_21',
            name='minutes',
            field=models.CharField(default='00:00:00', max_length=5),
        ),
        migrations.AlterField(
            model_name='p_season_players_performance_21_22',
            name='minutes',
            field=models.CharField(default='00:00:00', max_length=5),
        ),
        migrations.AlterField(
            model_name='p_season_players_performance_22_23',
            name='minutes',
            field=models.CharField(default='00:00:00', max_length=5),
        ),
        migrations.AlterField(
            model_name='p_season_players_performance_23_24',
            name='minutes',
            field=models.CharField(default='00:00:00', max_length=5),
        ),
        migrations.AlterField(
            model_name='t1_season_players_performance_21_22',
            name='minutes',
            field=models.CharField(default='00:00:00', max_length=5),
        ),
        migrations.AlterField(
            model_name='t1_season_players_performance_22_23',
            name='minutes',
            field=models.CharField(default='00:00:00', max_length=5),
        ),
        migrations.AlterField(
            model_name='t1_season_players_performance_23_24',
            name='minutes',
            field=models.CharField(default='00:00:00', max_length=5),
        ),
    ]