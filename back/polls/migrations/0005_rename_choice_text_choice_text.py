# Generated by Django 3.2.9 on 2021-11-24 20:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0004_auto_20211124_2053'),
    ]

    operations = [
        migrations.RenameField(
            model_name='choice',
            old_name='choice_text',
            new_name='text',
        ),
    ]