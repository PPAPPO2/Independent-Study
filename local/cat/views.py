from django.shortcuts import render

# Create your views here.
def index(request):
    """View function for home page of site."""
    standings = TeamStanding23_24.objects.all()
    # Render the HTML template index.html with the data in the context variable
    return render(request, 'homepage.html', {'standings': standings})
def login(request):
    return render(request,'login.html')

from .models import TeamStanding23_24
