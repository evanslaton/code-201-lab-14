/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);
var selectElement = document.getElementById('items');

// On screen load, we call this method to put all of the busmall options
function populateForm() {

  //Add an <option> tag inside the form's select for each product
  for (var i = 0; i < Product.allProducts.length; i++) {
    var optionEl = document.createElement('option');
    optionEl.textContent = Product.allProducts[i].name;
    optionEl.setAttribute('value', Product.allProducts[i].name);
    selectElement.appendChild(optionEl);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // Suss out the item picked from the select list
  var selectValue = selectElement.value;
  var product;
  var quantity;

  Product.allProducts.forEach(function(object) {
    if (object.name === selectValue) {
      product = object;
    }
  });

  // Get the quantity
  quantity = document.getElementById('quantity');

  // Using those, add one item to the Cart
  cart.addItem(product.name, parseInt(quantity.value));
}

// Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var itemCount = document.getElementById('itemCount');
  itemCount.textContent = JSON.parse(localStorage.getItem('cart')).length;
}

// As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  var cartContentsDiv = document.getElementById('cartContents');

  // Get the item and quantity from the form
  var product = document.getElementById('items').value;
  var quantity = document.getElementById('quantity').value;

  // Add a new element to the cartContents div with that information
  var productPEl = document.createElement('p');
  var quantityPEl = document.createElement('p');

  productPEl.textContent = product;
  quantityPEl.textContent = quantity;

  cartContentsDiv.appendChild(productPEl);
  cartContentsDiv.appendChild(quantityPEl);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
