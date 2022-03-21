import json

import pytest
from accounts.factories import UserFactory
from rest_framework.test import (
    APIRequestFactory,
    APITestCase,
    force_authenticate,
)

from polls import factories
from polls.views import ChoiceViewSet, QuestionViewSet


@pytest.mark.django_db
class TestAPI(APITestCase):
    def setUp(self):

        self.qfactory1 = factories.QuestionFactory.create(id=1)
        self.qfactory2 = factories.QuestionFactory.create(id=2)
        self.qfactory3 = factories.QuestionFactory.create(id=3)
        self.qfactory4 = factories.QuestionFactory.create(id=4)
        self.qfactory5 = factories.QuestionFactory.create(id=5)

        self.cfactory1 = factories.ChoiceFactory.create(id=25)
        self.cfactory2 = factories.ChoiceFactory.create(id=26)
        self.cfactory3 = factories.ChoiceFactory.create(id=27)
        self.cfactory4 = factories.ChoiceFactory.create(id=28)

        self.user = UserFactory.create(is_staff=True, is_superuser=True, is_active=True)

        self.factory = APIRequestFactory()

    def test_QuestionViewSet_list(self):
        view = QuestionViewSet.as_view({"get": "list"})
        request = self.factory.get("/api/questions/")
        force_authenticate(request, user=self.user)
        response = view(request)
        response.render()
        content = json.loads(response.content)
        assert response.status_code == 200
        assert content[0]["text"] == self.qfactory1.text
        assert content[1]["text"] == self.qfactory2.text
        assert content[2]["text"] == self.qfactory3.text
        assert content[3]["text"] == self.qfactory4.text
        assert content[4]["text"] == self.qfactory5.text

    def test_QuestionViewSet_retrieve(self):
        pk = self.qfactory1.id
        view = QuestionViewSet.as_view({"get": "retrieve"})
        request = self.factory.get(f"/api/questions/{pk}/")
        force_authenticate(request, user=self.user)
        response = view(request, pk)
        response.render()
        content = json.loads(response.content)
        assert response.status_code == 200
        assert content["text"] == self.qfactory1.text

    def test_QuestionViewSet_list_n_questions(self):
        listSize = 5
        view = QuestionViewSet.as_view({"get": "list_n_questions"})
        request = self.factory.get(f"/api/{listSize}/list_n_questions/")
        force_authenticate(request, user=self.user)
        response = view(request, pk=listSize)
        response.render()
        content = json.loads(response.content)
        assert response.status_code == 200
        assert len(content) == listSize

    def test_ChoiceViewSet_list(self):
        view = ChoiceViewSet.as_view({"get": "list"})
        request = self.factory.get("/api/choices/")
        force_authenticate(request, user=self.user)
        response = view(request)
        response.render()
        content = json.loads(response.content)
        assert response.status_code == 200
        assert content[0]["text"] == self.cfactory1.text
        assert content[1]["text"] == self.cfactory2.text
        assert content[2]["text"] == self.cfactory3.text
        assert content[3]["text"] == self.cfactory4.text

    def test_ChoiceViewSet_retrieve(self):
        pk = self.cfactory1.id
        view = ChoiceViewSet.as_view({"get": "retrieve"})
        request = self.factory.get(f"/api/choices/{pk}/")
        force_authenticate(request, user=self.user)
        response = view(request, pk)
        response.render()
        content = json.loads(response.content)
        assert response.status_code == 200
        assert content["text"] == self.cfactory1.text

    def test_up_vote(self):
        pk = self.cfactory4.id
        view = ChoiceViewSet.as_view({"get": "up_vote"})
        request = self.factory.get(f"/api/choices/{pk}/up_vote/")
        force_authenticate(request, user=self.user)
        response = view(request, pk=pk)
        response.render()
        content = json.loads(response.content)
        assert response.status_code == 200
        assert content == self.cfactory4.votes + 1

    def test_not_found(self):
        response = self.client.get("/api/invalid_endpoint")
        assert response.status_code == 404
