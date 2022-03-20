from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

class UserLogin(APITestCase):
    def setUp(self):
        self.data = {'email':'applesgo123@ericliao.me','password':'random-password-123','fname':'Eric','lname':'Liao'}
        self.wrong_email= {'email':'apple123@ericliao.me','password':'random-password-123'}
        self.wrong_password= {'email':'applesgo123@ericliao.me','password':'ran13323'}

    #Test if login is working
    def test_user_login(self):
        #create user
        self.client.post('/api/register',self.data)
        response = self.client.post('/api/login',self.data)
        user = authenticate(username=self.data['email'],password=self.data['password'])
        token = Token.objects.filter(user=user)[0]
        self.assertEqul(self.client.session['auth'],token.key)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
    
    #Test user login with wrong email
    def test_user_login_wrong_email(self):
        #create user
        self.client.post('/api/register',self.data)
        #send login request with wrong email
        response = self.client.post('/api/login',self.wrong_email)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    #Test user login with wrong password
    def test_user_login_wrong_password(self):
        #create user
        self.client.post('/api/register',self.data)
        #send login request with wrong password
        response = self.client.post('/api/login',self.wrong_password)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)
