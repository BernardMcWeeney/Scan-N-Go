# Generated by Django 3.2.9 on 2021-12-14 16:44

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='APIUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Basket',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('is_active', models.BooleanField(default=True)),
                ('dateCreated', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('description', models.CharField(max_length=5000, null=True)),
                ('productImage', models.FileField(upload_to='images/')),
                ('product_quantity', models.PositiveIntegerField(default=0)),
                ('product_tag', models.CharField(choices=[('Confectionary', 'Confectionary'), ('Drinks', 'Drinks'), ('Homeware', 'Homeware'), ('Cleaning', 'Cleaning'), ('Hot Items', 'Hot Items'), ('Frozen Items', 'Frozen Items')], default='Confectionary', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date_ordered', models.DateTimeField(auto_now_add=True)),
                ('total_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('status', models.CharField(choices=[('Prepared', 'Prepared'), ('Order', 'Order'), ('Processing', 'Processing'), ('Shipped', 'Shipped'), ('Complete', 'Complete'), ('Refunded', 'Refunded'), ('Issue', 'Issue')], default='Prepared', max_length=32)),
                ('payment_status', models.CharField(choices=[('NotReceived', 'Not Received'), ('Received', 'Received')], default='NotReceived', max_length=32)),
                ('customer_order_notes', models.CharField(max_length=5000, null=True)),
                ('internal_order_notes', models.CharField(max_length=5000, null=True)),
                ('basket_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.basket')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='IrishShippingAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contact_name', models.CharField(max_length=102, verbose_name='Contact name')),
                ('company_name', models.CharField(max_length=102, null=True, verbose_name='Company name')),
                ('address_line1', models.CharField(max_length=1024, verbose_name='Address line 1')),
                ('address_line2', models.CharField(blank=True, max_length=1024, verbose_name='Address line 2')),
                ('address_line3', models.CharField(blank=True, max_length=1024, null=True, verbose_name='Address line 3')),
                ('eir_code', models.CharField(max_length=8, verbose_name='Eir Code')),
                ('order_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='shop.order')),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Irish Shipping Addresses',
            },
        ),
        migrations.CreateModel(
            name='IrishBillingAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contact_name', models.CharField(max_length=102, verbose_name='Contact name')),
                ('company_name', models.CharField(max_length=102, null=True, verbose_name='Company name')),
                ('address_line1', models.CharField(max_length=1024, verbose_name='Address line 1')),
                ('address_line2', models.CharField(blank=True, max_length=1024, verbose_name='Address line 2')),
                ('address_line3', models.CharField(blank=True, max_length=1024, null=True, verbose_name='Address line 3')),
                ('eir_code', models.CharField(max_length=8, verbose_name='Eir Code')),
                ('order_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='shop.order')),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Irish Billing Addresses',
            },
        ),
        migrations.CreateModel(
            name='BasketItems',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField(default=1)),
                ('dateCreated', models.DateTimeField(auto_now_add=True)),
                ('basket_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.basket')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.product')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
