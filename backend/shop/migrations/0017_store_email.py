# Generated by Django 4.0.3 on 2022-04-06 20:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0016_alter_store_storelogo_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]
