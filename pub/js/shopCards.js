const log = console.log

function shopCards(data) {
    this.cart = [];
    this.statusColor = data.statusColor || "red";
    this.quickView = data.quickView;
    this.items = data.items;

    this.cartStatus = '';
    this.itemGrid = '';
}



function _calculateDiscount(item) {
    let discount = item.discount;
    let price = item.price;
    if (discount === "") {
        return price;
    }

    else {
        discount = discount.slice(0, -1); // Removes the %
        discount = parseFloat(discount);

        discount = discount / 100;
        discount = 1 - discount;

        price = price * discount;
        return price;
    }
}

function _getTotalItems(cart) {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += parseInt(cart[i].quantity);
    }

    return total;
}

function _addToCart(item, shopCards) {
    if (shopCards.cart.length === 0) {
        shopCards.cart.push({
            item: item,
            quantity: 1
        })
    }

    else {
        let inCart = false;
        for (let i = 0; i < shopCards.cart.length; i++) {
            if (shopCards.cart[i].item.id === item.id) {
                shopCards.cart[i].quantity = parseInt(shopCards.cart[i].quantity) + 1;
                inCart = true;
            }
        }

        if (!inCart) {
            shopCards.cart.push({
                item: item,
                quantity: 1
            })
        }
    }
    
    shopCards.cartStatus.innerText = _getTotalItems(shopCards.cart);
}

function _createItemCard(item, statusColor, quickView, shopCards) {
    const itemPrice = _calculateDiscount(item);

    const card = document.createElement('div');
    card.className = 'cardWrap';

    const figure = document.createElement('figure');
    figure.classList.add('card');

    const itemImg = document.createElement('div');
    itemImg.className = 'itemImg';

        // Checks if there is a discount, if there is: shows discount status
        if (itemPrice !== item.price) { // There is a discount
            const discount = document.createElement('span');
            discount.className = 'status';
            discount.innerHTML = item.discount;
            discount.style.backgroundColor = statusColor;

            itemImg.appendChild(discount);
        }

        const itemPic = document.createElement('img');
        itemPic.src = item.img;

        itemImg.appendChild(itemPic);

        // Checks if dev wants quickview option
        if (quickView) {
            const quickView = document.createElement('button');
            quickView.className = 'quickView';

            // Implement this!!!
            // quickView.onclick = 

            const quickViewIcon = document.createElement('i');
            quickViewIcon.className = 'fa fa-search-plus';

            quickView.innerHTML = "Quick View";

            quickView.insertBefore(quickViewIcon, quickView.firstChild);
            itemImg.appendChild(quickView);
        }

    const figCap = document.createElement('figcaption');
    figCap.className = 'itemInfo';

        const cardInfo = document.createElement('div');
        cardInfo.className = 'cardInfo';

            const itemName = document.createElement('a');
            itemName.className = 'itemName';
            itemName.innerText = item.name;
            itemName.href = item.link;

            const itemPriceWrap = document.createElement('div');
            itemPriceWrap.className = 'priceWrap';

            const price = document.createElement('span');
            price.className = 'price';
            price.innerText = "$" + itemPrice;

            // Checks if there is a discount
            if (itemPrice !== item.price) {
                const oldPrice = document.createElement('del');
                oldPrice.className = 'oldPrice';
                oldPrice.innerText = "$" + item.price;

                itemPriceWrap.appendChild(oldPrice);
            }

            itemPriceWrap.insertBefore(price, itemPriceWrap.firstChild);


            cardInfo.appendChild(itemName);
            cardInfo.appendChild(itemPriceWrap);
            
        
        const addToCart = document.createElement('button');
        addToCart.className = 'addToCart';
        addToCart.innerText = "Add to Cart";
        addToCart.onclick = function() {
            _addToCart(item, shopCards);
        }
        

        figCap.appendChild(cardInfo);
        figCap.appendChild(addToCart);



    figure.appendChild(itemImg);
    figure.appendChild(figCap);
    card.appendChild(figure);

    return card;
}

function _createItemGrid(items, statusColor, quickView, shopCards) {
    const grid = document.createElement('div');
    grid.className = 'itemGrid';

    items.map((item) => {
        grid.appendChild(_createItemCard(item, statusColor, quickView, shopCards));
    })

    shopCards.itemGrid = grid;

    return grid;
}

function _createCart() {
    const cartWrapper = document.createElement('div');
    cartWrapper.className = 'cartWrapper';

    const cart = document.createElement('button');
    cart.className = 'cart';
    cart.id = 'shopCardsCart';

    const cartIcon = document.createElement('i');
    cartIcon.classList.add('fa');
    cartIcon.classList.add('fa-shopping-cart');
    cartIcon.classList.add('cartIcon');

    const numItems = document.createElement('span');
    numItems.className = 'cartNumItems';


    cart.appendChild(cartIcon);
    cartWrapper.appendChild(cart);
    cartWrapper.appendChild(numItems);

    return [cartWrapper, numItems];
}

shopCards.prototype = {

    // Logs data
    logData: function() {
        log(this);
        log(this.cart);
    },

    // Returns a flexbox element with all the item cards displayed in a grid
    displayItems: function() {
        return _createItemGrid(this.items, this.statusColor, this.quickView, this);
    },

    // Returns a cart obj with id shopCardsCart
    displayCart: function() {
        const [cart, cartStatus] = _createCart();
        this.cartStatus = cartStatus;
        this.cartStatus.innerText = _getTotalItems(this.cart);
        return cart;
    },

    // Updates item grid with new items 
    updateStore: function() {

        // Removes all old item cards
        while(this.itemGrid.childNodes.length !== 0) {
            this.itemGrid.removeChild(this.itemGrid.childNodes[0]);
        }

        this.items.map((item) => {
            this.itemGrid.appendChild(_createItemCard(item, this.statusColor, this.quickView, this));
        })
    }
}