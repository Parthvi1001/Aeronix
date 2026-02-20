// Drone Data
const drones = [
    {
        id: 1,
        name: "Aeronix SkyHawk X1",
        price: 6999,
        tagline: "The Perfect Start",
        badge: "CONSUMER",
        image: "assets/drone1_p.jpeg",
        specs: { speed: "45 km/h", flight: "28 min", camera: "4K" }
    },
    {
        id: 2,
        name: "Aeronix Phantom Pro",
        price: 12999,
        tagline: "Professional Grade",
        badge: "PROFESSIONAL",
        image: "assets/drone2_p.jpg",
        specs: { speed: "68 km/h", flight: "42 min", camera: "6K" }
    },
    {
        id: 3,
        name: "Aeronix Mavic Ultra",
        price: 24999,
        tagline: "Beyond Limits",
        badge: "PROFESSIONAL",
        image: "assets/drone3_p.jpeg",
        specs: { speed: "85 km/h", flight: "55 min", camera: "8K" }
    },
    {
        id: 4,
        name: "Aeronix Spark Mini",
        price: 3499,
        tagline: "Compact Adventure",
        badge: "CONSUMER",
        image: "assets/drone4_p.jpeg",
        specs: { speed: "35 km/h", flight: "20 min", camera: "2.7K" }
    },
    {
        id: 5,
        name: "Aeronix FPV Racer",
        price: 15999,
        tagline: "Racing Performance",
        badge: "PROFESSIONAL",
        image: "assets/drone5_p.jpeg",
        specs: { speed: "120 km/h", flight: "18 min", camera: "4K" }
    },
    {
        id: 6,
        name: "Aeronix Inspire Titan",
        price: 45999,
        tagline: "Industrial Power",
        badge: "ENTERPRISE",
        image: "assets/drone1.jfif",
        specs: { speed: "60 km/h", flight: "90 min", camera: "12K" }
    },
    {
        id: 7,
        name: "Aeronix Tello Nano",
        price: 1999,
        tagline: "Pocket Explorer",
        badge: "CONSUMER",
        image: "assets/drone2.jpg",
        specs: { speed: "25 km/h", flight: "15 min", camera: "1080p" }
    },
    {
        id: 8,
        name: "Aeronix Matrice Sentinel",
        price: 74999,
        tagline: "Security Excellence",
        badge: "ENTERPRISE",
        image: "assets/drone3.jpeg",
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
    ]
};

let currentConfig = {
    drone: drones[0],
    camera: configOptions.cameras[0],
    battery: configOptions.batteries[0]
};


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
        battery: configOptions.batteries[0]
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
}

function loadModelOption() {
    document.getElementById('modelOptions').innerHTML = `
        <div class="option-card selected">
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="option-name">${currentConfig.drone.name}</div>
                </div>
                <div class="option-price">₹${currentConfig.drone.price.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `;
}

function loadCameraOptions() {
    document.getElementById('cameraOptions').innerHTML = configOptions.cameras.map((camera) => `
        <div class="option-card ${currentConfig.camera.id === camera.id ? 'selected' : ''}" onclick="selectCameraById(${camera.id})">
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="option-name">${camera.name}</div>
                </div>
                <div class="option-price ${camera.included ? 'option-included' : ''}">${camera.included ? 'Included' : '+₹' + camera.price.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `).join('');
}

function loadBatteryOptions() {
    document.getElementById('batteryOptions').innerHTML = configOptions.batteries.map((battery) => `
        <div class="option-card ${currentConfig.battery.id === battery.id ? 'selected' : ''}" onclick="selectBatteryById(${battery.id})">
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <div class="option-name">${battery.name}</div>
                </div>
                <div class="option-price ${battery.included ? 'option-included' : ''}">${battery.included ? 'Included' : '+₹' + battery.price.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `).join('');
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

function resetConfig() {
    currentConfig.camera = configOptions.cameras[0];
    currentConfig.battery = configOptions.batteries[0];
    loadConfigOptions();
    updateSummary();
}

function calculateTotal() {
    return currentConfig.drone.price + currentConfig.camera.price + currentConfig.battery.price;
}

function updateSummary() {
    document.getElementById('summaryModel').textContent = `${currentConfig.drone.name} - ₹${currentConfig.drone.price.toLocaleString('en-IN')}`;
    document.getElementById('summaryCamera').textContent = currentConfig.camera.name;
    document.getElementById('summaryBattery').textContent = currentConfig.battery.name;
    document.getElementById('summaryTotal').textContent = `₹${calculateTotal().toLocaleString('en-IN')}`;
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
            battery: currentConfig.battery.name
        },
        price: calculateTotal()
    };

    cart.push(item);
    saveCartToStorage();
    updateCartUI();
    showAddedToCartNotification(item.name);
    openCart();
}

