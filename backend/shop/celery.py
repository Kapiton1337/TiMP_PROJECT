import os
import requests
from celery import shared_task
from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shop.settings")

app = Celery("shop")

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object("django.conf:settings", namespace="CELERY")

# Load task modules from all registered Django apps.
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f"Request: {self.request!r}")


@shared_task(name="get_quotation")
def update_quo():
    url = "https://open.er-api.com/v6/latest/USD"
    response = requests.get(url)

    default_rub_rate = 67
    try:
        response.raise_for_status()
    except requests.exceptions.HTTPError:
        return default_rub_rate

    try:
        return response.json()["rates"]["RUB"]
    except KeyError:
        return default_rub_rate
