from rest_framework.test import APITestCase
from rest_framework import status
from api.models import Product

#Test search endpoint
class SearchItem(APITestCase):
    def setUp(self):
        self.product_list = [
            {
                "id": 26,
                "name": "Original Leather Boots Men Autumn Shoes Male Leather Casual Boots Men Comfy Anti-Slip Lace-up Boots",
                "image": "https://img.joomcdn.net/c36517d21c889721a8022aed86c4f04eef15c7f5_original.jpeg",
                "images": [],
                "price": 65,
                "stock": 11,
                "itemCategory": "mens",
                "itemType": "boots",
                "size": "10.0",
                "productID": "jtaaDMuU",
                "colors": "null"
            },
            {
                "id": 28,
                "name": "DECARSDZ Men Boots Autumn Comfy Durable outsole Lace-up Fashion Shoes Men 2021 Leather Casual Boots Men Brand design Men's Boots",
                "image": "https://ae01.alicdn.com/kf/H279458f6f35b4525ae992451f169d01bc/DECARSDZ-Men-Boots-Autumn-Comfy-Durable-outsole-Lace-up-Fashion-Shoes-Men-2021-Leather-Casual-Boots.jpg_q50.jpg",
                "images": [],
                "price": 150.65,
                "stock": 45,
                "itemCategory": "mens",
                "itemType": "boots",
                "size": "10.0",
                "productID": "Sv0tfLVW",
                "colors": "null"
            },
            {
                "id": 29,
                "name": "MEN'S RUST BROWN CHELSEA BOOTS BY BERNARD DE WULF",
                "image": "https://cdn.shopify.com/s/files/1/1594/9235/products/DWChelseaBootsMen_Rust2_bootsmen_leatherchelseabootsmen_leatherboots_bootsmen_brownchelseaboots_dewulfmenshoes_dewulfmenboots_800x.jpg?v=1602180231",
                "images": [],
                "price": 100,
                "stock": 22,
                "itemCategory": "mens",
                "itemType": "boots",
                "size": "12.0",
                "productID": "T7VPIhIr",
                "colors": "null"
            },
            {
                "id": 60,
                "name": "The Glove Boot",
                "image": "https://media.everlane.com/image/upload/c_fill,dpr_1.0,f_auto,g_face:center,q_auto,w_auto:100:1200/v1/i/638777eb_81bd.jpg",
                "images": [
                "https://media.everlane.com/image/upload/c_fill",
                "dpr_1.0",
                "f_auto",
                "g_face:center",
                "q_auto",
                "w_auto:100:1200/v1/i/638777eb_81bd.jpg",
                "https://media.everlane.com/image/upload/c_fill",
                "dpr_1.0",
                "f_auto",
                "g_face:center",
                "q_auto",
                "w_auto:100:1200/v1/i/048bd7df_79e2.jpg",
                "https://media.everlane.com/image/upload/c_fill",
                "dpr_1.0",
                "f_auto",
                "g_face:center",
                "q_auto",
                "w_auto:100:1200/v1/i/cbb77887_2093.jpg",
                "https://media.everlane.com/image/upload/c_fill",
                "dpr_1.0",
                "f_auto",
                "g_face:center",
                "q_auto",
                "w_auto:100:1200/v1/i/339baf79_4300.jpg",
                "https://media.everlane.com/image/upload/c_fill",
                "dpr_1.0",
                "f_auto",
                "g_face:center",
                "q_auto",
                "w_auto:100:1200/v1/i/848eb639_00fd.jpg"
                ],
                "price": 115,
                "stock": 11,
                "itemCategory": "womens",
                "itemType": "boots",
                "size": "6.5",
                "productID": "GBK7H3iw",
                "colors": "Brown"
            },
            {
                "id": 89,
                "name": "Original Leather Boots Men Autumn Shoes Male Leather Casual Boots Men Comfy Anti-Slip Lace-up Boots",
                "image": "https://img.joomcdn.net/c36517d21c889721a8022aed86c4f04eef15c7f5_original.jpeg",
                "images": [],
                "price": 65,
                "stock": 6,
                "itemCategory": "mens",
                "itemType": "boots",
                "size": "9.5",
                "productID": "jtaaDMuU",
                "colors": "null"
            },
            {
                "id": 92,
                "name": "DECARSDZ Men Boots Autumn Comfy Durable outsole Lace-up Fashion Shoes Men 2021 Leather Casual Boots Men Brand design Men's Boots",
                "image": "https://ae01.alicdn.com/kf/H279458f6f35b4525ae992451f169d01bc/DECARSDZ-Men-Boots-Autumn-Comfy-Durable-outsole-Lace-up-Fashion-Shoes-Men-2021-Leather-Casual-Boots.jpg_q50.jpg",
                "images": [],
                "price": 150.65,
                "stock": 23,
                "itemCategory": "mens",
                "itemType": "boots",
                "size": "8.0",
                "productID": "Sv0tfLVW",
                "colors": "null"
            },
            {
                "id": 93,
                "name": "MEN'S RUST BROWN CHELSEA BOOTS BY BERNARD DE WULF",
                "image": "https://cdn.shopify.com/s/files/1/1594/9235/products/DWChelseaBootsMen_Rust2_bootsmen_leatherchelseabootsmen_leatherboots_bootsmen_brownchelseaboots_dewulfmenshoes_dewulfmenboots_800x.jpg?v=1602180231",
                "images": [],
                "price": 100,
                "stock": 23,
                "itemCategory": "mens",
                "itemType": "boots",
                "size": "10.0",
                "productID": "T7VPIhIr",
                "colors": "null"
            },
            {
                "id": 94,
                "name": "MEN'S RUST BROWN CHELSEA BOOTS BY BERNARD DE WULF",
                "image": "https://cdn.shopify.com/s/files/1/1594/9235/products/DWChelseaBootsMen_Rust2_bootsmen_leatherchelseabootsmen_leatherboots_bootsmen_brownchelseaboots_dewulfmenshoes_dewulfmenboots_800x.jpg?v=1602180231",
                "images": [],
                "price": 100,
                "stock": 65,
                "itemCategory": "mens",
                "itemType": "boots",
                "size": "11.0",
                "productID": "T7VPIhIr",
                "colors": "null"
            }
        ]
        for product in self.product_list:
            Product.objects.create(id=product["id"],name=product["name"],image=product["image"],images=product["images"],price=product["price"],stock=product["stock"],itemCategory=product["itemCategory"],itemType=product["itemType"],size=product["size"],productID=product["productID"],colors=product["colors"])

    def test_search_endpoint(self):
        response = self.client.get('/api/search/?search=boot')
        info = response.json()
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertGreater(len(info),0)
