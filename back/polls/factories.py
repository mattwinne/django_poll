import factory
import factory.fuzzy
from factory.django import DjangoModelFactory

from . import models


class QuestionFactory(DjangoModelFactory):
    class Meta:
        model = models.Question

    text = factory.Faker("text")


class ChoiceFactory(DjangoModelFactory):
    class Meta:
        model = models.Choice

    text = factory.Faker("text")
    question = factory.SubFactory(QuestionFactory)
    votes = factory.fuzzy.FuzzyInteger(0, 100)
