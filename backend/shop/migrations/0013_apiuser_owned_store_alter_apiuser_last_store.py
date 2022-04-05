# Generated by Django 4.0.2 on 2022-04-05 11:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0012_store_store_basket_item_limit_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='apiuser',
            name='owned_store',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, related_name='owned_store', to='shop.store'),
        ),
        migrations.AlterField(
            model_name='apiuser',
            name='last_store',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, related_name='last_store', to='shop.store'),
        ),
    ]
