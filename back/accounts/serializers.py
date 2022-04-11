from accounts.models import User
from rest_framework import serializers

from polls.serializers import QuestionSerializer


class CustomUserSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ("email", "user_name", "password", "questions")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class CustomSafeUserSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    user_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ("user_name", "questions")
