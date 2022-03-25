from rest_framework.test import APITestCase
from api.models import Product
from api.views import checkStock
class ProductStock(APITestCase):
    def setUp(self):
        self.product_list = [{
                "id": 49,
                "name": "Nike React Escape Run",
                "image": "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/bb42ffe7-35b9-4008-b77b-5301bc7d15ce/react-escape-run-womens-running-shoe-LP3Msz.png",
                "images": [
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/bb42ffe7-35b9-4008-b77b-5301bc7d15ce/react-escape-run-womens-running-shoe-LP3Msz.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/5971e706-0e2d-4b97-bb1c-b327553786c0/react-escape-run-womens-running-shoe-LP3Msz.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/76d42fdc-88b2-4f67-b2b3-c2aa22979d02/react-escape-run-womens-running-shoe-LP3Msz.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/fcc4710d-620a-43f0-a7f7-ac456aff3b23/react-escape-run-womens-running-shoe-LP3Msz.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/2c0d06bf-1816-4df3-adea-8c3159c69826/react-escape-run-womens-running-shoe-LP3Msz.png"
                ],
                "price": 100,
                "stock": 2,
                "itemCategory": "womens",
                "itemType": "sneakers",
                "size": "7.0",
                "productID": "yw6JFrTI",
                "colors": "Grey / White",
                "quantity": 1
            }, {
                "id": 9,
                "name": "ULTRABOOST DNA 1.0 SHOES",
                "image": "https://assets.adidas.com/images/w_600,f_auto,q_auto/1bc0bb5605f444dba249ac6d01273c46_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_01_standard.jpg",
                "images": [
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/1bc0bb5605f444dba249ac6d01273c46_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_01_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/6d1a1cc570684f3d8492ac6d01271f84_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_02_standard_hover.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/10ae0c7e3946419d8a80ac6d0129867a_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_03_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/d0a2dd63c673423b867aac6d011cfb7e_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_04_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/2446d4acb90d4b46998cac6d0122f58d_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_05_standard.jpg"
                ],
                "price": 180,
                "stock": 10,
                "itemCategory": "mens",
                "itemType": "sneakers",
                "size": "10.0",
                "productID": "d1wUKB8k",
                "colors": "null",
                "quantity": 1
            }
        ]
        self.cart_info={
            "0":{
                "id": 9,
                "name": "ULTRABOOST DNA 1.0 SHOES",
                "image": "https://assets.adidas.com/images/w_600,f_auto,q_auto/1bc0bb5605f444dba249ac6d01273c46_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_01_standard.jpg",
                "images": [
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/1bc0bb5605f444dba249ac6d01273c46_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_01_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/6d1a1cc570684f3d8492ac6d01271f84_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_02_standard_hover.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/10ae0c7e3946419d8a80ac6d0129867a_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_03_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/d0a2dd63c673423b867aac6d011cfb7e_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_04_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/2446d4acb90d4b46998cac6d0122f58d_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_05_standard.jpg"
                ],
                "price": 180,
                "stock": 10,
                "itemCategory": "mens",
                "itemType": "sneakers",
                "size": "10.0",
                "productID": "d1wUKB8k",
                "colors": "null",
                "quantity": 1
            }
        }
        self.no_stock={
            "0":{
                "id": 55,
                "name": "ULTRABOOST DNA 1.0 SHOES",
                "image": "https://assets.adidas.com/images/w_600,f_auto,q_auto/1bc0bb5605f444dba249ac6d01273c46_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_01_standard.jpg",
                "images": [
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/1bc0bb5605f444dba249ac6d01273c46_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_01_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/6d1a1cc570684f3d8492ac6d01271f84_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_02_standard_hover.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/10ae0c7e3946419d8a80ac6d0129867a_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_03_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/d0a2dd63c673423b867aac6d011cfb7e_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_04_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/2446d4acb90d4b46998cac6d0122f58d_9366/Ultraboost_DNA_1.0_Shoes_White_H05265_05_standard.jpg"
                ],
                "price": 180,
                "stock": 10,
                "itemCategory": "mens",
                "itemType": "sneakers",
                "size": "10.0",
                "productID": "d1wUKB8k",
                "colors": "null",
                "quantity": 1
            }
        }
        for product in self.product_list:
            Product.objects.create(id=product["id"],name=product["name"],image=product["image"],images=product["images"],price=product["price"],stock=product["stock"],itemCategory=product["itemCategory"],itemType=product["itemType"],size=product["size"],productID=product["productID"],colors=product["colors"])
    def test_check_stock(self):
        self.assertTrue(checkStock(self.cart_info)["status"])
        self.assertFalse(checkStock(self.no_stock)["status"])