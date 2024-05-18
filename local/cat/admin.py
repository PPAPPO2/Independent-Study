from django.contrib import admin

# Register your models here.
from .models import TeamStanding

@admin.register(TeamStanding)
class TeamStandingAdmin(admin.ModelAdmin):
    # pass
    list_display = ('rank', 'team_name', 'games_played', 'wins', 'losses', 'pct', 'games_behind', 'wins_losses_streak')