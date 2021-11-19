from django.db import connection
from django.http import HttpResponse
from django.views.generic import View
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(["get"])
@permission_classes([AllowAny])
def hello_world(request):
    return Response({"message": "Hello, world!"})