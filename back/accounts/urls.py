from django.urls import path

from .views import BlacklistTokenUpdateView, CustomUserCreate


app_name = "accounts"

urlpatterns = [
    path("create/", CustomUserCreate.as_view(), name="create_user"),
    path("logout/blacklist/", BlacklistTokenUpdateView.as_view(), name="blacklist"),
]
