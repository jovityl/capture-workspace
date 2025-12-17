from django.urls import path
from .views import health, capture_view

urlpatterns = [
    path("health/", health),
    path("capture/", capture_view),
]
