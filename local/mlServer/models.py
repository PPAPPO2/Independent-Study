from django.db import models

# Create your models here.
class GameRecord(models.Model):
    points = models.FloatField()  # 比賽得分
    turnover = models.FloatField()  # 失誤次數
    ast = models.FloatField()  # 助攻次數
    blk = models.FloatField()  # 蓋帽次數
    reb_d = models.FloatField()  # 防守籃板
    reb_o = models.FloatField()  # 進攻籃板
    pfoul = models.FloatField()  # 犯規次數
    stl = models.FloatField()  # 抄截次數
    reb = models.FloatField()  # 總籃板
    two = models.FloatField()  # 兩分球命中次數
    twop = models.FloatField()  # 兩分球命中率
    trey = models.FloatField()  # 三分球命中次數
    treyp = models.FloatField()  # 三分球命中率
    ft = models.FloatField()  # 罰球次數
    ftp = models.FloatField()  # 罰球命中率
    team = models.CharField(max_length=50)  # 隊伍名稱
    two_m = models.FloatField()  # 兩分球出手次數
    trey_m = models.FloatField()  # 三分球出手次數
    ft_m = models.FloatField()  # 罰球出手次數
    match = models.CharField(max_length=100)  # 比賽名稱 (例如：'新北國王 vs. 臺北富邦勇士')

    def __str__(self):
        return f"{self.match} - {self.team} ({self.points} points)"