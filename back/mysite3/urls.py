from django.contrib import admin
from django.urls import include, path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from mysite3 import settings

from polls.views import ChoiceViewSet, QuestionViewSet

router = DefaultRouter()
router.register(r"api/questions", QuestionViewSet, basename="questions")
router.register(r"api/choices", ChoiceViewSet, basename="choices")
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/", include("accounts.urls", namespace="accounts")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + staticfiles_urlpatterns()
urlpatterns += router.urls
