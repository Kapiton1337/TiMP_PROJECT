import os
import requests
from celery import shared_task
from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shop.settings')

app = Celery('shop')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')


@shared_task(name='get_quotation')
def update_quo():
    data = requests.get('https://openexchangerates.org/api/latest.json?app_id='
                        '0b616504eb51439fbf7d0a5654c4e931&base=USD&symbols=RUB').json()
    qou = int(data['rates']['RUB'])

    return qou
