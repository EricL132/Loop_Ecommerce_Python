import requests
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
from django.db.models import Q


class GetProducts(APIView):
    def get(self,request,format=None):
        products = Product.objects
        return Response({'products':list(products.values())},status=status.HTTP_200_OK)

class GetMensProducts(APIView):
    def get(self,request,format=None):
        products = Product.objects.filter(itemCategory='mens',itemType=request.GET.get('type'))
        return Response({'products':list(products.values())},status=status.HTTP_200_OK)

class GetWomensProducts(APIView):
    def get(self,request,format=None):
        products = Product.objects.filter(itemCategory='womens',itemType=request.GET.get('type'))
        return Response({'products':list(products.values())},status=status.HTTP_200_OK)


class GetProduct(APIView):
    def get(self,request,format=None):
        product = Product.objects.filter(productID=request.GET.get('productid'))
        val = list(product.values())
        for i in val:
            if i.get('images')!=None:
                newlist = ','.join(i.get('images')).split('https')
                newlist.remove('')
                for j in range(len(newlist)):
                    if newlist[j][len(newlist[j])-1] == ',':
                        newlist[j] = newlist[j][0 : len(newlist[j])-1]
                    newlist[j] = 'https'+newlist[j]
                i['images'] = newlist
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
            k['pid'] = Product.objects.filter(id=k.get('product_id')).values('productID')[0].get('productID')
        return Response(list(feature),status=status.HTTP_200_OK)


class Register(APIView):
    def post(self,request,format=None):
        for i in request.data:
            if not request.data[i]:
                return Response('Please fill out all info',status=status.HTTP_403_FORBIDDEN)
        if not '@' in request.data['email'] or not '.' in request.data['email']:
            return Response('Invalid Email',status=status.HTTP_403_FORBIDDEN)
        if len(request.data['password'])<6:
            return Response('Password must be at least 6 characters',status=status.HTTP_403_FORBIDDEN)
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        if len(User.objects.filter(username=request.data['email']))>0:
            return Response('Email already registered',status=status.HTTP_403_FORBIDDEN)
        email = request.data['email'].lower()
        user = User.objects.create_user(username=email,email=email,password=request.data['password'],first_name=request.data['fname'],last_name=request.data['lname'])
        token = Token.objects.create(user=user)
        token.id = user.id
        token.save()
        self.request.session['auth'] = token.key
        return Response('Registered',status=status.HTTP_200_OK)
class Login(APIView):
    def post(self,request,format=None):
        email = request.data["email"].lower()
        user = authenticate(username=email,password=request.data["password"])
        if user:
            if not self.request.session.exists(self.request.session.session_key):
                self.request.session.create()
            token = Token.objects.create(user=user)
            token.id = user.id
            token.save()
            self.request.session["auth"]=token.key
            return Response({},status=status.HTTP_200_OK)
        return Response('Invalid Email/Password',status=status.HTTP_403_FORBIDDEN)



class GetAccountInfo(APIView):
    def get(self,request,format=None):
        if checkAuth(self.request.session["auth"]):
            return Response({},status=status.HTTP_200_OK)
        return Response({},status=status.HTTP_403_FORBIDDEN)
        
class LogOut(APIView):
    def post(self,request,format=None):
        token = Token.objects.filter(key=self.request.session["auth"])
        if token:
            token.delete()
            return Response({},status=status.HTTP_200_OK)
        else:
            return Response('Not Logged In',status=status.HTTP_404_NOT_FOUND)
            
class GetInfo(APIView):
    def get(self,request,format=None):
        token = Token.objects.filter(key=self.request.session["auth"])
        if token:
            user = User.objects.filter(id=token[0].user_id).values("first_name","last_name")
            return Response(list(user),status=status.HTTP_200_OK)
        else:
            return Response({},status=status.HTTP_401_UNAUTHORIZED)


class SearchItem(APIView):
    def get(self,request,format=None):
        searchParam = request.GET.get('search',None)
        products = Product.objects.filter(Q(name__icontains=searchParam)).values()
        if products:
            return Response({'products':list(products)},status=status.HTTP_200_OK)
        return Response({'products':[]},status=status.HTTP_200_OK)


class CheckCoupon(APIView):
    def get(self,request,format=None):
        return Response({},status=status.HTTP_200_OK)
def checkAuth(token):
    token = Token.objects.filter(key=token)
    if token:
        return True
    return False