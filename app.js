// --- DOM ELEMENT SELECTIONS ---
var menuBtn = document.getElementById('menu-btn');
var closeBtn = document.getElementById('close-btn');
var mainNav = document.getElementById('main-nav');
var cartBtn = document.getElementById('cart-btn');
var cartPopup = document.getElementById('cart-popup');
var cartCount = document.getElementById('cart-count');
var cartContent = document.getElementById('cart-content');
var mainProductImage = document.getElementById('main-product-image');
var thumbnailContainer = document.querySelector('.thumbnail-container');
var thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');
var decreaseQtyBtn = document.getElementById('decrease-qty');
var increaseQtyBtn = document.getElementById('increase-qty');
var quantityDisplay = document.getElementById('quantity');
var addToCartBtn = document.getElementById('add-to-cart-btn');
// --- STATE MANAGEMENT ---
var currentQuantity = 0;
var cartQuantity = 0;
var productPrice = 125.00;
var productTitle = "Fall Limited Edition Sneakers";
var productThumbnail = "./images/image-product-1-thumbnail.jpg";
// --- FUNCTIONS ---
// Toggles the mobile navigation menu
function toggleMobileMenu() {
    mainNav.classList.toggle('active'); // You'll need to add a .active style for the nav
}
// Toggles the visibility of the cart popup
function toggleCartPopup() {
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}
// Updates the quantity display
function updateQuantity(amount) {
    currentQuantity += amount;
    if (currentQuantity < 0) {
        currentQuantity = 0;
    }
    quantityDisplay.textContent = currentQuantity.toString();
}
// Adds the selected quantity to the cart
function addToCart() {
    if (currentQuantity > 0) {
        cartQuantity += currentQuantity;
        updateCartDisplay();
        currentQuantity = 0; // Reset quantity selector
        quantityDisplay.textContent = '0';
    }
}
// Updates the cart's appearance and content
function updateCartDisplay() {
    var _a;
    if (cartQuantity > 0) {
        cartCount.style.display = 'block';
        cartCount.textContent = cartQuantity.toString();
        var totalPrice = (productPrice * cartQuantity).toFixed(2);
        cartContent.innerHTML = "\n      <div class=\"cart-item\">\n        <img src=\"".concat(productThumbnail, "\" alt=\"").concat(productTitle, "\" class=\"cart-item-img\">\n        <div class=\"cart-item-details\">\n          <p>").concat(productTitle, "</p>\n          <p>$").concat(productPrice.toFixed(2), " x ").concat(cartQuantity, " <strong>$").concat(totalPrice, "</strong></p>\n        </div>\n        <button class=\"delete-btn\" id=\"delete-cart-item\">\n          <img src=\"./images/icon-delete.svg\" alt=\"Delete item\">\n        </button>\n      </div>\n      <button class=\"checkout-btn\">Checkout</button>\n    ");
        // Add event listener to the newly created delete button
        (_a = document.getElementById('delete-cart-item')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', deleteCartItem);
    }
    else {
        cartCount.style.display = 'none';
        cartContent.innerHTML = '<p>Your cart is empty.</p>';
    }
}
// Deletes item from the cart
function deleteCartItem() {
    cartQuantity = 0;
    updateCartDisplay();
}
// Handles thumbnail clicks to change the main product image
function handleThumbnailClick(event) {
    var clickedThumbnail = event.target.closest('.thumbnail');
    if (!clickedThumbnail)
        return;
    // Update active state
    thumbnails.forEach(function (thumb) { return thumb.classList.remove('active'); });
    clickedThumbnail.classList.add('active');
    // Change main image
    var thumbnailImg = clickedThumbnail.querySelector('img');
    // Create the full-size image path from the thumbnail path
    var newImageSrc = thumbnailImg.src.replace('-thumbnail', '');
    mainProductImage.src = newImageSrc;
}
// --- EVENT LISTENERS ---
menuBtn.addEventListener('click', toggleMobileMenu);
closeBtn.addEventListener('click', toggleMobileMenu);
cartBtn.addEventListener('click', toggleCartPopup);
increaseQtyBtn.addEventListener('click', function () { return updateQuantity(1); });
decreaseQtyBtn.addEventListener('click', function () { return updateQuantity(-1); });
addToCartBtn.addEventListener('click', addToCart);
thumbnailContainer.addEventListener('click', handleThumbnailClick);
// Initialize the cart display on page load
updateCartDisplay();
