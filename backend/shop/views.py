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
      queryset = Product.objects.all()
      prod_id = self.request.query_params.get('product_id')
      prod_name = self.request.query_params.get('product_name')
      tags = self.request.query_params.get('tags')
      min_price = self.request.query_params.get('min_price')
      max_price = self.request.query_params.get('max_price')

      if prod_id is not None:
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

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # get the current user
        if user.is_superuser:
            return Order.objects.all()  # return all the baskets if a superuser requests
        else:
            # For normal users, only return the current active basket
            orders = Order.objects.filter(user_id=user)
            return orders

class IrishBillingAddressViewSet(viewsets.ModelViewSet):
    queryset = IrishBillingAddress.objects.all()
    serializer_class = IrishBillingAddressSerializer

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
            return APIUser.objects.all()  # return all the baskets if a superuser requests
        else:
            # For normal users, only return the current active basket
            APIUser1 = APIUser.objects.filter(username=user)
            return APIUser1


class UserRegistrationAPIView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny] #No login is needed to access this route
    queryset = APIUser.objects.all()


class AddBasketItemAPIView(generics.CreateAPIView):
    serializer_class = AddBasketItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = BasketItems.objects.all()


class RemoveBasketItemAPIView(generics.CreateAPIView):
    serializer_class = RemoveBasketItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = BasketItems.objects.all()

class CheckoutAPIView(generics.CreateAPIView):
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()

'''
class SearchResultsView(generics.ListAPIView):
    model = Product
    template_name = 'frontend/views/allproducts.ejs'
    context_object_name = 'products'

    def get_queryset(self):
        query = self.request.GET.get('title_contains')
        products = Product.objects.filter(Q(name__icontains=query))
        return products
'''
