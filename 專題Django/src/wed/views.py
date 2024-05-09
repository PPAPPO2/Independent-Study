from django.shortcuts import render

# Create your views here.
def home(request):
    return  render(request,'login.html')
def after(request):
    return render(request,'after.html')
