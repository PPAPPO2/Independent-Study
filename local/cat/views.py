import os
import pandas as pd
import numpy as np
from django.shortcuts import render
import joblib
from django.http import JsonResponse

def index(request):
    return render(request, "index.html")
