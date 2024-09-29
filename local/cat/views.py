from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers, viewsets
from .models import Schedule

def index(request):
    return render(request, "index.html")

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['team_home', 'team_away', 'game_date', 'location']

class ScheduleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
