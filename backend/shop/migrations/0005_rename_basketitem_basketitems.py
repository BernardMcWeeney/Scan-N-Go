# Generated by Django 3.2.9 on 2021-12-07 13:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0004_product_product_quantity'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='BasketItem',
            new_name='BasketItems',
        ),
    ]