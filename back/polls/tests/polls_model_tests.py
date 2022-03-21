import datetime

from django.test import TestCase
from django.utils import timezone

from polls.factories import ChoiceFactory, QuestionFactory
from polls.models import Question


class QuestionTestModel(TestCase):
    def setUp(self):
        self.question = QuestionFactory.create(text="test question")

    def test_str(self):
        assert str(self.question) == "test question"

    def test_was_published_recently(self):
        assert self.question.was_published_recently()

    def test_was_published_recently_with_future_question(self):
        time = timezone.now() + datetime.timedelta(days=30)
        future_question = Question(pub_date=time)
        assert future_question.was_published_recently() is False


class ChoiceTestModel(TestCase):
    def setUp(self):
        self.choice = ChoiceFactory.create(text="test choice")

    def test_str(self):
        assert str(self.choice) == "test choice"
