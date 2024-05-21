from django.db import models
from django.db.models.base import Model

# Create your models here.


class TeamStandingModel(models.Model):
    rank = models.IntegerField()
    team_name = models.CharField(max_length=10)
    games_played = models.IntegerField()
    wins = models.IntegerField()
    losses = models.IntegerField()

    pct = models.CharField(max_length=10)
    games_behind = models.CharField(max_length=10)
    wins_losses_streak = models.CharField(max_length=3)

    class Meta:
        abstract = True



# 球隊排名模型
class TeamStanding20_21(TeamStandingModel):

    pass


class TeamStanding21_22(TeamStandingModel):
    pass


class TeamStanding22_23(TeamStandingModel):
    pass


class TeamStanding23_24(TeamStandingModel):
    pass


class T1_TeamStanding23_24(TeamStandingModel):
    pass


class T1_TeamStanding22_23(TeamStandingModel):
    pass


class T1_TeamStanding21_22(TeamStandingModel):
    pass


class T1_TeamStanding20_21(TeamStandingModel):
    pass


# 球員整賽季模型
class Season_Players_Performance_22_23(models.Model):

    player = models.CharField(max_length=10)
    jersey = models.IntegerField()
    team = models.CharField(max_length=10)
    games_played = models.IntegerField()
    minutes = models.TimeField()
    field_goals_two = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_two_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_two_pct = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three_pct = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws_pct = models.DecimalField(max_digits=10, decimal_places=2)
    points = models.DecimalField(max_digits=10, decimal_places=2)
    offensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    defensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    assists = models.DecimalField(max_digits=10, decimal_places=2)
    steals = models.DecimalField(max_digits=10, decimal_places=2)
    blocks = models.DecimalField(max_digits=10, decimal_places=2)
    turnovers = models.DecimalField(max_digits=10, decimal_places=2)
    fouls = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ["-points"]


class Season_Players_Performance_21_22(models.Model):

    player = models.CharField(max_length=10)
    jersey = models.IntegerField()
    team = models.CharField(max_length=10)
    games_played = models.IntegerField()
    minutes = models.TimeField()
    field_goals_two = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_two_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_two_pct = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three_pct = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws_pct = models.DecimalField(max_digits=10, decimal_places=2)
    points = models.DecimalField(max_digits=10, decimal_places=2)
    offensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    defensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    assists = models.DecimalField(max_digits=10, decimal_places=2)
    steals = models.DecimalField(max_digits=10, decimal_places=2)
    blocks = models.DecimalField(max_digits=10, decimal_places=2)
    turnovers = models.DecimalField(max_digits=10, decimal_places=2)
    fouls = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ["-points"]


class Season_Players_Performance_20_21(models.Model):

    player = models.CharField(max_length=10)
    jersey = models.IntegerField()
    team = models.CharField(max_length=10)
    games_played = models.IntegerField()
    minutes = models.TimeField()
    field_goals_two = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_two_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_two_pct = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three_pct = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws_pct = models.DecimalField(max_digits=10, decimal_places=2)
    points = models.DecimalField(max_digits=10, decimal_places=2)
    offensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    defensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    assists = models.DecimalField(max_digits=10, decimal_places=2)
    steals = models.DecimalField(max_digits=10, decimal_places=2)
    blocks = models.DecimalField(max_digits=10, decimal_places=2)
    turnovers = models.DecimalField(max_digits=10, decimal_places=2)
    fouls = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ["-points"]


class Season_Players_Performance_23_24(models.Model):

    player = models.CharField(max_length=10)
    jersey = models.IntegerField()
    team = models.CharField(max_length=10)
    games_played = models.IntegerField()
    minutes = models.TimeField()
    field_goals_two = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_two_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_two_pct = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    field_goals_three_pct = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws_attempts = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws_pct = models.DecimalField(max_digits=10, decimal_places=2)
    points = models.DecimalField(max_digits=10, decimal_places=2)
    offensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    defensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    assists = models.DecimalField(max_digits=10, decimal_places=2)
    steals = models.DecimalField(max_digits=10, decimal_places=2)
    blocks = models.DecimalField(max_digits=10, decimal_places=2)
    turnovers = models.DecimalField(max_digits=10, decimal_places=2)
    fouls = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ["-points"]
