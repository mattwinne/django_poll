from rest_framework import serializers

from polls.models import Choice, Question

class QuestionSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text', 'pub_date', 'choice_set']

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'question', 'text', 'votes']
