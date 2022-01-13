from django.contrib import admin
from django.urls import path
from mysite3.views import (
    QuestionViewSet,
    ChoiceViewSet
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/questions', QuestionViewSet, basename='questions')
router.register(r'api/choices', ChoiceViewSet, basename='choices')
urlpatterns = [
    path("admin/", admin.site.urls)
]
urlpatterns += router.urls