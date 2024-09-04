from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class Season_Players_Performance(models.Model):
    player = models.CharField(max_length=10)

    pos = models.CharField(max_length=10, default='')  # 新增欄位

    jersey = models.IntegerField()
    position = models.CharField(max_length=10, default='0') 
    team = models.CharField(max_length=10)

    # 新增球員出賽場次 & 出賽時間
    game_played = models.IntegerField(default=0)
    minutes = models.CharField(max_length=5, default='00:00')

    points = models.DecimalField(max_digits=10, decimal_places=2)
    #總命中
    All_goals_made = models.DecimalField(max_digits=10, decimal_places=2,default=0) #要加
    #總出手
    All_goals = models.DecimalField(max_digits=10, decimal_places=2,default=0) #要加
    #總命中率
    All_goals_pct = models.DecimalField(max_digits=10, decimal_places=2,default=0) #要加
    #兩分
    field_goals_two_made = models.DecimalField(max_digits= 10,decimal_places=2,default=0)
    field_goals_two = models.DecimalField(max_digits=10, decimal_places=2)#要加
    field_goals_two_pct = models.DecimalField(max_digits=10, decimal_places=2)
    #三分
    field_goals_three_made = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    field_goals_three = models.DecimalField(max_digits=10, decimal_places=2,default=0)#要加
    field_goals_three_pct = models.DecimalField(max_digits=10, decimal_places=2)
    #罰球
    free_throws_made = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws = models.DecimalField(max_digits=10, decimal_places=2)#要加
    free_throws_pct = models.DecimalField(max_digits=10, decimal_places=2)
    #其他
    
    offensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    defensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    assists = models.DecimalField(max_digits=10, decimal_places=2)
    steals = models.DecimalField(max_digits=10, decimal_places=2)
    blocks = models.DecimalField(max_digits=10, decimal_places=2)
    turnovers = models.DecimalField(max_digits=10, decimal_places=2)
    fouls = models.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
       abstract = True



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
class P_TeamStanding20_21(TeamStandingModel):
    pass

class P_TeamStanding21_22(TeamStandingModel):
    pass


class P_TeamStanding22_23(TeamStandingModel):
    pass


class P_TeamStanding23_24(TeamStandingModel):
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
class P_Season_Players_Performance_22_23(Season_Players_Performance):

    pass



class P_Season_Players_Performance_21_22(Season_Players_Performance):

    pass


class P_Season_Players_Performance_20_21(Season_Players_Performance):

    pass
class P_Season_Players_Performance_23_24(Season_Players_Performance):

    pass

class T1_Season_Players_Performance_21_22(Season_Players_Performance):
    pass

class T1_Season_Players_Performance_22_23(Season_Players_Performance):
    pass
class T1_Season_Players_Performance_23_24(Season_Players_Performance):
    pass

# 賽季球隊數據
class Season_teams_Performance(models.Model):
    team = models.CharField(max_length=10)
    points = models.DecimalField(max_digits=10, decimal_places=2)
    #總出手、命中、命中率 #要加
    All_goals_made = models.DecimalField(max_digits=10, decimal_places=2,default=0) 
    All_goals = models.DecimalField(max_digits=10, decimal_places=2,default=0) 
    All_goals_pct = models.DecimalField(max_digits=10, decimal_places=2,default=0) 
    #兩分
    field_goals_two_made = models.DecimalField(max_digits= 10,decimal_places=2,default=0)
    field_goals_two = models.DecimalField(max_digits=10, decimal_places=2)#要加
    field_goals_two_pct = models.DecimalField(max_digits=10, decimal_places=2)
    #三分
    field_goals_three_made = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    field_goals_three = models.DecimalField(max_digits=10, decimal_places=2,default=0)#要加 
    field_goals_three_pct = models.DecimalField(max_digits=10, decimal_places=2)
    #罰球
    free_throws_made = models.DecimalField(max_digits=10, decimal_places=2)
    free_throws = models.DecimalField(max_digits=10, decimal_places=2)#要加
    free_throws_pct = models.DecimalField(max_digits=10, decimal_places=2)
    #其他
    
    offensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    defensive_rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    rebounds = models.DecimalField(max_digits=10, decimal_places=2)
    assists = models.DecimalField(max_digits=10, decimal_places=2)
    steals = models.DecimalField(max_digits=10, decimal_places=2)
    blocks = models.DecimalField(max_digits=10, decimal_places=2)
    turnovers = models.DecimalField(max_digits=10, decimal_places=2)
    fouls = models.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
       abstract = True
class T1_Season_teams_Performance_23_24(Season_teams_Performance):
    pass
class T1_Season_teams_Performance_22_23(Season_teams_Performance):
    pass
class T1_Season_teams_Performance_21_22(Season_teams_Performance):
    pass


class P_Season_teams_Performance_23_24(Season_teams_Performance):
    pass
class P_Season_teams_Performance_22_23(Season_teams_Performance):
    pass
class P_Season_teams_Performance_21_22(Season_teams_Performance):
    pass
class P_Season_teams_Performance_20_21(Season_teams_Performance):
    pass