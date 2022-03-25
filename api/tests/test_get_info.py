from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth import authenticate
from api.models import *

# Test getting previous info for account page
class GetInfo(APITestCase):
    def setUp(self):
        self.data = {'email':'applesgo123@ericliao.me','password':'random-password-123','fname':'Eric','lname':'Liao'}

        self.order_info = [
            {
                "id": 3,
                "date_ordered": "2021-06-20T08:25:31.724573Z",
                "transaction_id": "0WX6945634650051V",
                "total": 285.12,
                "status": "Complete"
            },
            {
                "id": 5,
                "date_ordered": "2021-06-23T17:17:59.020305Z",
                "transaction_id": "7F361375TJ1361748",
                "total": 70.2,
                "status": ""
            },
            {
                "id": 6,
                "date_ordered": "2021-06-27T22:54:32.192415Z",
                "transaction_id": "25E87528H18522449",
                "total": 907.2,
                "status": "Complete"
            }
        ]

    def test_user_info(self):
        self.client.post('/api/register',self.data)
        response = self.client.post('/api/login',self.data)
        user = authenticate(username=self.data['email'],password=self.data['password'])
        token = Token.objects.filter(user=user)[0]
        self.assertEqual(self.client.session['auth'],token.key)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        customer = Customer.objects.create(user=user,name="Eric Liao",email="applesgo123@ericliao.me")
        for order in self.order_info:
            Order.objects.create(customer=customer,date_ordered=order["date_ordered"],transaction_id=order["transaction_id"],total=order["total"],status=order["status"])
        response = self.client.get('/api/info')
        info = response.json()
        self.assertGreater(len(info["first_name"]),0)
        self.assertGreater(len(info["last_name"]),0)
        self.assertGreater(len(info["order"]),0)