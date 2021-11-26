from django.db import connection
from django.http import HttpResponse
from django.views.generic import View
from rest_framework import serializers
from rest_framework.serializers import Serializer
from polls.models import Question, Choice
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from polls.serializers import ChoiceSerializer, QuestionSeralizer
from rest_framework import viewsets
from django.shortcuts import get_object_or_404


@api_view(["get"])
@permission_classes([AllowAny])
def hello_world(request):
    return Response({"message": "Hello, world!"})

@api_view(["get"])
@permission_classes([AllowAny])
def q_list(request):
    print("deez nuts")
    serializer = QuestionSeralizer(Question.objects.all())
    return Response(serializer.data)


class QuestionViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSeralizer
    permission_classes = [AllowAny]

    def list(self, request):
        print("def list")
        queryset = Question.objects.all()
        print(queryset)
        serializer = self.get_serializer(queryset, many =True)
        print(serializer)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        print("def retrive")
        queryset = Question.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = QuestionSeralizer(user)
        print(serializer.data)
        return Response(serializer.data)

class ChoiceViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        print("def list")
        queryset = Choice.objects.all()
        print(queryset)
        serializer = self.get_serializer(queryset, many =True)
        print(serializer)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        print("def retrive")
        queryset = Choice.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ChoiceSerializer(user)
        print(serializer.data)
        return Response(serializer.data)
    

# @api_view(["get"])
# @permission_classes([AllowAny])
# def question_list(request):
#    return Response(["hello", "goodbye", "so long"])
#    return Response({"list return"})

