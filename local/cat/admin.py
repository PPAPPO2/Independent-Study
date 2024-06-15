from django.contrib import admin

# Register your models here.
from .models import P_TeamStanding20_21, P_TeamStanding21_22, P_TeamStanding22_23, P_TeamStanding23_24, P_Season_Players_Performance_20_21, P_Season_Players_Performance_21_22, P_Season_Players_Performance_22_23, P_Season_Players_Performance_23_24,T1_TeamStanding20_21, T1_TeamStanding21_22, T1_TeamStanding22_23, T1_TeamStanding23_24, T1_Season_teams_Performance_21_22, T1_Season_teams_Performance_22_23, T1_Season_teams_Performance_23_24, P_Season_teams_Performance_20_21, P_Season_teams_Performance_21_22, P_Season_teams_Performance_22_23, P_Season_teams_Performance_23_24

@admin.register(P_TeamStanding20_21, P_TeamStanding21_22, P_TeamStanding22_23, P_TeamStanding23_24)
class TeamStandingAdmin(admin.ModelAdmin):
    # pass
    list_display = ('rank', 'team_name', 'games_played', 'wins', 'losses', 'pct', 'games_behind', 'wins_losses_streak')

@admin.register(P_Season_Players_Performance_20_21, P_Season_Players_Performance_21_22, P_Season_Players_Performance_22_23, P_Season_Players_Performance_23_24)
class P_Season_Players_PerformanceAdmin(admin.ModelAdmin):
    # pass
    list_display = ('player', 'jersey', 'team', 'points', 'rebounds', 'assists', 'steals', 'blocks')
@admin.register(T1_TeamStanding20_21, T1_TeamStanding21_22, T1_TeamStanding22_23, T1_TeamStanding23_24)    
class T1_TeamStandingAdmin(admin.ModelAdmin):
    # pass
    list_display = ('rank', 'team_name', 'games_played', 'wins', 'losses', 'games_behind', 'wins_losses_streak')

@admin.register(T1_Season_teams_Performance_21_22, T1_Season_teams_Performance_22_23, T1_Season_teams_Performance_23_24)    
class T1_Season_teams_Performance(admin.ModelAdmin):
    # pass
    list_display = ('team', 'points', 'rebounds', 'assists', 'steals', 'blocks', 'turnovers')

@admin.register(P_Season_teams_Performance_20_21, P_Season_teams_Performance_21_22, P_Season_teams_Performance_22_23, P_Season_teams_Performance_23_24)    
class T1_Season_teams_Performance(admin.ModelAdmin):
    # pass
    list_display = ('team', 'points', 'rebounds', 'assists', 'steals', 'blocks', 'turnovers')