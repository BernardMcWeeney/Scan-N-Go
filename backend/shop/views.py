from rest_framework import viewsets
from rest_framework import generics
from django.db.models import Q
from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


    def get_queryset(self):
        '''
        return all products, but filter by parameters given
        '''
        queryset = Product.objects.all()
        prod_id = self.request.query_params.get('product_id')
        store_id = self.request.query_params.get('store_id')
        barcode_query = self.request.query_params.get('barcode')
        prod_name = self.request.query_params.get('product_name')
        tags = self.request.query_params.get('tags')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        print(store_id)
        if barcode_query is not None and store_id is not None:
          print('hi')
          queryset = queryset.filter(barcode=barcode_query,store_id=store_id)
          return queryset
        elif barcode_query is not None:
          queryset = queryset.filter(barcode=barcode_query)
          return queryset
        elif store_id is not None:
          queryset = queryset.filter(store_id=store_id)
          return queryset
        elif prod_id is not None:
          queryset = queryset.filter(id=prod_id)
          return queryset
        elif tags is not None or min_price is not None or max_price is not None or prod_name is not None:
          if min_price is None:
            min_price = 0
          else:
            min_price = float(min_price)

          if max_price is None:
            max_price = 1000
          else:
            max_price = float(max_price)
          queryset = queryset.filter(price__gte=min_price, price__lte=max_price)

          if tags is not None:
            tags = tags.split(',')
            queryset = queryset.filter(product_tag__in=tags)

          if prod_name is not None:
            queryset = queryset.filter(name__contains=prod_name)

        return queryset

class BasketViewSet(viewsets.ModelViewSet):
    serializer_class = BasketSerializer
    queryset = Basket.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # get the current user
        if user.is_superuser:
            return Basket.objects.all()  # return all the baskets if a superuser requests
        else:
            # For normal users, only return the current active basket
            shopping_basket = Basket.objects.filter(user_id=user, is_active=True)
            return shopping_basket

class BasketItemViewSet(viewsets.ModelViewSet):
    queryset = BasketItems.objects.all()
    serializer_class = BasketItemsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # get the current user
        if user.is_superuser:
            return BasketItems.objects.all()  # return all the basket items if a superuser requests
        else:
            print('user', user)
            # For normal users, only return their basket items
            basketitems = BasketItems.objects.filter(user_id=user)
            return basketitems

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # get the current user
        if user.is_superuser:
            return Order.objects.all()  # return all the orders if a superuser requests
        else:
            print('user', user)
            # For normal users, only return the current users orders
            orders = Order.objects.filter(user_id=user)
            orders = orders.order_by('-date_ordered')
            return orders

class IrishBillingAddressViewSet(viewsets.ModelViewSet):
    queryset = IrishBillingAddress.objects.all()
    serializer_class = IrishBillingAddressSerializer

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [IsAuthenticated, AllowAny]


'''
class OrderDetailsViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # get the current user
        if user.is_superuser:
            return Order.objects.all()
'''
class IrishShippingAddressViewSet(viewsets.ModelViewSet):
    queryset = IrishShippingAddress.objects.all()
    serializer_class = IrishShippingAddressSerializer

class APIUserViewSet(viewsets.ModelViewSet):
    queryset = APIUser.objects.all()
    serializer_class = APIUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # get the current user
        if user.is_superuser:
            return APIUser.objects.all()  # return all the users if a superuser requests
        else:
            # For normal users, only return the current users info
            APIUser1 = APIUser.objects.filter(username=user)
            return APIUser1


class UserRegistrationAPIView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny] #No login is needed to access this route
    queryset = APIUser.objects.all()

class AdminUpdateStoreProfileView(generics.CreateAPIView):
    serializer_class = AdminUpdateStoreProfile
    permission_classes = [AllowAny] #No login is needed to access this route
    queryset = Store.objects.all()

class AddBasketItemAPIView(generics.CreateAPIView):
    serializer_class = AddBasketItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = BasketItems.objects.all()

class SetUserStoreAPIView(generics.CreateAPIView):
    serializer_class = SetUserStoreSerializer
    permission_classes = [AllowAny]
    queryset = APIUser.objects.all()

class RemoveBasketItemAPIView(generics.CreateAPIView):
    serializer_class = RemoveBasketItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = BasketItems.objects.all()

class CheckoutAPIView(generics.CreateAPIView):
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()

