from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScheduleViewSet

router = DefaultRouter()
router.register(r'schedules', ScheduleViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('', include(router.urls)),
]