from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from polls.models import Choice, Question
from polls.serializers import ChoiceSerializer, CountSerializer, QuestionSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    authentication_classes = ()
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    @action(detail=True, methods=["get"])
    def list_n_questions(self, requests, pk=id):
        question_set = Question.objects.order_by("-pub_date")[: int(pk)]
        serializer = self.get_serializer(question_set, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def list_5_questions(self, requests, pk=id):
        pk = int(pk)
        question_set = Question.objects.order_by("-pub_date")[pk : (pk + 5)]
        serializer = self.get_serializer(question_set, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def question_count(self, requests):
        count = Question.objects.count()
        countDict = {"count": count}
        serializerCount = CountSerializer(countDict, many=False)
        return Response(serializerCount.data)

    def list(self, request):
        queryset = Question.objects.all()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Question.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = QuestionSerializer(user)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        data["user"] = request.user.id
        serializer = QuestionSerializer(data=data)
        if serializer.is_valid():
            question = serializer.save()
            if question:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChoiceViewSet(viewsets.ModelViewSet):
    authentication_classes = ()
    permission_classes = [AllowAny]
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

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

    def create(self, request):
        serializer = ChoiceSerializer(data=request.data)
        if serializer.is_valid():
            choice = serializer.save()
            if choice:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
