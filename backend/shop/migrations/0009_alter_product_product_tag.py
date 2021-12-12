# Generated by Django 3.2.9 on 2021-12-11 23:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_product_product_tag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_tag',
            field=models.CharField(choices=[('Confectionary', 'Confectionary'), ('Drinks', 'Drinks'), ('Homeware', 'Homeware'), ('Cleaning', 'Cleaning'), ('Hot Items', 'Hot Items'), ('Frozen Items', 'Frozen Items')], default='Confectionary', max_length=20),
        ),
    ]
