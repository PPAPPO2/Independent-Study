"""
URL configuration for local project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path
from django.views.generic import TemplateView

import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cat/', include('cat.urls')),  # cat/ 轉發請求到模塊 cat.urls
    path('', RedirectView.as_view(url='/cat/')),  # 重新導向 URL 127.0.0.1:8000/cat/
    path('accounts/', include('django.contrib.auth.urls')),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),  # 這個路由將所有未匹配到的路由轉發到你的React應用
]

# 啟用靜態文件的提供
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# 新增處理 /images/ 的路徑
urlpatterns += static('/images/', document_root=os.path.join(settings.BASE_DIR, 'frontend', 'public', 'images'))
