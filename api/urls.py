from django.urls import path
from .views import *

urlpatterns = [
    path('products',GetProducts.as_view()),
    path('mens/sneakers',GetMensSneakers.as_view())
]