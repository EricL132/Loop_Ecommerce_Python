from rest_framework.test import APITestCase
from api.models import Featured,Product
# Test getting featured items endpoint for front page items
class GetFeatured(APITestCase):
    def setUp(self):
        self.featured = [
            {
                "id": 1,
                "product_id": 46,
                "image": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/aaa6a67130e3400bab12ad3900425aeb_9366/Love_Unites_Allover_Print_Tee_(Gender_Neutral)_Multicolor_H43968_21_model.jpg",
                "pid": "r4JiXVIw"
            },
            {
                "id": 3,
                "product_id": 37,
                "image": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/1743e1ab810d4ddb8b41ac9200e87ddb_9366/Essentials_3-Stripes_Hoodie_Grey_GK9080_21_model.jpg",
                "pid": "apc2VapV"
            },
            {
                "id": 4,
                "product_id": 38,
                "image": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/52704b6852ed47528d57ac360124520c_9366/adidas_Sportswear_3-Stripes_Hooded_Track_Top_Black_GM6450_21_model.jpg",
                "pid": "Tsm8iP8d"
            }
        ]
        self.product_list = [
            {
            "id": 46,
            "name": "LOVE UNITES TANK TOP (GENDER NEUTRAL)",
            "image": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/77e18bceabef427c945fad3900441546_9366/Love_Unites_Tank_Top_(Gender_Neutral)_Black_H43967_21_model.jpg",
            "images": [
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy/77e18bceabef427c945fad3900441546_9366/Love_Unites_Tank_Top_(Gender_Neutral)_Black_H43967_21_model.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy/9fc1842c2a9748dd8ce0ad390040ceee_9366/Love_Unites_Tank_Top_(Gender_Neutral)_Black_H43967_23_hover_model.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy/339cb0ec80da46dc9a2dac6d012e7b18_9366/Love_Unites_Tank_Top_(Gender_Neutral)_Black_H43967_25_model.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy/dd2330ec1960468f956dac6d012aba89_9366/Love_Unites_Tank_Top_(Gender_Neutral)_Black_H43967_01_laydown.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy/1e038a0ec3e1473abb7eac6d01278061_9366/Love_Unites_Tank_Top_(Gender_Neutral)_Black_H43967_41_detail.jpg"
            ],
            "price": 28,
            "stock": 233,
            "itemCategory": "mens",
            "itemType": "tops",
            "size": "small",
            "productID": "r4JiXVIw",
            "colors": "Black / Multicolor"
            },
            {
            "id": 37,
            "name": "ESSENTIALS 3-STRIPES HOODIE",
            "image": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/1743e1ab810d4ddb8b41ac9200e87ddb_9366/Essentials_3-Stripes_Hoodie_Grey_GK9080_21_model.jpg",
            "images": [],
            "price": 60,
            "stock": 12,
            "itemCategory": "mens",
            "itemType": "sweaters",
            "size": "Small",
            "productID": "apc2VapV",
            "colors": "null"
            },
            {
            "id": 38,
            "name": "ADIDAS SPORTSWEAR 3-STRIPES HOODED TRACK TOP",
            "image": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/52704b6852ed47528d57ac360124520c_9366/adidas_Sportswear_3-Stripes_Hooded_Track_Top_Black_GM6450_21_model.jpg",
            "images": [],
            "price": 65,
            "stock": 23,
            "itemCategory": "mens",
            "itemType": "sweaters",
            "size": "Large",
            "productID": "Tsm8iP8d",
            "colors": "null"
            }
        ]
        for product in self.featured:
            Featured.objects.create(id=product["id"],product_id=product["product_id"],image=product["image"])
        for product in self.product_list:
            Product.objects.create(id=product["id"],name=product["name"],image=product["image"],images=product["images"],price=product["price"],stock=product["stock"],itemCategory=product["itemCategory"],itemType=product["itemType"],size=product["size"],productID=product["productID"],colors=product["colors"])
    def test_get_featured(self):
        response = self.client.get('/api/feature')
        info = response.json()
        self.assertGreater(len(info),0)
