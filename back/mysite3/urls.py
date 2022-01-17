from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter

from mysite3.views import ChoiceViewSet, QuestionViewSet

router = DefaultRouter()
router.register(r"api/questions", QuestionViewSet, basename="questions")
router.register(r"api/choices", ChoiceViewSet, basename="choices")
urlpatterns = [path("admin/", admin.site.urls)]
urlpatterns += router.urls
