from django.contrib import admin

# Register your models here.
from .models import TeamStanding20_21, TeamStanding21_22, TeamStanding22_23, TeamStanding23_24, Season_Players_Performance_20_21, Season_Players_Performance_21_22, Season_Players_Performance_22_23, Season_Players_Performance_23_24,T1_TeamStanding20_21, T1_TeamStanding21_22, T1_TeamStanding22_23, T1_TeamStanding23_24

@admin.register(TeamStanding20_21, TeamStanding21_22, TeamStanding22_23, TeamStanding23_24)
class TeamStandingAdmin(admin.ModelAdmin):
    # pass
    list_display = ('rank', 'team_name', 'games_played', 'wins', 'losses', 'pct', 'games_behind', 'wins_losses_streak')

@admin.register(Season_Players_Performance_20_21, Season_Players_Performance_21_22, Season_Players_Performance_22_23, Season_Players_Performance_23_24)
class Season_Players_PerformanceAdmin(admin.ModelAdmin):
    # pass
    list_display = ('player', 'jersey', 'team', 'points', 'rebounds', 'assists', 'steals', 'blocks')
@admin.register(T1_TeamStanding20_21, T1_TeamStanding21_22, T1_TeamStanding22_23, T1_TeamStanding23_24)    
class T1_TeamStandingAdmin(admin.ModelAdmin):
    # pass
    list_display = ('rank', 'team_name', 'games_played', 'wins', 'losses', 'games_behind', 'wins_losses_streak')