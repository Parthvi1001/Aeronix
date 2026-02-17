// ──────────────────────────────────────────────
//  Shared Cart Logic
//  Used by drone.js, headphones.js, airburds.js
//  Each page still defines its own addToCart().
// ──────────────────────────────────────────────
let cart = [];

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('aeronixCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCartToStorage() {
    localStorage.setItem('aeronixCart', JSON.stringify(cart));
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToStorage();
    updateCartUI();
}

function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCartUI();
}

function getTypeClass(type) {
    return `type-${type.toLowerCase().replace(/\s+/g, '-')}`;
}

// Build a config summary string from whichever keys the item has
// (skips "model" since the name already shows the model)
function formatConfigDetails(config) {
    return Object.entries(config)
        .filter(([key]) => key !== 'model')
        .map(([, value]) => value)
        .join(' • ');
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotalPrice');

    if (!cartItemsContainer || !cartBadge || !cartTotal) return;

    cartBadge.textContent = cart.length;
    cartBadge.style.display = cart.length > 0 ? 'flex' : 'none';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="bi bi-cart-x"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <span class="cart-item-type ${getTypeClass(item.type)}">${item.type}</span>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-config">${formatConfigDetails(item.config)}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
}

function generateBill() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const billItemsContainer = document.getElementById('billItems');
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    billItemsContainer.innerHTML = cart.map(item => `
        <div class="bill-item">
            <div>
                <span class="bill-item-type ${getTypeClass(item.type)}">${item.type}</span>
                <div class="bill-item-name">${item.name}</div>
                <div class="bill-item-details">${formatConfigDetails(item.config)}</div>
            </div>
            <div class="bill-item-price">₹${item.price.toLocaleString('en-IN')}</div>
        </div>
    `).join('');

    document.getElementById('billSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('billTax').textContent = `₹${tax.toLocaleString('en-IN')}`;
    document.getElementById('billTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
    document.getElementById('billDate').textContent = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('billNumber').textContent = `#INV-${Date.now().toString().slice(-8)}`;

    closeCart();
    document.getElementById('billModal').classList.add('active');

    cart = [];
    saveCartToStorage();
    updateCartUI();
}

function closeBill() {
    document.getElementById('billModal').classList.remove('active');
}

function printBill() {
    window.print();
}

function showAddedToCartNotification(name) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: #4CAF50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10001;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2s forwards;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;
    notification.innerHTML = `<i class="bi bi-check-circle"></i> ${name} added to cart!`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
}
