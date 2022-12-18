from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100, default='Пользователь')
    email = models.EmailField()
    password = models.CharField(max_length=100)
    objects = models.Manager()

    def register(self):
        self.save()

    @staticmethod
    def get_user_by_email(email):
        try:
            return User.objects.get(email=email)
        except:
            return False

    def isExists(self):
        if User.objects.filter(login=self.email):
            return True

        return False
