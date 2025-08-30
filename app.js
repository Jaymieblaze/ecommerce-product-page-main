var _a;
// --- DOM ELEMENT SELECTIONS ---
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const mainNav = document.getElementById('main-nav');
const cartBtn = document.getElementById('cart-btn');
const cartPopup = document.getElementById('cart-popup');
const cartCount = document.getElementById('cart-count');
const cartContent = document.getElementById('cart-content');
const mainProductImage = document.getElementById('main-product-image');
const thumbnailContainer = document.querySelector('.thumbnail-container');
const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');
const decreaseQtyBtn = document.getElementById('decrease-qty');
const increaseQtyBtn = document.getElementById('increase-qty');
const quantityDisplay = document.getElementById('quantity');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const lightbox = document.getElementById('lightbox');
const closeLightboxBtn = document.getElementById('close-lightbox-btn');
const lightboxMainProductImage = document.getElementById('lightbox-main-product-image');
const lightboxThumbnailContainer = document.getElementById('lightbox-thumbnail-container');
const lightboxThumbnails = lightboxThumbnailContainer.querySelectorAll('.thumbnail');
// Array of full-size image paths (important for gallery navigation)
const productImages = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg',
];
let currentImageIndex = 0; // keep track of the current image
// New: Lightbox navigation buttons
const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
const lightboxNextBtn = document.getElementById('lightbox-next-btn');
// --- STATE MANAGEMENT ---
let currentQuantity = 0;
let cartQuantity = 0;
const productPrice = 125.00;
const productTitle = "Fall Limited Edition Sneakers";
const productThumbnail = "./images/image-product-1-thumbnail.jpg";
// --- FUNCTIONS ---
// Toggles the mobile navigation menu
function toggleMobileMenu() {
    mainNav.classList.toggle('active');
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
        const totalPrice = (productPrice * cartQuantity).toFixed(2);
        cartContent.innerHTML = `
      <div class="cart-item">
        <img src="${productThumbnail}" alt="${productTitle}" class="cart-item-img">
        <div class="cart-item-details">
          <p>${productTitle}</p>
          <p>$${productPrice.toFixed(2)} x ${cartQuantity} <strong>$${totalPrice}</strong></p>
        </div>
        <button class="delete-btn" id="delete-cart-item">
          <img src="./images/icon-delete.svg" alt="Delete item">
        </button>
      </div>
      <button class="checkout-btn">Checkout</button>
    `;
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
// Opens the lightbox
function openLightbox() {
    console.log('openLightbox called');
    lightbox.style.display = 'flex';
    // Get only the filename from the src
    const mainImgSrc = mainProductImage.src.split('/').pop();
    const startIndex = productImages.findIndex(img => img.endsWith(mainImgSrc || ''));
    if (startIndex !== -1) {
        currentImageIndex = startIndex;
        updateLightboxImage();
    }
}
// Closes the lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
}
// Updates the image in the lightbox
function updateLightboxImage() {
    lightboxMainProductImage.src = productImages[currentImageIndex];
    // Update active state for lightbox thumbnails
    lightboxThumbnails.forEach((thumb, index) => {
        thumb.classList.remove('active');
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        }
    });
}
// Navigate to previous image in lightbox
function navigateLightbox(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = productImages.length - 1;
    }
    else if (currentImageIndex >= productImages.length) {
        currentImageIndex = 0;
    }
    updateLightboxImage();
}
// HandleThumbnailClick to also update the main product image
function handleThumbnailClick(event, isLightbox = false) {
    const clickedThumbnail = event.target.closest('.thumbnail');
    if (!clickedThumbnail)
        return;
    const thumbnailImg = clickedThumbnail.querySelector('img');
    const newImageIndex = parseInt(thumbnailImg.dataset.index || '0');
    if (isLightbox) {
        // Update lightbox image
        currentImageIndex = newImageIndex;
        updateLightboxImage();
    }
    else {
        // Update main page image
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        clickedThumbnail.classList.add('active');
        mainProductImage.src = productImages[newImageIndex];
    }
}
// Toggles the visibility of the cart popup
function toggleCartPopup(event) {
    event.stopPropagation();
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}
// --- EVENT LISTENERS ---
menuBtn.addEventListener('click', toggleMobileMenu);
closeBtn.addEventListener('click', toggleMobileMenu);
cartBtn.addEventListener('click', toggleCartPopup);
// Stop clicks inside the cart popup from closing it
cartPopup.addEventListener('click', (event) => {
    event.stopPropagation();
});
// Listener to close the cart when clicking outside
document.addEventListener('click', () => {
    if (cartPopup.style.display === 'block') {
        cartPopup.style.display = 'none';
    }
});
increaseQtyBtn.addEventListener('click', () => updateQuantity(1));
decreaseQtyBtn.addEventListener('click', () => updateQuantity(-1));
addToCartBtn.addEventListener('click', addToCart);
thumbnailContainer.addEventListener('click', (event) => handleThumbnailClick(event, false));
// --- LIGHTBOX EVENT LISTENERS ---
mainProductImage.addEventListener('click', openLightbox);
closeLightboxBtn.addEventListener('click', closeLightbox);
// Lightbox navigation
lightboxPrevBtn.addEventListener('click', () => navigateLightbox(-1));
lightboxNextBtn.addEventListener('click', () => navigateLightbox(1));
lightboxThumbnailContainer.addEventListener('click', (event) => handleThumbnailClick(event, true));
// Listener to close the lightbox when clicking outside
lightbox.addEventListener('click', closeLightbox);
// Stop clicks inside the lightbox content from closing it
(_a = document.querySelector('.lightbox-content')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
    event.stopPropagation();
});
// Initial setup for the product images (set first thumbnail as active initially)
if (thumbnails.length > 0) {
    thumbnails[0].classList.add('active');
}
// Initialize the cart display on page load
updateCartDisplay();
