// const soccerJersey = {
//     id: 0,
//     name: "Soccer Jersey",
//     price: 45.0,
//     discount: "",
//     img: "images/items/bayern.jpg",
//     sizes: ["XS", "S", "M", "LG"],
//     link: "/",
//     description: "This is a soccer jersey from FC Bayern",
//     numReviews: 250,
//     rating: 4.5
// }

// const gpu = {
//     id: 1,
//     name: "RTX 3070",
//     price: 500.0,
//     discount: "",
//     img: "images/items/3070.png",
//     link: "/",
//     description: "This is a RTX 3070 gpu",
//     numReviews: 1002,
//     rating: 3
// }

// const airpods = {
//     id: 2,
//     name: "Airpods Pro",
//     price: 100.0,
//     discount: "20%",
//     img: "images/items/airpods.webp",
//     link: "/",
//     description: "These are airpods pro, never used",
//     numReviews: 50,
//     rating: 3.5
// }

// const jeans = {
//     id: 3,
//     name: "Jeans",
//     price: 50.0,
//     discount: "10%",
//     img: "images/items/jeans.webp",
//     sizes: ["XS", "S", "M", "LG"],
//     link: "/",
//     description: "Jeans from Levis on sale!",
//     numReviews: 4560,
//     rating: 4.5
// }

// let ItemList = [soccerJersey, gpu, airpods, jeans];

// const shopData = {
//     discountColor: "red",
//     quickView: true,
//     items: ItemList,
//     checkoutLink: '/',
//     ratingColor: "green",
//     reviewColor: "green",
//     addToCartColor: "#124cdf",
//     cartNumberColor: "red"
// }

// const shop = new shopCards(shopData);


// const itemGrid = document.getElementById('shopGrid');
// itemGrid.appendChild(shop.displayItems());

// const cartIcon = document.getElementById('cartIcon');
// cartIcon.appendChild(shop.displayCart())

// function logData() {
//     shop.logData();
// }

// const filters = shop.displayFilters();
// itemGrid.insertBefore(filters, itemGrid.firstChild);

// const card = shop.displayItem(ItemList[2]);
// document.body.appendChild(card);

// // Table stuff
// const addItemForm = document.querySelector('#addItem')
// const itemTable = document.querySelector('#itemList')

// addItemForm.addEventListener('submit', addItem);

// for (let i = 0; i < ItemList.length; i++) {
//     addItemToTable(ItemList[i]);
// }

// function addItem(e) {
// 	e.preventDefault();

// 	const newItem = {
//         name: addItemForm.elements[0].value,
//         price: addItemForm.elements[1].value,
//         discount: addItemForm.elements[2].value,
//         img: "images/items/bayern.jpg",
//         link: "/"
//     }

// 	ItemList.push(newItem);

// 	addItemToTable(newItem);

//     shop.updateStore();
// }

// function addItemToTable(item) {
//     let length = itemTable.rows.length;
// 	let row = itemTable.insertRow(length);

// 	let itemName = row.insertCell(0);
// 	let itemPrice = row.insertCell(1);
// 	let itemDiscount = row.insertCell(2);

// 	itemName.innerHTML = item.name;
// 	itemPrice.innerHTML = item.price;
// 	itemDiscount.innerHTML = item.discount;
// }

// function deleteItem() {
//     ItemList.splice(-1, 1);

//     itemTable.deleteRow(itemTable.rows.length - 1);

//     shop.updateStore();
// }