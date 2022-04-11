import pytest
from accounts.factories import UserFactory
from accounts.views import BlacklistTokenUpdateView, CustomUserCreate
from rest_framework.test import APIRequestFactory, APITestCase


@pytest.mark.django_db
class TestAccountsAPI(APITestCase):
    def setUp(self):

        self.user = UserFactory.create(is_staff=True, is_superuser=True, is_active=True)
        self.user2 = UserFactory.create(
            is_staff=True,
            is_superuser=True,
            is_active=True,
            user_name="user1",
            id=2,
            email="mymail1@mail.com",
        )
        self.user3 = UserFactory.create(
            is_staff=True,
            is_superuser=True,
            is_active=True,
            user_name="user2",
            id=3,
            email="mymail2@mail.com",
        )
        self.user4 = UserFactory.create(
            is_staff=True,
            is_superuser=True,
            is_active=True,
            user_name="user3",
            id=4,
            email="mymail3@mail.com",
        )
        self.user5 = UserFactory.create(
            is_staff=True,
            is_superuser=True,
            is_active=True,
            user_name="user4",
            id=5,
            email="mymail4@mail.com",
        )

        self.factory = APIRequestFactory()

    # def test_UserViewSet_retrieve(self):
    #     pk = self.user.id
    #     print(pk)
    #     view = UserViewSet.as_view({"get": "retrieve"})
    #     request = self.factory.get(f"/api/users/{pk}/")
    #     force_authenticate(request, user=self.user)
    #     response = view(request, pk)
    #     response.render()
    #     content = json.loads(response.content)
    #     print(response)
    #     print(content)
    #     assert response.status_code == 200
    #     assert content["userName"] == self.user.user_name

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
        # Breaking the string up to meet flake8 linting requirements

        JWT1 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b"
        JWT2 = "2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0OTgy"
        JWT3 = "NzAwMiwiaWF0IjoxNjQ4OTYzMDAyLCJqdGkiOiJhODk1"
        JWT4 = "YzU0ZWMzZjc0M2E3YTk3ZmQ2MDBlODZhNDE3NiIsInVz"
        JWT5 = "ZXJfaWQiOjR9.BzvFKT68XC7GQZq5v-9sP9L84HrHY30cD7oTZXGhpDo"
        JWT = JWT1 + JWT2 + JWT3 + JWT4 + JWT5
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
