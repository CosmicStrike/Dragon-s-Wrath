if (document.readyState == 'loading') document.addEventListener('DOMContentLoaded', ready)
else ready()

function ready() {
    // var allRemoveButtons = document.getElementsByClassName("cart-quantity-button")

    // for (var i = 0; i < allRemoveButtons.length; i++) {
    //     var button = allRemoveButtons[i]
    //     button.addEventListener('click', removeCartItem)
    // }

    // var quantityElement = document.getElementsByClassName("cart-quantity-input")
    // for (var i = 0; i < quantityElement.length; i++) {
    //     var input = quantityElement[i]
    //     input.addEventListener('change', QuantityChanged)
    // }

    var addToCartElement = document.getElementsByClassName('shop-item-btn')
    for (var i = 0; i < addToCartElement.length; i++) {
        var button = addToCartElement[i]
        //Wrapper function is used because we cannot pass other arg along with event to callback funtion so actual function is inside the callback funtion
        button.addEventListener('click', function (event) { AddToCartClicked(event) })
    }

    addToCartElement = document.getElementsByClassName('shop-item-img')

    for (var i = 0; i < addToCartElement.length; i++) {
        var img = addToCartElement[i]
        //Wrapper function is used because we cannot pass other arg along with event to callback funtion so actual function is inside the callback funtion
        img.addEventListener('click', function (event) { AddToCartClicked(event, 1) })
    }

    document.getElementsByClassName('cart-purchase-button')[0].addEventListener('click', ItemPurchased)
}

function ItemPurchased(event) {
    var cart = document.getElementsByClassName('cart')[0]
    if (cart.childElementCount) {
        alert("Thank you for purchase")
        while (cart.childElementCount) {
            cart.removeChild(cart.firstChild)
        }
        UpdateCartTotal()
    }
    else {
        alert("There is nothing in cart to purchase")
    }
}

function AddToCartClicked(event, img = 0) {
    var grandparent = event.target.parentElement.parentElement
    if (img) grandparent = event.target.parentElement
    // console.log(grandparent.innerText)
    var title = grandparent.getElementsByClassName('shop-item-title')[0].innerText
    var price = grandparent.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = grandparent.getElementsByClassName('shop-item-img')[0].src
    // console.log(title, price, imageSrc)
    AddToCartRow(title, price, imageSrc)
}

function AddToCartRow(title, price, imgsrc) {

    var cartItemList = document.getElementsByClassName('cart-item-name')
    for (var i = 0; i < cartItemList.length; i++) {
        if (title == cartItemList[i].innerText) {
            alert(title + ' already present in cart')
            return
        }
    }

    var content = document.createElement(`div`)
    content.classList.add('cart-row')
    content.innerHTML = `           
                <div class="cart-column cart-item">
                    <img class="cart-item-img" src="${imgsrc}" alt="Attack-Booster">
                    <span class="cart-item-name">${title}</span>
                </div>
                <div class="cart-column cart-price">
                    <span style="color:gold">${price}</span>
                </div>
                <div class="cart-column cart-quantity">
                    <input class="cart-quantity-input" type="number" value="1" min="1" max="10">
                    <button class="cart-quantity-button row-btn">REMOVE</button>
                </div>           
        `

    var cart = document.getElementsByClassName('cart')[0]
    cart.append(content)
    content.getElementsByClassName('cart-quantity-button')[0].addEventListener('click', removeCartItem)
    content.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', QuantityChanged)
    UpdateCartTotal()
}

function QuantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) { input.value = 1 }
    UpdateCartTotal()
}


function removeCartItem(event) {
    var button = event.target
    button.parentElement.parentElement.remove()//removes the row which is grandparent to our button
    UpdateCartTotal()
}



function UpdateCartTotal() {
    //Remember that getElementByClassName returns array so we can use [index] to specify any one

    var cartRows = document.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {

        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]//first becasuse there is only one
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseInt(priceElement.innerText.replace("Gold", ''))
        var quantity = quantityElement.value
        total += price * quantity
    }
    // total = Math.round(total * 100) / 100 // round to first 2 decimal places to multiplied by 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ' Gold'
}