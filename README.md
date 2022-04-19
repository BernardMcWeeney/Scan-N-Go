# SCAN-N-GO
### A retail solution to turn the customer into the cashier

SCAN-N-GO (SNG) is a disruptive mobile application and web service that will revolutionise the retail industry by turning the customer into the cashier. Our idea has the potential to eliminate all queuing and congestion in fast-paced retails stores globally. 
Our web application and infrastructure allows retail store customers to transform their smartphone into a product scanner and payment tool, eliminating the need for physical cashiers and even self-service checkouts.

## Running the Servers

### Front-End Server
Change directory by going to **/frontend**

Run `npm start` to start the front-end server.

### Back-End Server
Change directory by going to **/backend**

Run `pip install -r requirements.txt` to install python dependencies.

Run `python3 manage.py runserver` to run the back-end server.

## Accessing the Web-App

#### Accessing SCAN-N-GO locally: 

Run the back-end server and front-end server simultaneously and go to [127.0.0.1:8000](127.0.0.1:8000).

#### Accessing SCAN-N-GO Live on Microsoft Azure:
Alternatively, there is a live version of our project on [scanngo.ie](https://www.scanngo.ie)

## Logging into the web-app

To log in to the frontend web app as a customer of a retail store you can use the following test user

**Username:** conor

**Password:** test

Alternatively, if you would like to login as a store staff member, you can use the following credentials:

**Username:** dave

**Password:** test

## Using the web-app

Once you log in to the SCAN-N-GO platform (as a customer), you will be asked to _"Scan-in"_ to a store. To do this, scan a store scan-in barcode (which can be found in the directory `/barcodes`). 

Once you are logged in to a enrolled SCAN-N-GO store you will be able to being shopping! To access a product page you will need to scan a product (Products can be found in the `/barcodes/product_barcodes.jpg`)

**Information: ** Not all products belong to every store, so some barcoded products may not work in certain stores. Exceptions are listed below:

**Monster Original Energy Drink** belongs to the store Londis DCU. Therefore it will not scan if you are logged into Spar Shanowen Rd.

**Fulfil Peanut Butter Bar** belongs to the store Spar Shanowen Rd. Therefore it will not scan if you are logged into Londis DCU
