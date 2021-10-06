from rest_framework import serializers
from .models import *


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'productImage']

class BasketSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Basket
        fields = ['id', 'user_id', 'is_active', 'date_created']

class BasketItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BasketItem
        fields = ['id', 'basket_id', 'product_id', 'quantity', 'dateCreated', 'calculatedTotal']

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'date_ordered', 'basket_id', 'user_id', 'total_price', 'status', 'payment_status', 'customer_order_notes', 'internal_order_notes']

class IrishBillingAddressSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = IrishBillingAddress
        fields = ['user_id', 'order_id', 'contact_name', 'company_name', 'address_line1', 'address_line2', 'address_line3', 'eir_code', 'county']

class IrishShippingAddressSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = IrishBillingAddress
        fields = ['user_id', 'order_id', 'contact_name', 'company_name', 'address_line1', 'address_line2', 'address_line3', 'eir_code', 'county']

class APIUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = APIUser
        fields = ['id', 'username', 'email', 'date_joined', 'last_login']