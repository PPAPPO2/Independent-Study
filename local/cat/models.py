from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class Season_Players_Performance(models.Model):
    player = models.CharField(max_length=10)
    jersey = models.IntegerField()
    position = models.CharField(max_length=10, default='0') 
    team = models.CharField(max_length=10)

    # 新增球員出賽場次 & 出賽時間
    game_played = models.IntegerField(default=0)
    minutes = models.CharField(max_length=5, default='00:00:00')

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

class P_TeamStanding24_25(TeamStandingModel):
    pass

class T1_TeamStanding24_25(TeamStandingModel):
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
class P_Season_Players_Performance_24_25(Season_Players_Performance):

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

class P_Season_teams_Performance_24_25(Season_teams_Performance):
    pass
class P_Season_teams_Performance_23_24(Season_teams_Performance):
    pass
class P_Season_teams_Performance_22_23(Season_teams_Performance):
    pass
class P_Season_teams_Performance_21_22(Season_teams_Performance):
    pass
class P_Season_teams_Performance_20_21(Season_teams_Performance):
    pass

class Schedule(models.Model):
    team_home = models.CharField(max_length=100)
    team_away = models.CharField(max_length=100)
    game_date = models.DateTimeField()
    location = models.CharField(max_length=200)

    class Meta:
        db_table = 'ScheduleP'

    def __str__(self):
        return f"日期：{self.game_date}, {self.team_home} vs {self.team_away} 在 {self.location}"

class ScheduleT(models.Model):
    team_home = models.CharField(max_length=100)
    team_away = models.CharField(max_length=100)
    game_date = models.DateTimeField()
    location = models.CharField(max_length=200)

    def __str__(self):
        return f"日期：{self.game_date}, {self.team_home} vs {self.team_away} 在 {self.location}"
    
class T1_Season_Playoff_Players_Performance_23_24(Season_Players_Performance):
    pass
class T1_Season_Playoff_Players_Performance_22_23(Season_Players_Performance):
    pass
class T1_Season_Players_Final_Performance_23_24(Season_Players_Performance):
    pass
class T1_Season_Players_Final_Performance_22_23(Season_Players_Performance):
    pass


class P_Season_Players_Playoff_Performance_23_24(Season_Players_Performance):
    pass
class P_Season_Players_Palyoff_Performance_22_23(Season_Players_Performance):
    pass
class P_Season_Players_Final_Performance_23_24(Season_Players_Performance):
    pass
class P_Season_Players_Final_Performance_22_23(Season_Players_Performance):
    pass



class T1_Season_Teams_Final_Performance_22_23(Season_teams_Performance):
    pass
class T1_Season_Teams_Final_Performance_23_24(Season_teams_Performance):
    pass
class T1_Season_Teams_Playoff_Performance_22_23(Season_teams_Performance):
    pass
class T1_Season_Teams_Playoff_Performance_23_24(Season_teams_Performance):
    pass

class P_Season_Teams_Playoff_Performance_22_23(Season_teams_Performance):
    pass
class P_Season_Teams_Playoff_Performance_23_24(Season_teams_Performance):
    pass
class P_Season_Teams_Final_Performance_22_23(Season_teams_Performance):
    pass
class P_Season_Teams_Final_Performance_23_24(Season_teams_Performance):
    pass

class TPBL_Season_Teams_Final_Performance_24_25(Season_teams_Performance):
    pass
class TPBL_Season_Teams_Performance_24_25(Season_teams_Performance):
    pass
class TPBL_Season_Players_Performance_24_25(Season_Players_Performance):
    pass


class AllPlayerData(models.Model):
    # 球員每場比賽數據
    gameID = models.CharField(max_length=100, verbose_name="比賽場次")
    game_time = models.CharField(max_length=50, verbose_name="比賽時間")

    name = models.CharField(max_length=100, verbose_name="球員姓名")
    jersey = models.CharField(max_length=10, verbose_name="球衣號碼")

    points = models.IntegerField(verbose_name="得分")
    positive = models.IntegerField(verbose_name="正負值")
    starter = models.BooleanField(verbose_name="是否為先發")
    turnover = models.IntegerField(verbose_name="失誤")
    ast = models.IntegerField(verbose_name="助攻")
    blk = models.IntegerField(verbose_name="阻攻")
    stl = models.IntegerField(verbose_name="抄截")
    reb = models.IntegerField(verbose_name="籃板")
    reb_d = models.IntegerField(verbose_name="防守籃板")
    reb_o = models.IntegerField(verbose_name="進攻籃板")
    eff = models.FloatField(verbose_name="效率值")
    efgp = models.FloatField(verbose_name="有效命中率")
    tsp = models.FloatField(verbose_name="真實命中率")
    mins = models.CharField(max_length=10, verbose_name="上場時間")

    two = models.IntegerField(verbose_name="兩分球命中")
    two_m_two = models.IntegerField(verbose_name="兩分球出手")
    twop = models.FloatField(verbose_name="兩分球命中率")
    two_m = models.IntegerField(verbose_name="兩分球總得分")

    trey = models.IntegerField(verbose_name="三分球命中")
    trey_m_trey = models.IntegerField(verbose_name="三分球出手")
    treyp = models.FloatField(verbose_name="三分球命中率")
    trey_m = models.IntegerField(verbose_name="三分球總得分")

    ft = models.IntegerField(verbose_name="罰球命中")
    ft_m_ft = models.IntegerField(verbose_name="罰球出手")
    ftp = models.FloatField(verbose_name="罰球命中率")
    ft_m = models.IntegerField(verbose_name="罰球總得分")

    pfoul = models.IntegerField(verbose_name="犯規")

    team = models.CharField(max_length=50, verbose_name="球隊代碼")
    team_name = models.CharField(max_length=100, verbose_name="球隊名稱")
    team_home = models.CharField(max_length=100, verbose_name="主場球隊")
    team_away = models.CharField(max_length=100, verbose_name="客場球隊")

    class Meta:
        verbose_name = "球員統計資料"
        verbose_name_plural = "球員統計資料"

    def __str__(self):
        return f"{self.date} - {self.name} ({self.team_name})"
    
class GameStats(models.Model):
    game_id = models.CharField(max_length=100, verbose_name="比賽場次")
    team_name = models.CharField(max_length=100, verbose_name="球隊名稱")
    is_home = models.BooleanField(default=False, verbose_name="是否為主場")
    two_m = models.IntegerField(verbose_name="兩分球命中")
    two = models.IntegerField(verbose_name="兩分球出手")
    twop = models.FloatField(verbose_name="兩分球命中率")
    trey_m = models.IntegerField(verbose_name="三分球命中")
    trey = models.IntegerField(verbose_name="三分球出手")
    treyp = models.FloatField(verbose_name="三分球命中率")
    ft_m = models.IntegerField(verbose_name="罰球命中")
    ft = models.IntegerField(verbose_name="罰球出手")
    ftp = models.FloatField(verbose_name="罰球命中率")
    points = models.IntegerField(verbose_name="得分")
    reb = models.IntegerField(verbose_name="籃板")
    reb_o = models.IntegerField(verbose_name="進攻籃板")
    reb_d = models.IntegerField(verbose_name="防守籃板")
    ast = models.IntegerField(verbose_name="助攻")
    stl = models.IntegerField(verbose_name="抄截")
    blk = models.IntegerField(verbose_name="阻攻")
    turnover = models.IntegerField(verbose_name="失誤")
    pfoul = models.IntegerField(verbose_name="犯規")

    def __str__(self):
        return f"{self.game_id} - {self.team_name}"
