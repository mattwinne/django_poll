import datetime

from django.core.management import call_command
from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APITestCase

from .models import Choice, Question


class TestAPI(APITestCase):
    urlQ = "http://0.0.0.0:8000/api/questions/"
    urlC = "http://0.0.0.0:8000/api/choices/"

    def setUp(self):
        call_command("loaddata", "testdb.json", verbosity=0)

    def test_get_questions(self):
        response = self.client.get(self.urlQ)
        result = response.json()

        assert response.status_code == 200
        assert type(result) == list

    def test_get_question(self):
        pk = 8
        response = self.client.get(self.urlQ + f"{pk}/")
        result = response.json()

        assert response.status_code == 200
        assert type(result) == dict
        assert result["text"] == "Best D2 class"

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
        pk = 6
        response = self.client.get(self.urlC + f"{pk}/")
        result = response.json()

        assert response.status_code == 200
        assert type(result) == dict
        assert result["text"] == "Eagle"

    def test_up_vote(self):
        pk = 3
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
