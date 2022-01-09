"""mysite3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.urls import include, path
from mysite3 import settings
from mysite3.views import (
    hello_world,
    q_list,
    up_vote,
    QuestionViewSet,
    ChoiceViewSet
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/questions', QuestionViewSet, basename='questions')
router.register(r'api/choices', ChoiceViewSet, basename='choices')
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/q_list/", q_list, name="q_list"),
    path("api/hello_world/", hello_world, name="hello_world"),
    path("api/up_vote/<int:choice_id>/", up_vote, name="up_vote"),
]
urlpatterns += router.urls