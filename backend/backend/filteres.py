from django_filters import rest_framework as filters
from .models import Product


class CharInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class ProductFilter(filters.Filter):
    category = CharInFilter(field_name='category', lookup_expr='in')
    number = filters.NumberFilter()

    class Meta:
        model = Product
        fields = ['category', 'number']
