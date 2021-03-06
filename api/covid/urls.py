"""covid URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.urls import include,path
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from accounts import views as accountViews
from campaigns import views as campaignViews
router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/',accountViews.Login,name='login'),
    path('checkLogin/',accountViews.checkLogin,name='checkLogin'),
    path('logout/',accountViews.Logout,name='logout'),
    path('signup/',accountViews.Register,name='signup'),
    path('campaigns/',campaignViews.getCampaigns,name='campaignsAll'),
    path('campaigns/create',campaignViews.createCampaigns,name='createCampaign'),
    path('setUserData/',accountViews.setAdditionalData,name='setUsersDetails'),
    path('accounts/',accountViews.getUsersByAddress,name='get Users by address'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', include(router.urls)),

]
