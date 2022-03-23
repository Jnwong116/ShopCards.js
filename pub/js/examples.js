const soccerJersey = {
    id: 0,
    name: "Soccer Jersey",
    price: 45.0,
    discount: "",
    img: "images/items/bayern.jpg",
    sizes: ["XS, S, M, LG"],
    link: "/"
}

const gpu = {
    id: 1,
    name: "RTX 3070",
    price: 500.0,
    discount: "",
    img: "images/items/3070.png",
    link: "/"
}

const airpods = {
    id: 2,
    name: "Airpods Pro",
    price: 100.0,
    discount: "20%",
    img: "images/items/airpods.webp",
    link: "/"
}

const jeans = {
    id: 3,
    name: "Jeans",
    price: 50.0,
    discount: "10%",
    img: "images/items/jeans.webp",
    sizes: ["XS, S, M, LG, XL"],
    link: "/"
}

const ItemList = [soccerJersey, gpu, airpods, jeans];

const shopData = {
    statusColor: "red",
    quickView: true,
    items: ItemList
}

const shop = new shopCards(shopData);
shop.logData();

const itemGrid = document.getElementById('shopGrid');
itemGrid.appendChild(shop.displayItems());

document.body.appendChild(shop.displayCart());
