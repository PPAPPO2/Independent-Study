from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_win_probability, name='predict_win_probability'),
]
