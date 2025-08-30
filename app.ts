// --- DOM ELEMENT SELECTIONS ---
const menuBtn = document.getElementById('menu-btn') as HTMLButtonElement;
const closeBtn = document.getElementById('close-btn') as HTMLButtonElement;
const mainNav = document.getElementById('main-nav') as HTMLElement;

const cartBtn = document.getElementById('cart-btn') as HTMLButtonElement;
const cartPopup = document.getElementById('cart-popup') as HTMLElement;
const cartCount = document.getElementById('cart-count') as HTMLElement;
const cartContent = document.getElementById('cart-content') as HTMLElement;

const mainProductImage = document.getElementById('main-product-image') as HTMLImageElement;
const thumbnailContainer = document.querySelector('.thumbnail-container') as HTMLElement;
const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');

const decreaseQtyBtn = document.getElementById('decrease-qty') as HTMLButtonElement;
const increaseQtyBtn = document.getElementById('increase-qty') as HTMLButtonElement;
const quantityDisplay = document.getElementById('quantity') as HTMLElement;
const addToCartBtn = document.getElementById('add-to-cart-btn') as HTMLButtonElement;

// --- STATE MANAGEMENT ---
let currentQuantity = 0;
let cartQuantity = 0;
const productPrice = 125.00;
const productTitle = "Fall Limited Edition Sneakers";
const productThumbnail = "./images/image-product-1-thumbnail.jpg";

// --- FUNCTIONS ---

// Toggles the mobile navigation menu
function toggleMobileMenu(): void {
  mainNav.classList.toggle('active'); 
}

// Toggles the visibility of the cart popup
function toggleCartPopup(): void {
  cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}

// Updates the quantity display
function updateQuantity(amount: number): void {
  currentQuantity += amount;
  if (currentQuantity < 0) {
    currentQuantity = 0;
  }
  quantityDisplay.textContent = currentQuantity.toString();
}

// Adds the selected quantity to the cart
function addToCart(): void {
  if (currentQuantity > 0) {
    cartQuantity += currentQuantity;
    updateCartDisplay();
    currentQuantity = 0; // Reset quantity selector
    quantityDisplay.textContent = '0';
  }
}

// Updates the cart's appearance and content
function updateCartDisplay(): void {
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
    document.getElementById('delete-cart-item')?.addEventListener('click', deleteCartItem);
  } else {
    cartCount.style.display = 'none';
    cartContent.innerHTML = '<p>Your cart is empty.</p>';
  }
}

// Deletes item from the cart
function deleteCartItem(): void {
    cartQuantity = 0;
    updateCartDisplay();
}

// Handles thumbnail clicks to change the main product image
function handleThumbnailClick(event: Event): void {
  const clickedThumbnail = (event.target as HTMLElement).closest('.thumbnail');
  if (!clickedThumbnail) return;

  // Update active state
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  clickedThumbnail.classList.add('active');

  // Change main image
  const thumbnailImg = clickedThumbnail.querySelector('img') as HTMLImageElement;
  // Create the full-size image path from the thumbnail path
  const newImageSrc = thumbnailImg.src.replace('-thumbnail', '');
  mainProductImage.src = newImageSrc;
}


// --- EVENT LISTENERS ---
menuBtn.addEventListener('click', toggleMobileMenu);
closeBtn.addEventListener('click', toggleMobileMenu);
cartBtn.addEventListener('click', toggleCartPopup);

increaseQtyBtn.addEventListener('click', () => updateQuantity(1));
decreaseQtyBtn.addEventListener('click', () => updateQuantity(-1));
addToCartBtn.addEventListener('click', addToCart);
thumbnailContainer.addEventListener('click', handleThumbnailClick);

// Initialize the cart display on page load
updateCartDisplay();