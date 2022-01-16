from rest_framework.test import APITestCase
from django.core.management import call_command

class TestAPI(APITestCase):
    urlQ = "http://0.0.0.0:8000/api/questions/"
    urlC = "http://0.0.0.0:8000/api/choices/"

    def setUp(cls):
        call_command('loaddata', 'testdb.json', verbosity=0) 

    def test_get_questions(self):
        response = self.client.get(self.urlQ)
        result = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(result, list)

    def test_get_question(self):
        pk = 8
        response = self.client.get(self.urlQ + f"{pk}/")
        result = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(result, object)
        self.assertEqual(result["text"], "Best D2 class")

    def test_get_questionlist(self):
        listSize = 5
        response = self.client.get(self.urlQ + f"{listSize}/list_n_questions/")
        result = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(result, list)
        self.assertEqual(len(result), listSize)
        
    def test_post_question(self):
        data = {
            "text": "Favorite color",
            "choices": [
                {"text": "Red"},
                {"text": "Green"},
                {"text": "Blue"},
                {"text": "Yellow"}
            ]
        }
        response = self.client.post(self.urlQ, data=data)
        self.assertEqual(response.status_code, 201)
    
    def test_get_choices(self):
        response = self.client.get(self.urlC)
        result = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(result, list)

    def test_get_choice(self):
        pk = 6
        response = self.client.get(self.urlC + f"{pk}/")
        result = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(result, object)
        self.assertEqual(result["text"], "Eagle")
    
    def test_up_vote(self):
        pk = 3
        choice = self.client.get(self.urlC + f"{pk}/")
        choiceResult = choice.json()
        choiceResultVotes = choiceResult["votes"]

        response = self.client.get(self.urlC + f"{pk}/up_vote/")
        result = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(result, choiceResultVotes + 1)
