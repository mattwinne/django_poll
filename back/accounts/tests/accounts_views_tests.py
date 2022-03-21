
import pytest
from accounts.factories import UserFactory
from accounts.views import BlacklistTokenUpdateView, CustomUserCreate
from rest_framework.test import APIRequestFactory, APITestCase


@pytest.mark.django_db
class TestAccountsAPI(APITestCase):
    def setUp(self):

        self.user = UserFactory.create(is_staff=True, is_superuser=True, is_active=True)

        self.factory = APIRequestFactory()

    def test_CustomUserCreate_post(self):
        user_info = {
            "email": "userman@user.com",
            "user_name": "userman",
            "password": "abcd1234",
        }

        view = CustomUserCreate.as_view()
        request = self.factory.post("/api/user/create/", user_info)
        response = view(request)

        assert response.status_code == 201

    def test_CustomUserCreate_post_invalid(self):
        user_info = {"invalid input"}

        view = CustomUserCreate.as_view()
        request = self.factory.post("/api/user/create/", user_info)
        response = view(request)

        assert response.status_code == 400

    def test_BlacklistTokenUpdateView_post(self):
        #Breaking the string up to meet flake8 linting requirements
        JWT1 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90"
        JWT2 = "eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0ODcwMzAwOSwiaWF0Ijox"
        JWT3 = "NjQ3ODM5MDA5LCJqdGkiOiIzMTJkMGU2ZWQwNmQ0N"
        JWT4 = "WY5OTUzNGY4NGU5ZTZjOWQwOSIsInVzZXJfaWQiOjF9.c"
        JWT5 = "-bg49py17OpOxnST_ZFVECDqFXAwkjqyFi0X_aCQ_M"
        JWT = JWT1 + JWT2 + JWT3 + JWT4 + JWT5
        token = {
            "refresh_token": JWT
        }

        view = BlacklistTokenUpdateView.as_view()
        request = self.factory.post("/api/user/logout/blacklist/", token)
        response = view(request)

        assert response.status_code == 205

    def test_BlacklistTokenUpdateView_post_invalid(self):
        token = "invalid info"

        view = BlacklistTokenUpdateView.as_view()
        request = self.factory.post("/api/user/logout/blacklist/", token)
        response = view(request)

        assert response.status_code == 400
