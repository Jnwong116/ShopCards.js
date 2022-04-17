const soccerJersey = {
    id: 0,
    name: "Soccer Jersey",
    price: 45.0,
    discount: "",
    img: "images/items/bayern.jpg",
    sizes: ["XS", "S", "M", "LG"],
    link: "/",
    description: "This is a soccer jersey from FC Bayern",
    numReviews: 250,
    rating: 4.5
}

const gpu = {
    id: 1,
    name: "RTX 3070",
    price: 500.0,
    discount: "",
    img: "images/items/3070.png",
    link: "/",
    description: "This is a RTX 3070 gpu",
    numReviews: 1002,
    rating: 3
}

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

const jeans = {
    id: 3,
    name: "Jeans",
    price: 50.0,
    discount: "10%",
    img: "images/items/jeans.webp",
    sizes: ["XS", "S", "M", "LG"],
    link: "/",
    description: "Jeans from Levis on sale!",
    numReviews: 4560,
    rating: 4.5
}

let ItemList = [soccerJersey, gpu, airpods, jeans];

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

const itemGrid = document.getElementById('shopGrid');
itemGrid.appendChild(shop.displayItems());

const cartIcon = document.getElementById('cartIcon');
cartIcon.appendChild(shop.displayCart())

const filters = shop.displayFilters();
itemGrid.insertBefore(filters, itemGrid.firstChild);