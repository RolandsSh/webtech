function submitForm(e) {
  if (e.preventDefault) e.preventDefault();
  if(document.getElementById("contact-form").checkValidity()){
  alert('Thank you for your message! We will be in touch soon.');
}
return false;
}

var cart = JSON.parse(localStorage.getItem("cart")) || {items: []};
var total = 0;

function calculateTotal() {
  var cart = JSON.parse(localStorage.getItem("cart")) || {items: []};
  for (var i = 0; i < cart.items.length; i++) {
    total += cart.items[i].price * cart.items[i].quantity;
  }
  return total;
}

function addToCart(name, price, quantity) {
  var cart = JSON.parse(localStorage.getItem("cart")) || {items: []};
  var existingItem = cart.items.find(function(item) {
    return item.name === name;
  });
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    var item = {
      name: name,
      price: price,
      quantity: quantity,
    };
    cart.items.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("total").innerHTML = calculateTotal();
}

function removeFromCart(name) {
  var cart = JSON.parse(localStorage.getItem("cart")) || {items: []};
  var updatedItems = cart.items.filter(function(item) {
  return item.name !== name;
  });
  cart.items = updatedItems;
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("total").innerHTML = calculateTotal();
  displayCart();
}

function displayCart() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  for (var i = 0; i < cart.items.length; i++) {
    var cartItem = cart.items[i];
    var itemRow = document.createElement("div");
    itemRow.classList.add("cart-item");
    itemRow.innerHTML = `
      <div class="item-name">${cartItem.name}</div>
      <div class="item-quantity">${cartItem.quantity}</div>
      <div class="item-price">${cartItem.price} €</div>
      <div class="item-subtotal">${Number(cartItem.quantity*cartItem.price).toFixed(2)} €</div>
      <button type="button" class="btn btn-primary remove-from-cart" onclick = "removeFromCart('${cartItem.name}');">Remove</button>
    `;
    cartContainer.appendChild(itemRow);
  }
  var totalPrice = document.createElement("div");
  totalPrice.classList.add("total-price");
  totalPrice.innerHTML = "Total: " + Number(calculateTotal()).toFixed(2) + " €";
  cartContainer.appendChild(totalPrice);
}

window.addEventListener("load", displayCart);
