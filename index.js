var _a;
var cart = [];
// Pegando os dados do JSON injetado
var jsonData = ((_a = document.getElementById('productData')) === null || _a === void 0 ? void 0 : _a.textContent) || '[]';
var products = JSON.parse(jsonData);
// Populando o menu
var menu = document.getElementById("menu");
products.forEach(function (product, index) {
    var card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = "\n    <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\" />\n    <h3>").concat(product.name, "</h3>\n    <p>$").concat(product.price.toFixed(2), "</p>\n    <button id=\"add-").concat(index, "\">Add to Cart</button>\n  ");
    menu.appendChild(card);
    var addButton = document.getElementById("add-".concat(index));
    addButton.addEventListener('click', function () { return addToCart(product); });
});
function addToCart(product) {
    var foundIndex = -1;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product.name === product.name) {
            foundIndex = i;
            break;
        }
    }
    if (foundIndex !== -1) {
        cart[foundIndex].quantity += 1;
    }
    else {
        cart.push({ product: product, quantity: 1 });
    }
    updateCart();
}
function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCart();
}
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    else {
        cart.splice(index, 1); // Remove o item se chegar a 0
    }
    updateCart();
}
function updateCart() {
    var cartItems = document.getElementById("cartItems");
    var cartTotal = document.getElementById("cartTotal");
    cartItems.innerHTML = "";
    var total = 0;
    cart.forEach(function (item, index) {
        var li = document.createElement("li");
        var div = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
        var productInfo = document.createElement("div");
        productInfo.innerHTML = "\n      <strong>".concat(item.product.name, "</strong><br>\n      $").concat((item.product.price * item.quantity).toFixed(2), "\n    ");
        div.appendChild(productInfo);
        // Criando o contêiner para os botões de controle de quantidade
        var quantityControl = document.createElement("div");
        quantityControl.style.display = "flex";
        quantityControl.style.alignItems = "center";
        quantityControl.style.justifyContent = "space-between";
        quantityControl.style.width = "120px"; // Largura fixa para os botões
        // Botão de diminuir a quantidade (à esquerda)
        var decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "-";
        decreaseBtn.id = "decrease-".concat(index);
        decreaseBtn.addEventListener('click', function () { return decreaseQuantity(index); });
        decreaseBtn.style.marginRight = "10px"; // Espaço entre os botões
        // Exibindo a quantidade
        var quantitySpan = document.createElement("span");
        quantitySpan.textContent = "".concat(item.quantity);
        quantitySpan.style.margin = "0 10px"; // Espaçamento entre a quantidade e os botões
        // Botão de aumentar a quantidade (à direita)
        var increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";
        increaseBtn.id = "increase-".concat(index);
        increaseBtn.addEventListener('click', function () { return increaseQuantity(index); });
        increaseBtn.style.marginLeft = "10px"; // Espaço entre os botões
        // Adiciona os botões e a quantidade ao contêiner
        quantityControl.appendChild(decreaseBtn);
        quantityControl.appendChild(quantitySpan);
        quantityControl.appendChild(increaseBtn);
        div.appendChild(quantityControl);
        li.appendChild(div);
        cartItems.appendChild(li);
        total += item.product.price * item.quantity;
    });
    cartTotal.textContent = total.toFixed(2);
}
function confirmOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order confirmed!");
    cart = [];
    updateCart();
}
