# Generated by Django 4.0.2 on 2022-04-03 16:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_product_is_restricted_alter_apiuser_store_login'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='store_id',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, to='shop.store'),
        ),
    ]
