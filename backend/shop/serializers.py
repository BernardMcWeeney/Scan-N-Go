from django.utils import timezone
import pytz
from rest_framework import serializers
from .models import *



class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'productImage','product_quantity',"product_tag"]

class BasketItemsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BasketItems
        fields = ['id', 'basket_id','product_name', 'product_id', 'quantity', 'user_id', 'product_image', 'product_price', 'product_tag','product_id_num','basket_id_num', 'user_id_num','is_active']

class BasketSerializer(serializers.HyperlinkedModelSerializer):
    items = BasketItemsSerializer(many=True, read_only=True, source='basketitems_set')

    class Meta:
        model = Basket
        fields = ['id', 'user_id', 'is_active', 'dateCreated','store_id','user_id_num',  'items']

class APIUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = APIUser
        fields = ['id', 'username', 'email', 'date_joined', 'last_login', 'is_superuser', 'last_store', 'store_login','user_image', "first_name", "last_name"]

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    basket = BasketSerializer(many=True, read_only=True, source='basket_set')
    items = BasketItemsSerializer(many=True, read_only=True, source='basketitems_set')

    class Meta:
        model = Order
        fields = ['id', 'date_ordered', 'basket_id', 'user_id', 'total_price', 'status', 'payment_status',
                  'customer_order_notes', 'internal_order_notes','store_id' ,'basket', 'items', 'user_id_num', 'basket_id_num', 'store_id_num']

class StoreSerializer(serializers.HyperlinkedModelSerializer):
    users = APIUserSerializer(many=True, read_only=True, source='apiuser_set')
    orders = OrderSerializer(many=True, read_only=True, source='order_set')
    baskets = BasketSerializer(many=True, read_only=True, source='basket_set')

    class Meta:
        model = Store
        fields = ['id', 'name', 'users', 'orders', 'baskets']


class IrishBillingAddressSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = IrishBillingAddress
        fields = ['user_id', 'order_id', 'contact_name', 'company_name', 'address_line1', 'address_line2',
                  'address_line3', 'eir_code', 'county']


class IrishShippingAddressSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = IrishBillingAddress
        fields = ['user_id', 'order_id', 'contact_name', 'company_name', 'address_line1', 'address_line2',
                  'address_line3', 'eir_code', 'county']


class UserRegistrationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = APIUser
        fields = ['username', 'email', 'password', 'id']
        extra_kwargs = {'password': {'write_only': True}}

    '''
    Create a user, if an ID is specified, force that ID for the user (as long as its available)
    '''
    def create(self, validated_data):
        email = validated_data['email']
        request = self.context.get('request', None).data
        username = validated_data['username']
        password = validated_data['password']
        if "id" in request:
            forced_user_id = request['id']
            if list(APIUser.objects.filter(id=int(forced_user_id))) == []:
                new_user = APIUser.objects.create_user(id=forced_user_id,username=username,email=email, password=password)  # Create a new APIUser
            else:
                new_user = APIUser.objects.create_user(username=username, email=email, password=password)
        else:
            new_user = APIUser.objects.create_user(username=username,email=email, password=password)
        new_user.save()  # Save the new user
        new_basket = Basket.objects.create(user_id=new_user)  # Create a shopping basket
        new_basket.save()  # save the shopping basket
        return new_user


class AddBasketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItems
        fields = ['product_id']
    '''
    Add a basket item, if there is a quantity specified, use that quantity instead of 1
    '''
    def create(self, validated_data):
        product_id = validated_data['product_id']
        request = self.context.get('request', None)
        quantity = 1
        if "quantity" in request.data:
          quantity = int(request.data['quantity'])
        if request:
            current_user = request.user
            print(Basket.objects.all())
            shopping_basket = Basket.objects.filter(user_id=current_user, is_active=True).first()
            print(shopping_basket)
            # Check if the item is already in the basket
            basket_items = BasketItems.objects.filter(product_id=product_id, basket_id_id=shopping_basket).first()
            print(basket_items)
            if basket_items:
                basket_items.quantity = basket_items.quantity + quantity  # if it is already in the basket, add to the quantity
                basket_items.save()
                return basket_items
            else:
                new_basket_item = BasketItems.objects.create(basket_id=shopping_basket, product_id=product_id, user_id=current_user, quantity=quantity)
                new_basket_item.save()
                return new_basket_item
        else:
            return None

class SetUserStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIUser
        fields = ['last_store']

    def create(self, validated_data):
        request = self.context.get('request', None)
        store_id = request.data['last_store']
        store = Store.objects.filter(id=store_id).first()
        current_user = request.user
        user = APIUser.objects.filter(id=current_user.id).first()

        old_basket = Basket.objects.filter(user_id=current_user, is_active=True).first()
        old_basket.is_active = False
        old_basket.save()

        new_basket = Basket.objects.create(user_id=current_user, is_active=True, store_id=store)  # Create a shopping basket
        new_basket.save()  # save the shopping basket

        if user:
            user.last_store = store
            user.store_login = timezone.now()
            user.save()
            return user


class RemoveBasketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItems
        fields = ['product_id']

    '''
    Completely removes basket item
    '''
    def create(self, validated_data):
        product_id = validated_data['product_id']
        request = self.context.get('request', None)
        quantity = 1
        if "quantity" in request.data:
          quantity = int(request.data['quantity'])
        if request:
            current_user = request.user
            shopping_basket = Basket.objects.filter(user_id=current_user, is_active=True).first()
            basket_items = BasketItems.objects.filter(basket_id=shopping_basket, product_id=product_id).first()

            if basket_items:
                if basket_items.quantity > quantity:
                    basket_items.quantity = basket_items.quantity - quantity  # if it is already in the basket, add to the quantity
                    basket_items.save()
                    return basket_items
                else:
                    basket_items.delete()
                    return basket_items
            else:
                return BasketItems.objects.create(basket_id=shopping_basket, product_id=product_id, quantity=0,
                                                 user_id=current_user)
        else:
            return None


class CheckoutSerializer(serializers.ModelSerializer):
  class Meta:
    model = Order
    fields = ['basket_id']

  def create(self, validated_data):
    request = self.context.get('request', None)
    current_user = request.user
    basket_id = validated_data['basket_id']
    # get the sopping basket
    # basket_id = Basket.objects.filter(basket_id=basket_id)
    # mark as inactive
    basket_id.is_active = False
    print("Basket ID", basket_id)
    basket_id.save()
    # create a new order
    order = Order.objects.create(basket_id=basket_id, user_id=current_user)
    order.save()
    # create a new empty basket for the customer
    new_basket = Basket.objects.create(user_id=current_user, store_id=Store.objects.filter(id=5).first())  # Create a shopping basket
    new_basket.save()
    user = APIUser.objects.filter(id=current_user.id).first()
    user.last_store = Store.objects.filter(id=5).first()
    user.save()
    # return the order
    return order
