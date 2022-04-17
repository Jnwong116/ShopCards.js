# ShopCards.js

## Link to heroku page:
https://shopcards-jnwong116.herokuapp.com/

## Getting started

Install ShopCards.js by downloading the shopCards_library.zip folder. Make sure to extract all the files from the zip folder into the same directory as your HTML files. Once you extract the folder you should see 2 new files: 

shopCards.js - This is the main JavaScript file containing the object definitions and functions used for the library.
shopCards.css - This is the main CSS file containing the styling for all the objects defined in shopCards.js

Add the following code snippet into the head tag of your HTML file to integrate ShopCards.js into your app.

<"link rel="stylesheet" type="text/css" href="shopCards.css">
<script defer type="text/javascript" src="shopCards.js"></script>

To use ShopCards.js, you will need another JavaScript file. To use the library in that JavaScript file, you can copy this basic code snippet into your JavaScript file to get started. Take special note of how the data must be configured. A more detailed explanation can be found on the documentation page.

const airpods = {
    id: 2,
    name: "Airpods Pro",
    price: 100.0,
    discount: "20%",
    img: "images/items/airpods.webp",
    link: "/",
    description: "These are airpods pro, never used",
    numReviews: 50,
    rating: 3.5
}

let ItemList = [airpods];

const shopData = {
    discountColor: "red",
    quickView: true,
    items: ItemList,
    checkoutLink: '/',
    ratingColor: "green",
    reviewColor: "green",
    addToCartColor: "#124cdf",
    cartNumberColor: "red"
}

const shop = new shopCards(shopData);
const itemGrid = shop.displayItems();
const cartIcon = shop.displayCart();

## Link to documentation
https://shopcards-jnwong116.herokuapp.com/documentation