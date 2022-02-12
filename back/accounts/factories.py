import factory

from . import models


class UserFactory(factory.Factory):
    class Meta:
        model = models.User

    email = "skaterboi@aol.com"
    user_name = "skaterboi"
    first_name = "Chad"
    is_staff = False
    is_superuser = False
    is_active = True


class AdminFactory(UserFactory):
    email = "testuser@super.com"
    user_name = "username"
    first_name = "firstname"
    is_staff = True
    is_superuser = True
    is_active = True
