from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class Store(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False)

class APIUser(AbstractUser):
    last_store = models.ForeignKey(Store, on_delete=models.CASCADE,default=5)
    store_login = models.DateTimeField(auto_now_add=True, blank=True)
    user_image = models.FileField(upload_to='images/user_images/', default='images/user_images/defaultUser.jpg')


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    description = models.CharField(max_length=5000, null=True)
    productImage = models.FileField(upload_to='images/')
    product_quantity = models.PositiveIntegerField(default=0)
    store_id = models.ForeignKey(Store, default=2, on_delete=models.CASCADE)

    productTags = [
        ("Confectionary", 'Confectionary'),
        ("Drinks", 'Drinks'),
        ("Homeware", 'Homeware'),
        ("Cleaning", 'Cleaning'),
        ("Hot Items", 'Hot Items'),
        ("Frozen Items", 'Frozen Items'),
    ]
    product_tag = models.CharField(max_length=20,choices=productTags,default="Confectionary")

    barcode = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name


class Basket(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    dateCreated = models.DateTimeField(auto_now_add=True)
    models.ForeignKey(Store, on_delete=models.CASCADE)
    store_id = models.ForeignKey(Store, default=2, on_delete=models.CASCADE)

    def user_id_num(self):
        return self.user_id.id


class BasketItems(models.Model):
    id = models.AutoField(primary_key=True)
    basket_id = models.ForeignKey(Basket, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    dateCreated = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE, null=False)

    def product_image(self):
        return str(self.product_id.productImage)

    def product_id_num(self):
        return self.product_id.id

    def basket_id_num(self):
        return self.basket_id.id

    def product_price(self):
        return float(self.product_id.price)

    def product_tag(self):
        return self.product_id.product_tag

    def product_name(self):
        return self.product_id.name

    def is_active(self):
        return self.basket_id.is_active

    def price(self):
        return self.product_id.price * self.quantity

    def user_id_num(self):
        return self.user_id.id

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    basket_id = models.ForeignKey(Basket, on_delete=models.CASCADE)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    models.ForeignKey(Store, on_delete=models.CASCADE)
    store_id = models.ForeignKey(Store, default=2, on_delete=models.CASCADE)
    statuses = [
        ('Prepared', 'Prepared'),
        ('Order', 'Order'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Complete', 'Complete'),
        ('Refunded', 'Refunded'),
        ('Issue', 'Issue'),
    ]
    status = models.CharField(max_length=32,choices=statuses,default="Prepared")
    payment_statuses = [
        ('NotReceived', 'Not Received'),
        ('Received', 'Received'),
    ]
    payment_status = models.CharField(max_length=32,choices=payment_statuses,default="NotReceived")
    customer_order_notes = models.CharField(max_length=5000, null=True)
    internal_order_notes = models.CharField(max_length=5000, null=True)

    def basket_id_num(self):
        print(self.basket_id.id)
        return self.basket_id.id

    def store_id_num(self):
        return self.store_id.id

    def user_id_num(self):
        return self.user_id.id

class IrishBillingAddress(models.Model):
    class Meta:
        verbose_name_plural = "Irish Billing Addresses"
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE, null=True)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    contact_name = models.CharField("Contact name", max_length=102, null=False)
    company_name = models.CharField("Company name", max_length=102, null=True)
    address_line1 = models.CharField("Address line 1", max_length=1024, null=False)
    address_line2 = models.CharField("Address line 2", max_length=1024, blank=True, null=False)
    address_line3 = models.CharField("Address line 3", max_length=1024, blank=True, null=True)
    eir_code = models.CharField("Eir Code", max_length=8, null=False)
    county = [
        ('Carlow', 'Carlow'),
        ('Cavan', 'Cavan'),
        ('Clare', 'Clare'),
        ('Cork', 'Cork'),
        ('Donegal', 'Donegal'),
        ('Dublin', 'Dublin'),
        ('Galway', 'Galway'),
        ('Kerry', 'Kerry'),
        ('Kildare', 'Kildare'),
        ('Kilkenny', 'Kilkenny'),
        ('Laois', 'Laois'),
        ('Leitrim', 'Leitrim'),
        ('Limerick', 'Limerick'),
        ('Longford', 'Longford'),
        ('Louth', 'Louth'),
        ('Mayo', 'Mayo'),
        ('Meath', 'Meath'),
        ('Monaghan', 'Monaghan'),
        ('Offaly', 'Offaly'),
        ('Roscommon', 'Roscommon'),
        ('Sligo', 'Sligo'),
        ('Tipperary', 'Tipperary'),
        ('Waterford', 'Waterford'),
        ('Westmeath', 'Westmeath'),
        ('Wexford', 'Wexford'),
        ('Wicklow', 'Wicklow'),
    ]

    def __str__(self):
        return str(self.nom_asentamiento)

class IrishShippingAddress(models.Model):
    class Meta:
        verbose_name_plural = "Irish Shipping Addresses"
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE, null=True)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    contact_name = models.CharField("Contact name", max_length=102, null=False)
    company_name = models.CharField("Company name", max_length=102, null=True)
    address_line1 = models.CharField("Address line 1", max_length=1024, null=False)
    address_line2 = models.CharField("Address line 2", max_length=1024, blank=True, null=False)
    address_line3 = models.CharField("Address line 3", max_length=1024, blank=True, null=True)
    eir_code = models.CharField("Eir Code", max_length=8, null=False)
    county = [
        ('Carlow', 'Carlow'),
        ('Cavan', 'Cavan'),
        ('Clare', 'Clare'),
        ('Cork', 'Cork'),
        ('Donegal', 'Donegal'),
        ('Dublin', 'Dublin'),
        ('Galway', 'Galway'),
        ('Kerry', 'Kerry'),
        ('Kildare', 'Kildare'),
        ('Kilkenny', 'Kilkenny'),
        ('Laois', 'Laois'),
        ('Leitrim', 'Leitrim'),
        ('Limerick', 'Limerick'),
        ('Longford', 'Longford'),
        ('Louth', 'Louth'),
        ('Mayo', 'Mayo'),
        ('Meath', 'Meath'),
        ('Monaghan', 'Monaghan'),
        ('Offaly', 'Offaly'),
        ('Roscommon', 'Roscommon'),
        ('Sligo', 'Sligo'),
        ('Tipperary', 'Tipperary'),
        ('Waterford', 'Waterford'),
        ('Westmeath', 'Westmeath'),
        ('Wexford', 'Wexford'),
        ('Wicklow', 'Wicklow'),
    ]

    def __str__(self):
        return str(self.nom_asentamiento)
