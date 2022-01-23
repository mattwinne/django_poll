from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from polls.models import Choice, Question
from polls.serializers import ChoiceSerializer, QuestionSeralizer

#test comment
class QuestionViewSet(viewsets.ModelViewSet):

    queryset = Question.objects.all()
    serializer_class = QuestionSeralizer
    permission_classes = [AllowAny]

    @action(detail=True, methods=["get"])
    def list_n_questions(self, requests, pk=id):
        question_set = Question.objects.order_by("-pub_date")[: int(pk)]
        serializer = self.get_serializer(question_set, many=True)
        return Response(serializer.data)

    def list(self, request):
        queryset = Question.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Question.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = QuestionSeralizer(user)
        return Response(serializer.data)


class ChoiceViewSet(viewsets.ModelViewSet):

    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=["get"])
    def up_vote(self, request, pk=None):
        choice = self.get_object()
        choice.votes += 1
        choice.save()
        return Response(choice.votes)

    def list(self, request):
        queryset = Choice.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Choice.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ChoiceSerializer(user)
        return Response(serializer.data)
