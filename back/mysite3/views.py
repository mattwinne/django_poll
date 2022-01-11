from django.db import connection
from django.views.generic import View
from polls.models import Question, Choice
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from polls.serializers import ChoiceSerializer, QuestionSeralizer
from rest_framework import viewsets
from django.shortcuts import get_object_or_404

@api_view(["get"])
@permission_classes([AllowAny])
def up_vote(request, choice_id):
    choice = get_object_or_404(Choice, pk=choice_id)
    choice.votes += 1
    choice.save()
    return Response("done")


class QuestionViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSeralizer
    permission_classes = [AllowAny]

    def list(self, request):
        queryset = Question.objects.all()
        serializer = self.get_serializer(queryset, many =True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Question.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = QuestionSeralizer(user)
        return Response(serializer.data)

class ChoiceViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        queryset = Choice.objects.all()
        serializer = self.get_serializer(queryset, many =True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Choice.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ChoiceSerializer(user)
        return Response(serializer.data)
    
