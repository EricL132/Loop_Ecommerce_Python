from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

# Test user create account endpoint
class UserCreated(APITestCase):
    #Test if user is created with all correct info
    def test_create_user(self):
        data= {'email':'applesgo123@ericliao.me','password':'random-password-123','fname':'Eric','lname':'Liao'}
        #sends request to register endpoint to create account
        response = self.client.post('/api/register',data)
        #authenticate user to see if its created
        user = authenticate(username=data['email'],password=data['password'])
        #test if token was created for user
        token = Token.objects.filter(user=user)
        #should return status code 200
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        #should exist 1 token
        self.assertEqual(len(token),1)

    #Test if user already exists
    def test_user_already_exists(self):
        data= {'email':'applesgo123@ericliao.me','password':'random-password-123','fname':'Eric','lname':'Liao'}
        #sends request to register endpoint to create account
        self.client.post('/api/register',data)
        response = self.client.post('/api/register',data)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    #Test if invalid email returns forbidden
    def test_create_invalid_email(self):
        data= {'email':'applesgo123ericliao.me','password':'random-password-123','fname':'Eric','lname':'Liao'}
        response = self.client.post('/api/register',data)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    #Test if invalid password returns forbidden
    def test_create_invalid_password(self):
        data= {'email':'applesgo123@ericliao.me','password':'ran','fname':'Eric','lname':'Liao'}
        response = self.client.post('/api/register',data)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    #Test if empty fields returns forbidden
    def test_create_empty_fields(self):
        data= {'email':'applesgo123@ericliao.me','password':'random-password-123','fname':'','lname':''}
        response = self.client.post('/api/register',data)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)