# Generated by Django 3.2.9 on 2021-12-08 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0006_remove_product_product_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='product_quantity',
            field=models.PositiveIntegerField(default=0),
        ),
    ]