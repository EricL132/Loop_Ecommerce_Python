from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import *
from .utils import *


class GetProducts(APIView):
    def get(self,request,format=None):
        products = Product.objects
        return Response({"products":list(products.values())},status=status.HTTP_200_OK)

class GetMensSneakers(APIView):
    def get(self,request,format=None):
        products = Product.objects.filter(itemCategory="mens",itemType="sneakers")
        return Response({"products":list(products.values())},status=status.HTTP_200_OK)