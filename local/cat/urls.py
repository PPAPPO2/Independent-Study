from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('standings/', views.index, name='team_standings'),
]