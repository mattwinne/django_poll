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
        JWT1 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXB"
        JWT2 = "lIjoicmVmcmVzaCIsImV4cCI6MTY0ODY5NjY3NiwiaWF0IjoxNjQ3ODMyNjc2LCJqdGkiOiIyZTI0"
        JWT3 = "YjdjNzgwNDg0MGU1YWE2ODliOTg5NTBkNDlhYyIsInVzZXJfaWQiOjF9.q2"
        JWT4 = "IqDijqyx05awpqVltBm6Sjbtg6lVhsE_9pVGtZR5U"
        JWT = JWT1 + JWT2 + JWT3 + JWT4
        token = {"refresh_token": JWT}

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
