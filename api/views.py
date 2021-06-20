from os import stat
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
from .paypal import create_order,capture_order
import json
class GetProducts(APIView):
    def get(self,request,format=None):
        products = Product.objects
        return Response({'products':list(products.values())},status=status.HTTP_200_OK)

class GetMensProducts(APIView):
    def get(self,request,format=None):
        products = Product.objects.filter(itemCategory='mens',itemType=request.GET.get('type'),stock__gt=0).values()
        return Response({'products':list(products)},status=status.HTTP_200_OK)

class GetWomensProducts(APIView):
    def get(self,request,format=None):
        products = Product.objects.filter(itemCategory='womens',itemType=request.GET.get('type'),stock__gt=0).values()        
        return Response({'products':list(products)},status=status.HTTP_200_OK)


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
            user = User.objects.filter(id=token[0].user_id)[0]
            customer = Customer.objects.filter(user=user)
            if customer:
                order = Order.objects.filter(customer=customer[0]).values()
                if order:
                    return Response({"first_name":user.first_name,"last_name":user.last_name,"order":order},status=status.HTTP_200_OK)
            return Response({"first_name":user.first_name,"last_name":user.last_name},status=status.HTTP_200_OK)
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
        code = Coupons.objects.filter(code=request.GET.get('code',None)).values("discount")
        if len(code)>0:
            return Response(list(code)[0],status=status.HTTP_200_OK)
        else:
            return Response('Invalid Discount Code',status=status.HTTP_404_NOT_FOUND)

class CheckOut(APIView):
    def post(self,request,format=None):
        # print(request.data)
        # print(request.data.get("details"))
        d = {'email': 'fsa', 'address': 'fsa', 'zip': 'fsa', 'city': 'fsa', 'state': 'AL', 'details': {'id': '0X558966PY339233C', 'intent': 'CAPTURE', 'status': 'COMPLETED', 'purchase_units': [{'reference_id': 'default', 'amount': {'currency_code': 'USD', 'value': '140.40'}, 'payee': {'email_address': 'sb-ppk47n6524827@business.example.com', 'merchant_id': 'QNDAJB2P8QC4Q'}, 'shipping': {'name': {'full_name': 'John Doe'}, 'address': {'address_line_1': '1 Main St', 'admin_area_2': 'San Jose', 'admin_area_1': 'CA', 'postal_code': '95131', 'country_code': 'US'}}, 'payments': {'captures': [{'id': '7DG38681NL224013R', 'status': 'COMPLETED', 'amount': {'currency_code': 'USD', 'value': '140.40'}, 'final_capture': True, 'seller_protection': {'status': 'ELIGIBLE', 'dispute_categories': ['ITEM_NOT_RECEIVED', 'UNAUTHORIZED_TRANSACTION']}, 'create_time': '2021-06-19T21:19:50Z', 'update_time': '2021-06-19T21:19:50Z'}]}}], 'payer': {'name': {'given_name': 'John', 'surname': 'Doe'}, 'email_address': 'sb-yrqup6522719@business.example.com', 'payer_id': '498DVHNMZH89W', 'address': {'country_code': 'US'}}, 'create_time': '2021-06-19T21:19:37Z', 'update_time': '2021-06-19T21:19:50Z', 'links': [{'href': 'https://api.sandbox.paypal.com/v2/checkout/orders/0X558966PY339233C', 
        'rel': 'self', 'method': 'GET'}]}, 'cart': {'0': {'id': 47, 'name': 'Nike Wildhorse 7', 'image': 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/eaf8461f-ffc5-478b-b171-d7b70f70f068/air-zoom-pegasus-38-womens-running-shoe-2bvJvW.png', 'images': ['https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/eaf8461f-ffc5-478b-b171-d7b70f70f068/air-zoom-pegasus-38-womens-running-shoe-2bvJvW.png', 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/724c24ff-7e4b-479b-ba5e-2bc0f570257f/air-zoom-pegasus-38-womens-running-shoe-2bvJvW.png', 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/6d268ac7-c1f9-413b-9109-2f2c529e7980/air-zoom-pegasus-38-womens-running-shoe-2bvJvW.png', 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/9b099cc2-fdec-4f08-ad92-f83d8d348c91/air-zoom-pegasus-38-womens-running-shoe-2bvJvW.png', 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/a527c01d-0708-42d7-9a6c-3aa21a734b73/air-zoom-pegasus-38-womens-running-shoe-2bvJvW.png'], 'price': 130, 'stock': 1, 'itemCategory': 'womens', 'itemType': 'sneakers', 'size': '9.0', 'productID': 'mKXusFwE', 'colors': 'White / Red', 'quantity': 1}}}

        return Response({},status=status.HTTP_200_OK)

class CheckStock(APIView):
    def post(self,request,format=None):
        stock = checkStock(request)
        return Response(stock,status=status.HTTP_200_OK)




class CreateOrder(APIView):
    def post(self,request,format=None):
        total = 0
        stock = checkStock(request.data["cart"])
        if stock.get("status")==False:
            return Response(stock,status=status.HTTP_200_OK)
        if "coupon" in request.data:
            total = calculateTotal(request.data["cart"],request.data["coupon"])
        else:
            total = calculateTotal(request.data["cart"],False)
        order = create_order(total)
        if self.request.session["auth"]:
            print(self.request.session["auth"])
            token = Token.objects.filter(key = self.request.session["auth"]).values()[0]
            if token:
                user = User.objects.filter(id=token.get("user_id"))[0]
                TempOrder.objects.create(user=user,order_id=order.id,info=json.dumps(request.data),total=total)
            else:
                return Response({},status=status.HTTP_404_NOT_FOUND)
        else:
            TempOrder.objects.create(order_id=order.id,info=json.dumps(request.data),total=total)
        return Response({"id":order.id},status=status.HTTP_200_OK)

class CaptureOrder(APIView):
    def post(self,request,order,format=None):
        response = capture_order(order)
        if response.result.status=="COMPLETED":
            order_info = TempOrder.objects.filter(order_id=order).values()[0]
            if order_info:
                user = None
                user_info = None
                customer = None
                order_model=None
                info = json.loads(order_info.get("info"))
                if order_info.get("user_id"):
                    user = User.objects.filter(id=order_info.get("user_id"))[0]
                    user_info = User.objects.filter(id=order_info.get("user_id")).values("id","first_name","last_name","email")[0]
                    customer = Customer.objects.filter(user=user)
                    if len(customer)==0:
                        customer = Customer.objects.create(user=user,name=str(user_info.get("first_name"))+" "+str(user_info.get("last_name")),email=user_info.get("email"))
                    else:
                        customer = customer[0]
                else:
                    customer = Customer.objects.create(name=info.get("first_name")+" "+info.get("last_name"),email=info.get("email"))
                order_model = Order.objects.filter(transaction_id=order_info.get("order_id"))
                if len(order_model)==0:
                    order_model = Order.objects.create(customer=customer,transaction_id=order_info.get("order_id"))
                else:
                    order_model = order_model[0]
                for i in info.get("cart"):
                    product = Product.objects.filter(id=info.get("cart")[i].get("id"))[0]
                    OrderItem.objects.create(product=product,order=order_model,quantity=info.get("cart")[i].get("quantity"))
                ShippingInfo.objects.create(customer=customer,order=order_model,address=info.get("address"),state=info.get("state"),city=info.get("city"),zipcode=info.get("zip"),email=info.get("email"))
                return Response({"status":"COMPLETE","order_id":order},status=status.HTTP_200_OK)
            else:
                return Response({"status":"FAIL","error":"Order not found"},status=status.HTTP_403_FORBIDDEN)

class GetOrderInfo(APIView):
    def get(self,request,order):
        order_info = Order.objects.filter(transaction_id=order)[0]
        if order_info:
            customer = Customer.objects.filter(id=order_info.customer_id)[0]
            shipping_info = ShippingInfo.objects.filter(customer=customer).values()[0]
            products = OrderItem.objects.filter(order=order_info).values("product_id","quantity")
            for i in products:
                product = Product.objects.filter(id=i.get("product_id")).values("image","name","price","size","productID")[0]
                i["product_id"] = product
            return Response({"shipping_info":shipping_info,"order_info":products,"total":order_info.total},status=status.HTTP_200_OK)
        else:
            return Response({},status=status.HTTP_404_NOT_FOUND)
def checkAuth(token):
    token = Token.objects.filter(key=token)
    if token:
        return True
    return False

def checkStock(data):
    allInStock = True
    for i in data:
        product = Product.objects.filter(id=data[i].get("id")).values()
        if data[i].get("quantity")==0 or data[i].get("quantity") >product[0].get("stock"):
            data[i]["quantity"] = 0
            allInStock = False
    if allInStock==False:
        return {"status":allInStock,"cart":data}
    else:
        return {"status":allInStock}
def calculateTotal(cart,coupon):
    discount = False
    total = 0
    if coupon:
        code = Coupons.objects.filter(code=coupon).values("discount")
        if len(code)>0:
            discount = code[0].get("discount")
   
    for i in cart:
        total += cart[i].get("price")*cart[i].get("quantity")
    if discount:
        total = total - total*(discount/100)
    total = total + (total*.08)
    return total