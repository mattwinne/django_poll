import datetime

import pytest
from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APITestCase

from . import factories
from .models import Choice, Question


@pytest.mark.django_db
class TestAPI(APITestCase):
    urlQ = "http://0.0.0.0:8000/api/questions/"
    urlC = "http://0.0.0.0:8000/api/choices/"

    def setUp(self):
        q1 = factories.QuestionFactory(id=1)
        q2 = factories.QuestionFactory(id=2)
        q3 = factories.QuestionFactory(id=3)
        q4 = factories.QuestionFactory(id=4)
        q5 = factories.QuestionFactory(id=5)

        c1 = factories.ChoiceFactory(id=1)
        c2 = factories.ChoiceFactory(id=2)
        c3 = factories.ChoiceFactory(id=3)
        c4 = factories.ChoiceFactory(id=4)
        c5 = factories.ChoiceFactory(id=5)

    def test_get_questions(self):
        response = self.client.get(self.urlQ)
        result = response.json()

        assert response.status_code == 200
        assert type(result) == list

    def test_get_question(self):
        pk = 1
        response = self.client.get(self.urlQ + f"{pk}/")
        result = response.json()

        assert response.status_code == 200
        assert type(result) == dict

    def test_get_questionlist(self):
        listSize = 5
        response = self.client.get(self.urlQ + f"{listSize}/list_n_questions/")
        result = response.json()
        assert response.status_code == 200
        assert type(result) == list
        assert len(result) == listSize

    def test_post_question(self):
        data = {
            "text": "Favorite color",
            "choices": [
                {"text": "Red"},
                {"text": "Green"},
                {"text": "Blue"},
                {"text": "Yellow"},
            ],
        }
        response = self.client.post(self.urlQ, data=data)
        assert response.status_code == 201

    def test_get_choices(self):
        response = self.client.get(self.urlC)
        result = response.json()

        assert response.status_code == 200
        assert type(result) == list

    def test_get_choice(self):
        pk = 1
        response = self.client.get(self.urlC + f"{pk}/")
        result = response.json()

        assert response.status_code == 200
        assert type(result) == dict

    def test_up_vote(self):
        pk = 1
        choice = self.client.get(self.urlC + f"{pk}/")
        choiceResult = choice.json()
        choiceResultVotes = choiceResult["votes"]

        response = self.client.get(self.urlC + f"{pk}/up_vote/")
        result = response.json()
        assert response.status_code == 200
        assert result == choiceResultVotes + 1

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
