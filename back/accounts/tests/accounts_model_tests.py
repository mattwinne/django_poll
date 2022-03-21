import pytest
from accounts import factories
from django.contrib.auth import get_user_model
from django.test import TestCase


class UserAccountTests(TestCase):
    def test_new_superuser(self):
        db = get_user_model()
        super_user = factories.AdminFactory.create()
        assert super_user.email == "testuser@super.com"
        assert super_user.user_name == "username"
        assert super_user.first_name == "firstname"
        assert super_user.is_superuser
        assert super_user.is_staff
        assert str(super_user) == "username"

        with pytest.raises(ValueError):
            db.objects.create_superuser(
                email="testuser@super.com",
                user_name="username1",
                first_name="first_name",
                password="password",
                is_superuser=False,
            )

        with pytest.raises(ValueError):
            db.objects.create_superuser(
                email="testuser@super.com",
                user_name="username1",
                first_name="first_name",
                password="password",
                is_staff=False,
            )

        with pytest.raises(ValueError):
            db.objects.create_superuser(
                email="",
                user_name="username1",
                first_name="first_name",
                password="password",
                is_superuser=True,
            )

    def test_new_user(self):
        db = get_user_model()
        user = db.objects.create_user(
            "testuser@user.com", "username", "firstname", "password"
        )
        assert user.email, "testuser@user.com"
        assert user.user_name, "username"
        assert user.first_name, "firstname"
        assert not user.is_superuser
        assert user.is_active

        with pytest.raises(ValueError):
            db.objects.create_user(
                email="", user_name="a", first_name="first_name", password="password"
            )
