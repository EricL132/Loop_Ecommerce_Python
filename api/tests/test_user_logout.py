from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

#Test logout endpoint
class UserLogout(APITestCase):
    def setUp(self):
        self.data = {'email':'applesgo123@ericliao.me','password':'random-password-123','fname':'Eric','lname':'Liao'}
    def test_user_logout(self):
        # create user and test authentication
        self.client.post('/api/register',self.data)
        response = self.client.post('/api/login',self.data)
        user = authenticate(username=self.data['email'],password=self.data['password'])
        token = Token.objects.filter(user=user)[0]

        #logout
        responseLogout = self.client.post('/api/logout')
        tokenLogout = Token.objects.filter(user=user)
        self.assertEqual(self.client.session['auth'],token.key)
        self.assertEqual(response.status_code,status.HTTP_200_OK)

        #Token removed from database
        self.assertEqual(len(tokenLogout),0)
        self.assertEqual(responseLogout.status_code,status.HTTP_200_OK)