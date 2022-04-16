const log = console.log

function shopCards(data) {
    this.cart = [];
    this.statusColor = data.statusColor || "red";
    this.quickView = data.quickView;
    this.items = data.items;

    this.cartStatus = '';
    this.itemGrid = '';
    this.quickViewContainer = '';
    this.cartContainer = '';
}



function _calculateDiscount(item) {
    let discount = item.discount;
    let price = item.price;
    if (discount === "") {
        return price;
    }

    else {
        discount = discount.trim();
        if (discount.charAt(discount.length - 1) === '%') {
            discount = discount.slice(0, -1); // Removes the %
        }
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

function _addToCart(item, shopCards, quantity) {
    if (shopCards.cart.length === 0) {
        shopCards.cart.push({
            item: item,
            quantity: parseInt(quantity)
        })
    }

    else {
        let inCart = false;
        for (let i = 0; i < shopCards.cart.length; i++) {
            if (shopCards.cart[i].item.id === item.id) {
                shopCards.cart[i].quantity = parseInt(shopCards.cart[i].quantity) + parseInt(quantity);
                inCart = true;
            }
        }

        if (!inCart) {
            shopCards.cart.push({
                item: item,
                quantity: parseInt(quantity)
            })
        }
    }
    
    shopCards.cartStatus.innerText = _getTotalItems(shopCards.cart);
}

function _createItemCard(item, statusColor, quickView, shopCards, quickViewContainer) {
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
            let itemDiscount = item.discount;
            if (itemDiscount.charAt(itemDiscount.length - 1) !== '%') {
                itemDiscount += '%';
            }
            discount.innerHTML = itemDiscount;
            
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

            const preview = _createQuickView(item, shopCards, quickViewContainer);
            quickViewContainer.appendChild(preview);
            quickView.onclick = () => {
                preview.classList.add('active');
                quickViewContainer.classList.add('active');
            }

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
            _addToCart(item, shopCards, 1);
        }
        

        figCap.appendChild(cardInfo);
        figCap.appendChild(addToCart);



    figure.appendChild(itemImg);
    figure.appendChild(figCap);
    card.appendChild(figure);

    return card;
}

function _createItemGrid(items, statusColor, quickView, shopCards, quickViewContainer) {
    const grid = document.createElement('div');
    grid.className = 'itemGrid';

    items.map((item) => {
        grid.appendChild(_createItemCard(item, statusColor, quickView, shopCards, quickViewContainer));
    })

    shopCards.itemGrid = grid;

    return grid;
}

function _createCart(shopCards) {
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

    
    // Checks if the cartDisplay has been created yet
    if (shopCards.cartContainer === '') { // It hasn't been created yet
        const cartContainer = document.createElement('div');
        cartContainer.className = 'cartContainer';
        document.body.appendChild(cartContainer);
        shopCards.cartContainer = cartContainer;
    }

    cartWrapper.onclick = () => {
        // Removes previous overview
        while (shopCards.cartContainer.childNodes.length !== 0) {
            shopCards.cartContainer.removeChild(shopCards.cartContainer.childNodes[0]);
        }

        _createCartOverview(shopCards);
        shopCards.cartContainer.classList.add('active');
    }

    return [cartWrapper, numItems];
}

function _generateRating(item, shopCardItemRating) {
    const halfStars = item.rating % 1;
    const fullStars = Math.trunc(item.rating);

    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('i');
        star.className = 'fas fa-star';
        shopCardItemRating.appendChild(star);
    }

    let numStars = fullStars;

    if (halfStars != 0) { // There is a half star
        const halfStar = document.createElement('i');
        halfStar.className = 'fas fa-star-half-alt';
        shopCardItemRating.appendChild(halfStar);
        numStars = fullStars + 1;
    }

    for (let i = 0; i < (5 - numStars); i++) {
        const emptyStar = document.createElement('i');
        emptyStar.className = 'far fa-star';
        shopCardItemRating.appendChild(emptyStar);
    }
}

function _createQuickView(item, shopCards, quickViewContainer) {
    const itemPrice = _calculateDiscount(item);

    const preview = document.createElement('div');
    preview.className = 'quickViewPreview';

    const closeButton = document.createElement('i');
    closeButton.className = 'fas fa-times';
    closeButton.onclick = () => {
        preview.classList.remove('active');
        quickViewContainer.classList.remove('active');
    }

    const itemPic = document.createElement('img');
    itemPic.className = 'quickViewItemPic'
    itemPic.src = item.img;

    const itemName = document.createElement('h3');
    itemName.innerText = item.name;

        const rating = document.createElement('div');
        rating.className = 'rating';
        _generateRating(item, rating);

        const numReviews = document.createElement('a');
        numReviews.className = 'reviews';
        numReviews.innerText = '(' + item.numReviews + ')';
        numReviews.href = item.link;

        rating.appendChild(numReviews);

    const description = document.createElement('p');
    description.innerText = item.description;

    const priceWrapper = document.createElement('div');
    priceWrapper.className = 'priceWrapper';

    const price = document.createElement('span');
    price.innerText = "$" + itemPrice;

    // Checks if there is a discount
    if (itemPrice !== item.price) {
        const oldPrice = document.createElement('del');
        oldPrice.className = 'quickViewOldPrice';
        oldPrice.innerText = "$" + item.price;

        priceWrapper.appendChild(oldPrice);
    }

    priceWrapper.insertBefore(price, priceWrapper.firstChild);

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'buttonWrapper';

    const viewMore = document.createElement('a');
    viewMore.className = 'quickViewMore';
    viewMore.innerText = "View More";
    viewMore.href = item.link;

    const addToCart = document.createElement('button');
    addToCart.className = 'quickViewAddToCart';
    addToCart.innerText = 'Add To Cart';

    preview.appendChild(closeButton);
    preview.appendChild(itemPic);
    preview.appendChild(itemName);
    preview.appendChild(rating);
    preview.appendChild(description);
    preview.appendChild(priceWrapper);

    // Creates the size options if size is specified
    if (item.sizes !== undefined) {
        const sizes = document.createElement('article');
        sizes.className = 'sizesWrapper';

        const sizesHeader = document.createElement('header');
        sizesHeader.className = 'sizesHeader';

        const sizesTitle = document.createElement('h6');
        sizesTitle.className = 'sizesTitle';
        sizesTitle.innerText = 'Sizes';

        sizesHeader.appendChild(sizesTitle);

        const sizeSelectorWrapper = document.createElement('div');
        
        const sizeSelector = document.createElement('div');
        sizeSelector.className = 'sizeSelector';

        for (let i = 0; i < item.sizes.length; i++) {
            const sizeLabel = document.createElement('label');
            sizeLabel.className = 'sizeLabel';

            const sizeInput = document.createElement('input');
            sizeInput.type = 'checkbox';
            sizeInput.className = 'sizeInput';

            const sizeName = document.createElement('span');
            sizeName.className = 'sizeName';
            sizeName.innerText = item.sizes[i];

            sizeLabel.appendChild(sizeInput);
            sizeLabel.appendChild(sizeName);
            sizeSelector.appendChild(sizeLabel);
        }

        sizeSelectorWrapper.appendChild(sizeSelector);
        sizes.appendChild(sizesHeader);
        sizes.appendChild(sizeSelectorWrapper);
        preview.appendChild(sizes);
    }

    // Creates number selector
    const quantityWrapper = document.createElement('div');
    quantityWrapper.className = 'quantityWrapper';

    const subtract = document.createElement('input');
    subtract.value = "-";
    subtract.type = 'button';
    subtract.className = 'subtractQuantity';

    const quantity = document.createElement('input');
    quantity.type = 'number';
    quantity.step = '1';
    quantity.min = '1';
    quantity.id = `quantity${item.id}`;
    quantity.value = '1';
    quantity.className = 'itemQuantity';

    const add = document.createElement('input');
    add.type = 'button';
    add.value = '+';
    add.className = 'addQuantity';

    add.onclick = () => {
        quantity.value = parseInt(quantity.value) + 1;
    }

    subtract.onclick = () => {
        // Makes sure the value can't go below 1
        const newVal = parseInt(quantity.value) - 1;
        
        if (newVal >= 1) {
            quantity.value = newVal;
        }
    }

    quantityWrapper.appendChild(subtract);
    quantityWrapper.appendChild(quantity);
    quantityWrapper.appendChild(add);


    preview.appendChild(quantityWrapper);

    addToCart.onclick = () => {
        preview.classList.remove('active');
        quickViewContainer.classList.remove('active');
        _addToCart(item, shopCards, quantity.value);
    }
    
    
    buttonWrapper.appendChild(viewMore);
    buttonWrapper.appendChild(addToCart);
    preview.appendChild(buttonWrapper);

    return preview;
}

function _calcPrice(cart) {
    let subtotal = 0;

    for (let i = 0; i < cart.length; i++){

        let discount = cart[i].item.discount;
        if (discount === "") {
            discount = 0;
        }
        else {
            discount = discount.slice(0, -1);
        }
        discount = parseFloat(discount);
        discount = 1 - (discount / 100);
        subtotal += cart[i].item.price * discount * cart[i].quantity;
    }
    const tax = Math.round(0.13 * subtotal * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    return [subtotal, tax, total];
}

function _createCartOverview(shopCards) {
    const cartOverview = document.createElement('div');
    cartOverview.className = 'cartOverview';

    const closeButton = document.createElement('i');
    closeButton.className = 'fas fa-times';
    closeButton.onclick = () => {
        shopCards.cartContainer.classList.remove('active');
    }

    cartOverview.appendChild(closeButton);

    const cartHeader = document.createElement('div');
    cartHeader.className = 'cartHeader';

        const cartTitle = document.createElement('h3');
        cartTitle.className = 'cartTitle';
        cartTitle.innerText = 'Shopping Cart';

        const removeAllButton = document.createElement('h5');
        removeAllButton.className = 'cartRemoveAllButton';
        removeAllButton.innerText = 'Remove all';
        removeAllButton.onclick = () => {
            shopCards.cart = [];
            shopCards.cartStatus.innerText = _getTotalItems(shopCards.cart);

            // Removes all itemCards
            while (document.getElementsByClassName('cartItem').length !== 0) {
                cartOverview.removeChild(document.getElementsByClassName('cartItem')[0]);
            }

            // Updates total costs
            const ret = _calcPrice(shopCards.cart);
            const subtotalAmt = ret[0];
            const taxAmt = ret[1];
            const totalAmt = ret[2];

            const subtotal = document.getElementById('subtotal');
            subtotal.innerText = "$" + subtotalAmt; 
            
            const tax = document.getElementById('tax');
            tax.innerText = "$" + taxAmt; 

            const total = document.getElementById('total');
            total.innerText = "$" + totalAmt; 
        }

        cartHeader.appendChild(cartTitle);
        cartHeader.appendChild(removeAllButton);


    cartOverview.appendChild(cartHeader);
        

    // Creates a itemCard for each item in the cart
    for (let i = 0; i < shopCards.cart.length; i++) {
        const item = shopCards.cart[i].item;
        const quantity = shopCards.cart[i].quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cartItem';

        const itemInfo = document.createElement('div');
        itemInfo.className = 'cartItemInfo';

            const itemImageContainer = document.createElement('div');
            itemImageContainer.className = 'aside';

                const itemImage = document.createElement('img');
                itemImage.className = 'itemImage';
                itemImage.src = item.img;

            itemImageContainer.appendChild(itemImage);
            
            const itemAbout = document.createElement('div');
            itemAbout.className = 'itemAbout';

                const itemName = document.createElement('h1');
                itemName.className = 'cartItemName';
                itemName.innerText = item.name;

                const itemDesc = document.createElement('h3');
                itemDesc.className = 'itemDesc';
                itemDesc.innerText = item.description;

                itemAbout.appendChild(itemName);
                itemAbout.appendChild(itemDesc);

            itemInfo.appendChild(itemImageContainer);
            itemInfo.appendChild(itemAbout);

        const itemQuantity = document.createElement('div');
        itemQuantity.className = 'cartItemQuantity';

            const addButton = document.createElement('div');
            addButton.className = 'cartAddButton';
            addButton.innerText = '+';

            const count = document.createElement('div');
            count.className = 'cartItemCount';
            count.innerText = quantity;

            const subtractButton = document.createElement('div');
            subtractButton.className = 'cartSubtractButton';
            subtractButton.innerText = '-';

            itemQuantity.appendChild(subtractButton);
            itemQuantity.appendChild(count);
            itemQuantity.appendChild(addButton);


        const itemPrice = document.createElement('div');
        itemPrice.className = 'itemPrice';
        const realPrice = _calculateDiscount(item);

            const price = document.createElement('var');
            price.className = 'totalItemPrice';
            price.innerText = "$" + realPrice * quantity;

            const pricePer = document.createElement('small');
            pricePer.className = 'pricePerItem';
            pricePer.innerText = "$" + realPrice + " each";

            const removeButton = document.createElement('div');
            removeButton.className = 'cartRemoveButton';

                const u = document.createElement('u');
                u.innerText = 'Remove';
                removeButton.appendChild(u);
                removeButton.onclick = () => {
                    const itemIndex = shopCards.cart.findIndex(i => i.item === item);
                    shopCards.cart.splice(itemIndex, 1);
                    shopCards.cartStatus.innerText = _getTotalItems(shopCards.cart);
                    cartOverview.removeChild(document.getElementsByClassName('cartItem')[itemIndex]);

                    // Updates total costs
                    const ret = _calcPrice(shopCards.cart);
                    const subtotalAmt = ret[0];
                    const taxAmt = ret[1];
                    const totalAmt = ret[2];

                    const subtotal = document.getElementById('subtotal');
                    subtotal.innerText = "$" + subtotalAmt; 
                    
                    const tax = document.getElementById('tax');
                    tax.innerText = "$" + taxAmt; 

                    const total = document.getElementById('total');
                    total.innerText = "$" + totalAmt; 
                }

            itemPrice.appendChild(price);
            itemPrice.appendChild(pricePer);
            itemPrice.appendChild(removeButton);

            addButton.onclick = () => {
                const newVal = parseInt(count.innerText) + 1;
                count.innerText = newVal;
                const itemIndex = shopCards.cart.findIndex(i => i.item === item);
                shopCards.cart[itemIndex].quantity = newVal;
                shopCards.cartStatus.innerText = _getTotalItems(shopCards.cart);
                price.innerText = "$" + realPrice * newVal;

                // Updates total costs
                const ret = _calcPrice(shopCards.cart);
                const subtotalAmt = ret[0];
                const taxAmt = ret[1];
                const totalAmt = ret[2];

                const subtotal = document.getElementById('subtotal');
                subtotal.innerText = "$" + subtotalAmt; 
                
                const tax = document.getElementById('tax');
                tax.innerText = "$" + taxAmt; 

                const total = document.getElementById('total');
                total.innerText = "$" + totalAmt; 
            }
        
            subtractButton.onclick = () => {
                // Makes sure the value can't go below 1
                const newVal = parseInt(count.innerText) - 1;
                
                if (newVal >= 1) {
                    count.innerText = newVal;
                    const itemIndex = shopCards.cart.findIndex(i => i.item === item);
                    shopCards.cart[itemIndex].quantity = newVal;
                    shopCards.cartStatus.innerText = _getTotalItems(shopCards.cart);
                    price.innerText = "$" + realPrice * newVal;

                    // Updates total costs
                    const ret = _calcPrice(shopCards.cart);
                    const subtotalAmt = ret[0];
                    const taxAmt = ret[1];
                    const totalAmt = ret[2];

                    const subtotal = document.getElementById('subtotal');
                    subtotal.innerText = "$" + subtotalAmt; 
                    
                    const tax = document.getElementById('tax');
                    tax.innerText = "$" + taxAmt; 

                    const total = document.getElementById('total');
                    total.innerText = "$" + totalAmt; 
                }
            }

        cartItem.appendChild(itemInfo);
        cartItem.appendChild(itemQuantity);
        cartItem.appendChild(itemPrice);
        cartOverview.appendChild(cartItem);

    }

    const hr = document.createElement('hr');
    cartOverview.appendChild(hr);

    // Calculates total cost
    const ret = _calcPrice(shopCards.cart);
    const cartSubtotal = ret[0];
    const cartTax = ret[1];
    const cartTotal = ret[2];

    const cartPrice = document.createElement('div');
    cartPrice.className = 'cartPrice';

        const subtotal = document.createElement('dl');
        subtotal.className = 'priceCalcs';
        
            const subtotalTitle = document.createElement('dt');
            subtotalTitle.innerText = 'Subtotal Price:';

            const subtotalPrice = document.createElement('dd');
            subtotalPrice.innerText = "$" + cartSubtotal;
            subtotalPrice.id = 'subtotal';

            subtotal.appendChild(subtotalTitle);
            subtotal.appendChild(subtotalPrice);

        const tax = document.createElement('dl');
        tax.className = 'priceCalcs';
        
            const taxTitle = document.createElement('dt');
            taxTitle.innerText = 'Tax:';

            const taxPrice = document.createElement('dd');
            taxPrice.innerText = "$" + cartTax;
            taxPrice.id = 'tax';

            tax.appendChild(taxTitle);
            tax.appendChild(taxPrice);

        const total = document.createElement('dl');
        total.className = 'priceCalcs';
        
            const totalTitle = document.createElement('dt');
            totalTitle.innerText = 'Total:';

            const totalPrice = document.createElement('dd');
            totalPrice.className = 'totalPrice';
            totalPrice.innerText = "$" + cartTotal;
            totalPrice.id = 'total';

            total.appendChild(totalTitle);
            total.appendChild(totalPrice);

        cartPrice.appendChild(subtotal);
        cartPrice.appendChild(tax);
        cartPrice.appendChild(total);
    
    cartOverview.appendChild(cartPrice);
    shopCards.cartContainer.appendChild(cartOverview);

}

// function _query(attribute, value) {

// }

shopCards.prototype = {

    // Logs data
    logData: function() {
        log(this);
        log(this.cart);
    },

    // Returns a flexbox element with all the item cards displayed in a grid
    displayItems: function() {
        
        // If quickView function is enabled and there does not already exist a quickViewContainer: create one
        if (this.quickView && this.quickViewContainer === '') {
            const quickViewContainer = document.createElement('div');
            quickViewContainer.className = 'quickViewContainer';
            document.body.appendChild(quickViewContainer);
            this.quickViewContainer = quickViewContainer;
        }

        return _createItemGrid(this.items, this.statusColor, this.quickView, this, this.quickViewContainer);
    },

    // Returns a item card (Add functionality to change width/height)
    displayItem: function(item) {

        // If quickView function is enabled and there does not already exist a quickViewContainer: create one
        if (this.quickView && this.quickViewContainer === '') {
            const quickViewContainer = document.createElement('div');
            quickViewContainer.className = 'quickViewContainer';
            document.body.appendChild(quickViewContainer);
            this.quickViewContainer = quickViewContainer;
        }

        return _createItemCard(item, this.statusColor, this.quickView, this, this.quickViewContainer);
    },

    // Returns a cart obj with id shopCardsCart
    displayCart: function() {
        const [cart, cartStatus] = _createCart(this);
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

        // Removes all quickView cards
        while(this.quickViewContainer.childNodes.length !== 0) {
            this.quickViewContainer.removeChild(this.quickViewContainer.childNodes[0]);
        }

        this.items.map((item) => {
            this.itemGrid.appendChild(_createItemCard(item, this.statusColor, this.quickView, this, this.quickViewContainer));
        })
    }
}