# Generated by Django 3.2.9 on 2021-12-11 23:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0007_product_product_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='product_tag',
            field=models.CharField(choices=[('CONFECTIONARY', 'Confectionary'), ('DRINKS', 'Drinks'), ('HOMEWARE', 'Homeware'), ('CLEANING', 'Cleaning'), ('HOTFOOD', 'Hot Items'), ('FROZEN', 'Frozen Items')], default='CONFECTIONARY', max_length=20),
        ),
    ]