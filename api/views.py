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
        return Response({"products":list(products.values())},status=status.HTTP_200_OK)

class GetWomensProducts(APIView):
    def get(self,request,format=None):
        products = Product.objects.filter(itemCategory="womens",itemType=request.GET.get('type'))
        return Response({"products":list(products.values())},status=status.HTTP_200_OK)


class GetProduct(APIView):
    def get(self,request,format=None):
        product = Product.objects.filter(productID=request.GET.get("productid"))
        val = list(product.values())
        for i in val:
            if i.get("images")!=None:
                newlist = ",".join(i.get("images")).split("https")
                newlist.remove("")
                for j in range(len(newlist)):
                    if newlist[j][len(newlist[j])-1] == ",":
                        newlist[j] = newlist[j][0 : len(newlist[j])-1]
                    newlist[j] = "https"+newlist[j]
                i["images"] = newlist
        return Response(val)

class PopulateOldWithProductID(APIView):
    productExistCheck = Product.objects.filter()
    for k in productExistCheck:
        if k.productID == None:
            k.productID = randomProductID()
            k.save()
    

class GetFeatured(APIView):
    def get(self,request,format=None):
        feature = Featured.objects.all()
        feature = list(feature.values())
        for k in feature:
            k["pid"] = Product.objects.filter(id=k.get("product_id")).values("productID")[0].get("productID")
        return Response(list(feature),status=status.HTTP_200_OK)


class Register(APIView):
    def post(self,request,format=None):
        print(request.data["email"])
        print("xcvcx")
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        if len(User.objects.filter(username=request.data["email"]))>0:
            return Response("Email already registered",status=status.HTTP_403_FORBIDDEN)
        user = User.objects.create_user(username=request.data["email"],email=request.data["email"],password=request.data["password"],first_name=request.data["fname"],last_name=request.data["lname"])
        token = Token.objects.create(user=user)
        token.id = user.id
        token.save()
        self.request.session["auth"] = token.key
        return Response("Registered",status=status.HTTP_200_OK)
class Login(APIView):
    def post(self,request,format=None):
        print("dsadsa")