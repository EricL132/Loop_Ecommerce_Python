from rest_framework.test import APITestCase
from rest_framework import status
from api.models import Coupons

# Test coupon endpoint
class CheckCoupon(APITestCase):
    def setUp(self):
        Coupons.objects.create(code="JGFNB3",discount="20")
    def test_check_coupon(self):
        response = self.client.get('/api/coupon/?code=JGFNB3')
        info = response.json()
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(info["discount"],20)
    def test_invalid_coupon(self):
        response = self.client.get('/api/coupon/?code=JGFN')
        info = response.json()
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
        self.assertTrue(info["error"])