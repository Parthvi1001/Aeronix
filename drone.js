// Drone page logic
const droneNavbar = document.querySelector('.navbar');
const updateDroneNavbar = () => {
    if (!droneNavbar) return;
    droneNavbar.classList.toggle('scrolled', window.scrollY > 0);
};
window.addEventListener('scroll', updateDroneNavbar, { passive: true });
window.addEventListener('load', updateDroneNavbar);

// Drone Data
const drones = [
    {
        id: 1,
        name: "Aeronix SkyHawk X1",
        price: 6999,
        tagline: "The Perfect Start",
        badge: "CONSUMER",
        image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&h=600&fit=crop",
        specs: { speed: "45 km/h", flight: "28 min", camera: "4K" }
    },
    {
        id: 2,
        name: "Aeronix Phantom Pro",
        price: 12999,
        tagline: "Professional Grade",
        badge: "PROFESSIONAL",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop",
        specs: { speed: "68 km/h", flight: "42 min", camera: "6K" }
    },
    {
        id: 3,
        name: "Aeronix Mavic Ultra",
        price: 24999,
        tagline: "Beyond Limits",
        badge: "PROFESSIONAL",
        image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&h=600&fit=crop",
        specs: { speed: "85 km/h", flight: "55 min", camera: "8K" }
    },
    {
        id: 4,
        name: "Aeronix Spark Mini",
        price: 3499,
        tagline: "Compact Adventure",
        badge: "CONSUMER",
        image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&h=600&fit=crop",
        specs: { speed: "35 km/h", flight: "20 min", camera: "2.7K" }
    },
    {
        id: 5,
        name: "Aeronix FPV Racer",
        price: 15999,
        tagline: "Racing Performance",
        badge: "PROFESSIONAL",
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&h=600&fit=crop",
        specs: { speed: "120 km/h", flight: "18 min", camera: "4K" }
    },
    {
        id: 6,
        name: "Aeronix Inspire Titan",
        price: 45999,
        tagline: "Industrial Power",
        badge: "ENTERPRISE",
        image: "drone1.jfif",
        specs: { speed: "60 km/h", flight: "90 min", camera: "12K" }
    },
    {
        id: 7,
        name: "Aeronix Tello Nano",
        price: 1999,
        tagline: "Pocket Explorer",
        badge: "CONSUMER",
        image: "drone2.jpg",
        specs: { speed: "25 km/h", flight: "15 min", camera: "1080p" }
    },
    {
        id: 8,
        name: "Aeronix Matrice Sentinel",
        price: 74999,
        tagline: "Security Excellence",
        badge: "ENTERPRISE",
        image: "drone3.jpeg",
        specs: { speed: "75 km/h", flight: "120 min", camera: "8K+ IR" }
    }
];

const configOptions = {
    cameras: [
        { id: 1, name: "Standard 4K", included: true, price: 0 },
        { id: 2, name: "Pro 6K RAW", included: false, price: 2499 },
        { id: 3, name: "Ultra 8K HDR", included: false, price: 4999 }
    ],
    batteries: [
        { id: 1, name: "Standard (28 min)", included: true, price: 0 },
        { id: 2, name: "Extended (42 min)", included: false, price: 1299 },
        { id: 3, name: "Ultra (55 min)", included: false, price: 2499 }
    ],
    colors: [
        { id: 1, name: "Stealth Black", hex: "#1a1a1a", price: 0 },
        { id: 2, name: "Arctic White", hex: "#f5f5f5", price: 399 },
        { id: 3, name: "Sunset Orange", hex: "#ff6b35", price: 599 },
        { id: 4, name: "Ocean Blue", hex: "#00b4d8", price: 599 },
        { id: 5, name: "Forest Green", hex: "#2d6a4f", price: 599 }
    ]
};

let currentConfig = {
    drone: drones[0],
    camera: configOptions.cameras[0],
    battery: configOptions.batteries[0],
    color: configOptions.colors[0]
};

// Shopping Cart
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadDrones();
    loadCartFromStorage();
    updateCartUI();

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('active');
        if (link.textContent.trim() === 'Models') {
            link.classList.add('active');
        }
    });
});

function loadDrones() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = drones.map(createDroneCard).join('');
    wireFavoriteButtons();
}

function createDroneCard(drone) {
    return `
        <div class="col-lg-4 col-md-6">
            <div class="product-card">
                <div class="product-image-container">
                    <div class="product-actions">
                        <button class="action-btn favorite-btn" data-product-type="drone" data-product-id="${drone.id}" aria-label="Toggle favorite"><i class="bi bi-heart"></i></button>
                        <button class="action-btn"><i class="bi bi-shuffle"></i></button>
                    </div>
                    <img src="${drone.image}" alt="${drone.name}" class="product-image">
                </div>
                <div class="product-info">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h5 class="product-title">${drone.name}</h5>
                            <p class="product-subtitle">${drone.tagline}</p>
                        </div>
                        <div class="product-price">₹${drone.price.toLocaleString('en-IN')}</div>
                    </div>
                    <div class="product-specs">
                        <div class="spec-item">
                            <span class="spec-value">${drone.specs.flight}</span>
                            <div class="spec-label">Flight</div>
                        </div>
                        <div class="spec-item">
                            <span class="spec-value">${drone.specs.speed}</span>
                            <div class="spec-label">Speed</div>
                        </div>
                        <div class="spec-item">
                            <span class="spec-value">${drone.specs.camera}</span>
                            <div class="spec-label">Camera</div>
                        </div>
                    </div>
                    <button class="btn-configure" onclick="openConfigurator(${drone.id})">
                        Configure <i class="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function wireFavoriteButtons() {
    if (!window.AeronixSession) return;

    document.querySelectorAll('.favorite-btn[data-product-type="drone"]').forEach((button) => {
        const droneId = Number(button.dataset.productId);
        window.AeronixSession.registerFavoriteButton(button, () => {
            const drone = drones.find((d) => d.id === droneId);
            if (!drone) return null;
            return {
                id: drone.id,
                type: 'drone',
                name: drone.name,
                price: drone.price,
                image: drone.image,
                subtitle: drone.tagline
            };
        });
    });
}

function openConfigurator(droneId) {
    const drone = drones.find((d) => d.id === droneId);
    if (!drone) return;

    currentConfig = {
        drone,
        camera: configOptions.cameras[0],
        battery: configOptions.batteries[0],
        color: configOptions.colors[0]
    };

    document.getElementById('configProductName').textContent = drone.name;
    document.getElementById('configProductImage').src = drone.image;
    document.getElementById('productsSection').classList.add('hidden');
    document.getElementById('configuratorPage').classList.add('active');

    loadConfigOptions();
    updateSummary();

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('active');
        if (link.textContent.trim() === 'Configure') {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeConfigurator() {
    document.getElementById('configuratorPage').classList.remove('active');
    document.getElementById('productsSection').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadConfigOptions() {
    loadModelOption();
    loadCameraOptions();
    loadBatteryOptions();
    loadColorOptions();
}

function loadModelOption() {
    document.getElementById('modelOptions').innerHTML = `
        <div class="option-card selected">
            <div class="d-flex justify-content-between align-items-center">
                <div class="option-name">${currentConfig.drone.name}</div>
                <div class="option-price">₹${currentConfig.drone.price.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `;
}

function loadCameraOptions() {
    document.getElementById('cameraOptions').innerHTML = configOptions.cameras.map((camera) => `
        <div class="option-card ${currentConfig.camera.id === camera.id ? 'selected' : ''}" onclick="selectCameraById(${camera.id})">
            <div class="d-flex justify-content-between align-items-center">
                <div class="option-name">${camera.name}</div>
                <div class="option-price">${camera.included ? 'Included' : '+₹' + camera.price.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `).join('');
}

function loadBatteryOptions() {
    document.getElementById('batteryOptions').innerHTML = configOptions.batteries.map((battery) => `
        <div class="option-card ${currentConfig.battery.id === battery.id ? 'selected' : ''}" onclick="selectBatteryById(${battery.id})">
            <div class="d-flex justify-content-between align-items-center">
                <div class="option-name">${battery.name}</div>
                <div class="option-price">${battery.included ? 'Included' : '+₹' + battery.price.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `).join('');
}

function loadColorOptions() {
    const colorsEl = document.getElementById('colorOptions');
    colorsEl.innerHTML = configOptions.colors.map((color) => `
        <div class="color-option ${currentConfig.color.id === color.id ? 'selected' : ''}" onclick="selectColorById(${color.id})">
            <div class="color-circle" data-color="${color.hex}"></div>
            <div class="color-name">${color.name}</div>
            <div class="color-price">${color.price === 0 ? 'Free' : '+₹' + color.price.toLocaleString('en-IN')}</div>
        </div>
    `).join('');

    applyColorSwatches(colorsEl);
}

function applyColorSwatches(scope) {
    scope.querySelectorAll('.color-circle[data-color]').forEach((el) => {
        el.style.backgroundColor = el.dataset.color;
    });
}

function selectCameraById(id) {
    const camera = configOptions.cameras.find((c) => c.id === id);
    if (!camera) return;
    currentConfig.camera = camera;
    loadConfigOptions();
    updateSummary();
}

function selectBatteryById(id) {
    const battery = configOptions.batteries.find((b) => b.id === id);
    if (!battery) return;
    currentConfig.battery = battery;
    loadConfigOptions();
    updateSummary();
}

function selectColorById(id) {
    const color = configOptions.colors.find((c) => c.id === id);
    if (!color) return;
    currentConfig.color = color;
    loadConfigOptions();
    updateSummary();
}

function resetConfig() {
    currentConfig.camera = configOptions.cameras[0];
    currentConfig.battery = configOptions.batteries[0];
    currentConfig.color = configOptions.colors[0];
    loadConfigOptions();
    updateSummary();
}

function calculateTotal() {
    return currentConfig.drone.price + currentConfig.camera.price + currentConfig.battery.price + currentConfig.color.price;
}

function updateSummary() {
    document.getElementById('summaryModel').textContent = `${currentConfig.drone.name} - ₹${currentConfig.drone.price.toLocaleString('en-IN')}`;
    document.getElementById('summaryCamera').textContent = currentConfig.camera.name;
    document.getElementById('summaryBattery').textContent = currentConfig.battery.name;
    const summaryColor = document.getElementById('summaryColor');
    if (summaryColor) {
        summaryColor.textContent = currentConfig.color.name;
    }
    document.getElementById('summaryTotal').textContent = `₹${calculateTotal().toLocaleString('en-IN')}`;
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('aeronixCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCartToStorage() {
    localStorage.setItem('aeronixCart', JSON.stringify(cart));
}

function addToCart() {
    if (!currentConfig.drone) return;

    const item = {
        id: Date.now(),
        type: 'Drone',
        name: currentConfig.drone.name,
        image: currentConfig.drone.image,
        config: {
            model: currentConfig.drone.name,
            camera: currentConfig.camera.name,
            battery: currentConfig.battery.name,
            color: currentConfig.color.name
        },
        price: calculateTotal()
    };

    cart.push(item);
    saveCartToStorage();
    updateCartUI();
    showAddedToCartNotification(item.name);
    openCart();
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

function removeFromCart(itemId) {
    cart = cart.filter((item) => item.id !== itemId);
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

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotalPrice');

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
        cartItemsContainer.innerHTML = cart.map((item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <span class="cart-item-type ${getTypeClass(item.type)}">${item.type}</span>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-config">${item.config.camera} • ${item.config.battery} • ${item.config.color}</div>
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

    billItemsContainer.innerHTML = cart.map((item) => `
        <div class="bill-item">
            <div>
                <span class="bill-item-type ${getTypeClass(item.type)}">${item.type}</span>
                <div class="bill-item-name">${item.name}</div>
                <div class="bill-item-details">${item.config.camera} • ${item.config.battery} • ${item.config.color}</div>
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
