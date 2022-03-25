
from rest_framework.test import APITestCase
from api.models import Product
from .product_info import product_list
# Test getting product info from different pages and categories
class GetProducts(APITestCase):
    def setUp(self):
        for product in product_list:
            Product.objects.create(id=product["id"],name=product["name"],image=product["image"],images=product["images"],price=product["price"],stock=product["stock"],itemCategory=product["itemCategory"],itemType=product["itemType"],size=product["size"],productID=product["productID"],colors=product["colors"])
        self.category_routes =[
            '/api/men?type=sneakers',
            '/api/men?type=bottoms',
            '/api/women?type=sneakers',
            '/api/women?type=tops',
            '/api/kids?type=sneakers',
            '/api/kids?type=boots'
        ]
    def test_get_products(self):
        response = self.client.get('/api/products')
        info = response.json()
        self.assertGreater(len(info["products"]),0)
    def test_get_category(self):
        for i in self.category_routes:
            response = self.client.get(i)
            info = response.json()
            self.assertGreater(len(info["products"]),0)
