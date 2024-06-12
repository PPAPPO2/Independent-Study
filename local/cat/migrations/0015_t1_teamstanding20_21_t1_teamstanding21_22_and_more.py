# Generated by Django 4.2.11 on 2024-05-20 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cat', '0014_teamstanding21_22_teamstanding22_23_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='T1_TeamStanding20_21',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rank', models.IntegerField()),
                ('team_name', models.CharField(max_length=10)),
                ('games_played', models.IntegerField()),
                ('wins', models.IntegerField()),
                ('losses', models.IntegerField()),
                ('pct', models.CharField(max_length=10)),
                ('games_behind', models.CharField(max_length=10)),
                ('wins_losses_streak', models.CharField(max_length=3)),
            ],
            options={
                'ordering': ['rank'],
            },
        ),
        migrations.CreateModel(
            name='T1_TeamStanding21_22',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rank', models.IntegerField()),
                ('team_name', models.CharField(max_length=10)),
                ('games_played', models.IntegerField()),
                ('wins', models.IntegerField()),
                ('losses', models.IntegerField()),
                ('pct', models.CharField(max_length=10)),
                ('games_behind', models.CharField(max_length=10)),
                ('wins_losses_streak', models.CharField(max_length=3)),
            ],
            options={
                'ordering': ['rank'],
            },
        ),
        migrations.CreateModel(
            name='T1_TeamStanding22_23',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rank', models.IntegerField()),
                ('team_name', models.CharField(max_length=10)),
                ('games_played', models.IntegerField()),
                ('wins', models.IntegerField()),
                ('losses', models.IntegerField()),
                ('pct', models.CharField(max_length=10)),
                ('games_behind', models.CharField(max_length=10)),
                ('wins_losses_streak', models.CharField(max_length=3)),
            ],
            options={
                'ordering': ['rank'],
            },
        ),
        migrations.CreateModel(
            name='T1_TeamStanding23_24',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rank', models.IntegerField()),
                ('team_name', models.CharField(max_length=10)),
                ('games_played', models.IntegerField()),
                ('wins', models.IntegerField()),
                ('losses', models.IntegerField()),
                ('pct', models.CharField(max_length=10)),
                ('games_behind', models.CharField(max_length=10)),
                ('wins_losses_streak', models.CharField(max_length=3)),
            ],
            options={
                'ordering': ['rank'],
            },
        ),
    ]