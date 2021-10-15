# Generated by Django 3.2.7 on 2021-10-15 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('Prepared', 'Prepared'), ('Order', 'Order'), ('Processing', 'Processing'), ('Shipped', 'Shipped'), ('Complete', 'Complete'), ('Refunded', 'Refunded'), ('Issue', 'Issue')], default='Prepared', max_length=32),
        ),
    ]
