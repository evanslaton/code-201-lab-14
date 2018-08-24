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
    var tdImageEl = document.createElement('td');
    var imgEl = document.createElement('img');

    tdRemoveEl.textContent = 'x';
    tdItemEl.textContent = items[i][0];
    tdRemoveEl.setAttribute('id', i);
    tdQuantityEl.textContent = items[i][1];
    if (items[i][0] === 'Pet Sweep') {
      imgEl.src = 'assets/pet-sweep.jpg';
    } else if (items[i][0] === 'Taun-Taun') {
      imgEl.src = 'assets/tauntaun.jpg';
    } else if (items[i][0] === 'Sweep') {
      imgEl.src = 'assets/sweep.png';
    } else if (items[i][0] === 'USB') {
      imgEl.src = 'assets/usb.gif';
    } else if (items[i][0] === 'Water Can') {
      imgEl.src = 'assets/water-can.jpg';
    } else if (items[i][0] === 'Wine Glass') {
      imgEl.src = 'assets/wine-glass.jpg';
    } else {
      imgEl.src = `assets/${items[i][0].toLowerCase()}.jpg`;
    }

    tableEl.appendChild(trEl);
    trEl.appendChild(tdRemoveEl);
    trEl.appendChild(tdQuantityEl);
    trEl.appendChild(tdItemEl);
    trEl.appendChild(tdImageEl);
    tdImageEl.appendChild(imgEl);
  }
}

function removeItemFromCart(event) {
  var toDelete = event.target;
  var deleteId;
  if (toDelete.textContent === 'x') {
    deleteId = toDelete.id;
    cart.removeItem(deleteId);
  }
  cart.saveToLocalStorage();
  clearCart();
  renderCart();
  removeFromCartConfirmation();
}

function removeFromCartConfirmation() {
  var bodyEl = document.getElementsByTagName('body');
  var divEl = document.createElement('div');
  var pEl = document.createElement('p');

  divEl.className = 'confirm';
  pEl.textContent = 'Removed from cart';

  bodyEl[0].appendChild(divEl);
  divEl.appendChild(pEl);

  setTimeout(function() {
    bodyEl[0].removeChild(bodyEl[0].lastChild);
  }, 1900);
}

// This will initialize the page and draw the cart on screen
renderCart();

tableEl.addEventListener('click', removeItemFromCart);
