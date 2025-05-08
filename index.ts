type Product = {
  name: string;
  price: number;
  image: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

let cart: CartItem[] = [];

// Pegando os dados do JSON injetado
const jsonData = document.getElementById('productData')?.textContent || '[]';
const products: Product[] = JSON.parse(jsonData);

// Populando o menu
const menu = document.getElementById("menu") as HTMLElement;

products.forEach((product, index) => {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>
    <button id="add-${index}">Add to Cart</button>
  `;
  
  menu.appendChild(card);

  const addButton = document.getElementById(`add-${index}`) as HTMLButtonElement;
  addButton.addEventListener('click', () => addToCart(product));
});

function addToCart(product: Product) {
  let foundIndex = -1;
for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.name === product.name) {
        foundIndex = i;
        break;
    }
}

if (foundIndex !== -1) {
    cart[foundIndex].quantity += 1;
} else {
    cart.push({ product, quantity: 1 });
}

  updateCart();
}

function increaseQuantity(index: number) {
  cart[index].quantity += 1;
  updateCart();
}

function decreaseQuantity(index: number) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);  // Remove o item se chegar a 0
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems") as HTMLElement;
  const cartTotal = document.getElementById("cartTotal") as HTMLElement;
  cartItems.innerHTML = "";

  let total = 0;
  
  cart.forEach((item, index) => {
    const li = document.createElement("li");

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";

    const productInfo = document.createElement("div");
    productInfo.innerHTML = `
      <strong>${item.product.name}</strong><br>
      $${(item.product.price * item.quantity).toFixed(2)}
    `;
    div.appendChild(productInfo);

    // Criando o contêiner para os botões de controle de quantidade
    const quantityControl = document.createElement("div");
    quantityControl.style.display = "flex";
    quantityControl.style.alignItems = "center";
    quantityControl.style.justifyContent = "space-between";
    quantityControl.style.width = "120px"; // Largura fixa para os botões

    // Botão de diminuir a quantidade (à esquerda)
    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.id = `decrease-${index}`;
    decreaseBtn.addEventListener('click', () => decreaseQuantity(index));
    decreaseBtn.style.marginRight = "10px"; // Espaço entre os botões

    // Exibindo a quantidade
    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = `${item.quantity}`;
    quantitySpan.style.margin = "0 10px"; // Espaçamento entre a quantidade e os botões

    // Botão de aumentar a quantidade (à direita)
    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.id = `increase-${index}`;
    increaseBtn.addEventListener('click', () => increaseQuantity(index));
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
