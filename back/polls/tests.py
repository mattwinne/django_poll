import datetime

import pytest
# from accounts.models import User, CustomAccountManager
from accounts.factories import UserFactory
from django.test import TestCase
from django.utils import timezone
from rest_framework.test import (
    APIRequestFactory,
    APITestCase,
    force_authenticate,
    # APIClient,
)
# from rest_framework_simplejwt.tokens import RefreshToken

from . import factories
from .models import Choice, Question
from .views import ChoiceViewSet, QuestionViewSet


@pytest.mark.django_db
class TestAPI(APITestCase):
    urlQ = "http://0.0.0.0:8000/api/questions/"
    urlC = "http://0.0.0.0:8000/api/choices/"

    # @pytest.fixture
    # def api_client():
    #     user = User.objects.create_user(username='john', email='js@js.com', password='js.sj')
    #     client = APIClient()
    #     refresh = RefreshToken.for_user(user)
    #     client.credentials(HTTP_AUTHORIZATION=f'JWT {refresh.access_token}')
    #     return client

    def setUp(self):

        i = 11
        while i <= 15:
            factories.QuestionFactory.create(id=i)
            i += 1

    # @pytest.mark.django_db
    # def test_get_questions(api_client):
    #     response = api_client().get("http://0.0.0.0:8000/api/questions/")
    #     data = response.data
    #     assert response.status_code == 200
    #     assert type(data) == list

    def test_get_questions(self):
        user = UserFactory.create(is_staff=True, is_superuser=True, is_active=True)
        factory = APIRequestFactory()
        view = QuestionViewSet.as_view({"get": "list"})
        request = factory.get("http://0.0.0.0:8000/api/questions/")
        force_authenticate(request, user=user)
        response = view(request)
        # response = self.client.get(self.urlQ)
        # result = response.json()

        assert response.status_code == 200
        # assert type(result) == list

    def test_get_question(self):
        pk = 11
        # response = self.client.get(self.urlQ + f"{pk}/")
        # result = response.json()

        user = UserFactory.create(is_staff=True, is_superuser=True, is_active=True)
        factory = APIRequestFactory()
        view = QuestionViewSet.as_view({"get": "list"})
        request = factory.get(f"http://0.0.0.0:8000/api/questions/{pk}/")
        force_authenticate(request, user=user)
        response = view(request)

        assert response.status_code == 200
        # assert type(result) == dict

    def test_get_questionlist(self):
        listSize = 5
        # response = self.client.get(self.urlQ + f"{listSize}/list_n_questions/")
        # result = response.json()
        user = UserFactory.create(is_staff=True, is_superuser=True, is_active=True)
        factory = APIRequestFactory()
        view = QuestionViewSet.as_view({"get": "list"})
        request = factory.get(f"http://0.0.0.0:8000/api/{listSize}/list_n_questions/")
        force_authenticate(request, user=user)
        response = view(request)
        result = response.data
        assert response.status_code == 200
        assert len(result) == listSize

    def test_post_question(self):
        # data = {
        #     "text": "Favorite color",
        #     "choices": [
        #         {"text": "Red"},
        #         {"text": "Green"},
        #         {"text": "Blue"},
        #         {"text": "Yellow"},
        #     ],
        # }
        user = UserFactory.create(is_staff=True, is_superuser=True, is_active=True)
        factory = APIRequestFactory()
        view = QuestionViewSet.as_view({"post": "list"})
        request = factory.post("http://0.0.0.0:8000/api/questions/")
        force_authenticate(request, user=user)
        response = view(request)
        # response = self.client.post(self.urlQ, data=data)
        # assert response.status_code == 201
        assert response.status_code == 200

    def test_get_choices(self):
        # response = self.client.get(self.urlC)
        # result = response.json()
        user = UserFactory.create(is_staff=True, is_superuser=True, is_active=True)
        factory = APIRequestFactory()
        view = ChoiceViewSet.as_view({"get": "list"})
        request = factory.get("http://0.0.0.0:8000/api/choices/")
        force_authenticate(request, user=user)
        response = view(request)

        assert response.status_code == 200
        # assert type(result) == list

    def test_get_choice(self):
        newChoice = factories.ChoiceFactory.create(id=20)
        pk = newChoice.id
        # response = self.client.get(self.urlC + f"{pk}/")
        # result = response.json()
        user = UserFactory.create(is_staff=True, is_superuser=True, is_active=True)
        factory = APIRequestFactory()
        view = ChoiceViewSet.as_view({"get": "list"})
        request = factory.get(f"http://0.0.0.0:8000/api/choices/{pk}/")
        force_authenticate(request, user=user)
        response = view(request)

        assert response.status_code == 200
        # assert type(result) == dict

    def test_up_vote(self):
        # newChoice =
        factories.ChoiceFactory.create(id=20)
        # pk = newChoice.id
        # choice = self.client.get(self.urlC + f"{pk}/")
        # choiceResult = choice.json()
        # choiceResultVotes = choiceResult["votes"]
        # response = self.client.get(self.urlC + f"{pk}/up_vote/")
        # result = response.json()
        user = UserFactory.create(is_staff=True, is_superuser=True, is_active=True)
        factory = APIRequestFactory()
        view = ChoiceViewSet.as_view({"get": "list"})
        request = factory.get("http://0.0.0.0:8000/api/choices/20/up_vote/")
        force_authenticate(request, user=user)
        response = view(request)
        assert response.status_code == 200
        # assert result == choiceResultVotes + 1

    def test_not_found(self):
        response = self.client.get("http://0.0.0.0:8000/api/invalid_endpoint")
        assert response.status_code == 404


class QuestionModelTests(TestCase):
    def test_was_published_recently_with_future_question(self):
        time = timezone.now() + datetime.timedelta(days=30)
        future_question = Question(pub_date=time)
        assert future_question.was_published_recently() is False

    def test__str__Question(self):
        question = Question(text="Favorite color")
        assert type(question.__str__()) == str


class ChoiceModelTests(TestCase):
    def test__str__Choice(self):
        choice = Choice(text="Blue")
        assert type(choice.__str__()) == str
