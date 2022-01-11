from django.contrib import admin
from django.urls import path
from mysite3.views import (
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
    path("api/up_vote/<int:choice_id>/", up_vote, name="up_vote"),
]
urlpatterns += router.urls