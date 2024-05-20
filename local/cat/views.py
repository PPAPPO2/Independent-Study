from django.shortcuts import render
from .models import TeamStanding23_24

# Create your views here.
def index(request):
    standings = TeamStanding23_24.objects.all()

    team_name_mapping = {
        '勇士': '臺北富邦勇士',
        '領航猿': '桃園樸園領航猿',
        '夢想家': '福爾摩沙夢想家',
        '攻城獅': '新竹御頂攻城獅',
        '國王':'新北國王',
        '鋼鐵人':'高雄17直播鋼鐵人',
    }

    for standing in standings:
        standing.team_name = team_name_mapping.get(standing.team_name, standing.team_name)

    return render(request, 'homepage.html', {'standings': standings})

def login(request):
    return render(request,'login.html')


