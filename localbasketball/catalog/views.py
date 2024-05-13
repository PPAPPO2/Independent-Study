from django.shortcuts import render

# Create your views here.

def homepage(request):
    """View function for home page of site."""
    context = {
        'HomePage': 'Hello',
    }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'homepage.html', context=context)