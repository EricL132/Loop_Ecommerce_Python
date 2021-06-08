from django.urls import path
from .views import *

urlpatterns = [
    path('products',GetProducts.as_view()),
    path('men',GetMensProducts.as_view()),
    path('women',GetWomensProducts.as_view()),
    path('product',GetProduct.as_view()),
    path('feature',GetFeatured.as_view()),
    path('register',Register.as_view()),
    path('login',Login.as_view())
    
]