from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers, viewsets
from .models import Schedule, ScheduleT
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GameStats
from .serializers import GameStatsSerializer
from .Model.api.main import train_model

def index(request):
    return render(request, "index.html")

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['team_home', 'team_away', 'game_date', 'location']

class ScheduleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class ScheduleTViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ScheduleT.objects.all()
    serializer_class = ScheduleSerializer

@api_view(['GET'])
def get_home_away_stats(request):
    home_team = request.GET.get('homeTeam')
    away_team = request.GET.get('awayTeam')

    # 檢查參數是否完整
    if not home_team or not away_team:
        return Response({"error": "請提供 homeTeam 和 awayTeam 參數"}, status=400)

    # 查詢主隊的主場數據
    home_stats = GameStats.objects.filter(team_name=home_team, is_home=True).values()
    # 查詢客隊的客場數據
    away_stats = GameStats.objects.filter(team_name=away_team, is_home=False).values()

    # 檢查是否有數據
    if not home_stats.exists() or not away_stats.exists():
        return Response({"error": "找不到對應的主場或客場數據"}, status=404)

    # 回傳主隊與客隊數據
    return Response({
        "homeTeam": list(home_stats),
        "awayTeam": list(away_stats),
    })

@api_view(['GET'])
def predict(request):
    try:
        home_team = request.GET.get('homeTeam')
        away_team = request.GET.get('awayTeam')
        is_home_team = request.GET.get('is_home_team')

        # 檢查參數是否完整
        if not home_team or not away_team or is_home_team is None:
            return Response({"error": "請提供 homeTeam、awayTeam 和 is_home_team 參數"}, status=400)

        # 使用模型進行預測
        prediction = train_model(home_team, away_team, is_home_team)

        return Response({
            'status': 'success',
            'prediction': prediction
        })
    except Exception as e:
        # 記錄詳細的錯誤資訊
        return Response({
            'status': 'error',
            'message': 'Internal Server Error'
        }, status=500)