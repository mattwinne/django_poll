from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea
from rest_framework_simplejwt.token_blacklist import models
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin

from .models import User


class NewOutstandingTokenAdmin(OutstandingTokenAdmin):
    def has_delete_permission(self, *args, **kwargs):
        return True


admin.site.unregister(models.OutstandingToken)
admin.site.register(models.OutstandingToken, NewOutstandingTokenAdmin)


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = (
        "email",
        "user_name",
        "first_name",
    )
    list_filter = ("email", "user_name", "first_name", "is_active", "is_staff")
    ordering = ("-start_date",)
    list_display = ("email", "user_name", "first_name", "is_active", "is_staff")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "user_name",
                    "first_name",
                )
            },
        ),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
        ("Personal", {"fields": ("about",)}),
    )
    formfield_overrides = {
        User.about: {"widget": Textarea(attrs={"rows": 10, "cols": 40})},
    }
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "user_name",
                    "first_name",
                    "password1",
                    "password2",
                    "is_active",
                    "is_staff",
                ),
            },
        ),
    )


admin.site.register(User, UserAdminConfig)
