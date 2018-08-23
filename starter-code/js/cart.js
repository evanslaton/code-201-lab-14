/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;
var tableEl = document.getElementById('cart');

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  tableEl.innerHTML =
    '<thead><tr><th>Remove</th><th>Quantity</th><th>Item</th></tr></thead>';
}

function showCart() {
  var items = JSON.parse(localStorage.getItem('cart'));
  for (var i = 0; i < items.length; i++) {
    var trEl = document.createElement('tr');
    var tdRemoveEl = document.createElement('td');
    var tdItemEl = document.createElement('td');
    var tdQuantityEl = document.createElement('td');

    tdRemoveEl.textContent = 'x';
    tdItemEl.textContent = items[i][0];
    tdRemoveEl.setAttribute('id', i);
    tdQuantityEl.textContent = items[i][1];

    tableEl.appendChild(trEl);
    trEl.appendChild(tdRemoveEl);
    trEl.appendChild(tdQuantityEl);
    trEl.appendChild(tdItemEl);
  }
}

function removeItemFromCart(event) {
  var toDelete = event.target;
  var deleteId;
  if (toDelete.textContent === 'x') {
    deleteId = toDelete.id;
    console.log(deleteId);
    cart.removeItem(deleteId);
  }
  cart.saveToLocalStorage();
  clearCart();
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();

tableEl.addEventListener('click', removeItemFromCart);
