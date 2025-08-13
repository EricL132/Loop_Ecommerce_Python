# Loops
Web application developed to learn the workflow of an ecommerce platform

# Installation
Clone the repository with the below command
```
git clone https://github.com/EricL132/Loop_Ecommerce_Python.git
cd Loop_Ecommerce_Python
```
Create virtual environment for python
```
python -m venv env
source env/Scripts/activate
pip install -r requirements.txt
```
## Setup environment varibles
Create .env file
```
cd . > .env
```
Contents of .env
```
WEBLINK=Link for reseting password example => https://domain.com/account/reset/
SECRETKEY=Secret key for django applications => Used in settings.py, More info below
DATABASE_PASSWORD=database password => Used in settings.py
PAYPALCLIENT=Paypal client => More info below
PAYPALSECRET=Paypal secret => More info below
```
## Secret Key
Run command in terminal
```
python -c "import secrets; print(secrets.token_urlsafe())"
```

## Paypal Client & Secret
Go to https://developer.paypal.com/ and login  
Go to https://developer.paypal.com/developer/applications/create  
After creating new app you should see client and secret key

## Database
Create postgres database  
Change name of database in settings.py  
Run below command to create database tables
```
python manage.py makemigrations
```
Fill in table with data  
/api/models.py  
api_product => Products  
api_featured => Featured products on home screen
## Starting Server
```
Python manage.py runserver
```
## Starting Client
```
cd frontend
npm install
npm start
```

# Technologies
- JavaScript
- Python
- React
- Django
- Paypal-SDK
- Google Cloud Platform
