from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=False,
                                   use_url=True, required=False)

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'category', 'description', 'image', 'rub', 'qoutation')
        filter_fields = 'category'

