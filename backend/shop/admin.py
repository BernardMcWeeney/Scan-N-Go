from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
# Register your models here.

admin.site.register(APIUser)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(IrishShippingAddress)
admin.site.register(IrishBillingAddress)
admin.site.register(BasketItems)
admin.site.register(Basket)
