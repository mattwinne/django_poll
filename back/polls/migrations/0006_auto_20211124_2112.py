# Generated by Django 3.2.9 on 2021-11-24 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0005_rename_choice_text_choice_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='choice',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='question',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
