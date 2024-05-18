from django.db import models

# Create your models here.

# 球隊排名模型
class TeamStanding(models.Model):
    rank = models.IntegerField()
    team_name = models.CharField(max_length=10)
    games_played = models.IntegerField()
    wins = models.IntegerField()
    losses = models.IntegerField()

    pct = models.CharField(max_length=10)
    games_behind = models.CharField(max_length=10)
    wins_losses_streak = models.CharField(max_length=3)
    
    # 用 rank 做排序
    class Meta:
        ordering = ['rank']