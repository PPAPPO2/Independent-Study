# Generated by Django 4.2.5 on 2024-05-19 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cat', '0009_alter_season_players_performance_22_23_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='season_players_performance_22_23',
            name='minutes',
            field=models.DurationField(),
        ),
    ]
