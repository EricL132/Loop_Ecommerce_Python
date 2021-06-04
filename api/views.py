from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.core import serializers
from .models import *
from .utils import *

class GetProducts(APIView):
    def get(self,request,format=None):
        products = Product.objects
        return Response({"products":list(products.values())},status=status.HTTP_200_OK)

class GetMensProducts(APIView):
    def get(self,request,format=None):
        products = Product.objects.filter(itemCategory="mens",itemType=request.GET.get('type'))
        productsList = list(products.values())
        
        newList = []
        for k in productsList:
            for m in newList:
                if k.get("productID") != m.get("productID") or k.get("productID")==None:
                    newList.append(k)
                    break
                else:
                    m["size"] = m.get("size")+","+k.get("size")
                    break
            if len(newList)==0:
                newList.append(k)
        print(newList)
        return Response({"products":newList},status=status.HTTP_200_OK)

class GetProduct(APIView):
    def get(self,request,format=None):
        product = Product.objects.filter(productID=request.GET.get("productid"))
        return Response(list(product.values()))

class PopulateOldWithProductID(APIView):
    productExistCheck = Product.objects.filter()
    for k in productExistCheck:
        if k.productID == None:
            k.productID = randomProductID()
            k.save()
    
