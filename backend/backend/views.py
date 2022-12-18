from rest_framework.response import Response
from django_filters import rest_framework as filters
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from rest_framework import generics
from rest_framework.views import APIView


class ShopApiList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_fields = ['category']
    search_field = ['id', 'name', 'description']


class ItemApiList(APIView):
    def get_item(self, pk):
        return Product.objects.get(pk=pk)

    def get(self, request, pk):
        note = self.get_item(pk)
        serializer = ProductSerializer(note)
        return Response(serializer.data)


class CategoryItemApi(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
