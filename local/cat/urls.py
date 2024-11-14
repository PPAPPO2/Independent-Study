from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScheduleViewSet, ScheduleTViewSet
from .views import get_home_away_stats


router = DefaultRouter()
router.register(r'schedulesP', ScheduleViewSet)
router.register(r'schedulesT', ScheduleTViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('', include(router.urls)),
    path('api/home-away-stats/', get_home_away_stats, name='get_home_away_stats'),
]