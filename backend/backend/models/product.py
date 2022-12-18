from django.db import models
from .category import Category
from shop.celery import update_quo


class USD:
    current = 0


usd = USD()


class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=60)
    price = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    description = models.CharField(
        max_length=250, default='', blank=True, null=True)
    image = models.ImageField(upload_to='uploads/products/')
    objects = models.Manager()

    @property
    def rub(self):
        us = update_quo()
        if type(us) is not int or not isinstance(us, int):
            print("API IS END")
            return usd.current * self.price
        else:
            usd.current = us
            return us * self.price

    @property
    def qoutation(self):
        return usd.current

    @staticmethod
    def get_products_by_id(ids):
        return Product.objects.filter(id__in=ids)

    @staticmethod
    def get_all_products():
        return Product.objects.all()

    @staticmethod
    def get_all_products_by_category_id(category_id):
        if category_id:
            return Product.objects.filter(category=category_id)
        else:
            return Product.get_all_products()
