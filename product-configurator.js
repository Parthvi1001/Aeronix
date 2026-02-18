/**
 * Shared Product Configurator Module
 * Used by headphones.js and airburds.js (and extensible for future product pages).
 *
 * Usage:
 *   1. Define your product data (products, models, audioOptions, batteryOptions)
 *   2. Call initProductConfigurator({ products, models, audioOptions, batteryOptions, productType, productTypeDisplay })
 *
 * Expects the following DOM ids on the page:
 *   productsGrid, productsSection, configuratorPage,
 *   configProductName, configProductImage,
 *   modelOptions, audioOptions, batteryOptions,
 *   summaryModel, summaryAudio, summaryBattery, summaryTotal
 */

let _cfg = {
    products: [],
    models: [],
    audioOptions: [],
    batteryOptions: [],
    productType: '',          // e.g. 'headphone', 'earbud'
    productTypeDisplay: ''    // e.g. 'Headphones', 'Earbuds'
};

let currentConfig = {
    model: null,
    audio: null,
    battery: null
};

/* ---------- Initialisation ---------- */

function initProductConfigurator(config) {
    _cfg = config;
    currentConfig = {
        model: _cfg.models[0],
        audio: _cfg.audioOptions[0],
        battery: _cfg.batteryOptions[0]
    };

    document.addEventListener('DOMContentLoaded', function () {
        loadProducts();
        loadCartFromStorage();
        updateCartUI();

        // Highlight "Models" in navbar on page load
        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.classList.remove('active');
            if (link.textContent.trim() === 'Models') {
                link.classList.add('active');
            }
        });
    });
}

/* ---------- Product Grid ---------- */

function loadProducts() {
    var grid = document.getElementById('productsGrid');
    grid.innerHTML = _cfg.products.map(function (product) {
        return '\
        <div class="col-lg-4 col-md-6">\
            <div class="product-card">\
                <div class="product-image-container">\
                    <div class="product-actions">\
                        <button class="action-btn favorite-btn" data-product-type="' + _cfg.productType + '" data-product-id="' + product.id + '" aria-label="Toggle favorite"><i class="bi bi-heart"></i></button>\
                        <button class="action-btn"><i class="bi bi-shuffle"></i></button>\
                    </div>\
                    <img src="' + product.image + '" alt="' + product.name + '" class="product-image">\
                </div>\
                <div class="product-info">\
                    <div class="d-flex justify-content-between align-items-start mb-3">\
                        <div>\
                            <h5 class="product-title">' + product.name + '</h5>\
                            <p class="product-subtitle">' + product.subtitle + '</p>\
                        </div>\
                        <div class="product-price">₹' + product.price.toLocaleString('en-IN') + '</div>\
                    </div>\
                    <div class="product-specs">\
                        <div class="spec-item">\
                            <span class="spec-value">' + product.specs.battery + '</span>\
                            <div class="spec-label">Battery</div>\
                        </div>\
                        <div class="spec-item">\
                            <span class="spec-value">' + product.specs.audio + '</span>\
                            <div class="spec-label">Audio</div>\
                        </div>\
                        <div class="spec-item">\
                            <span class="spec-value">' + product.specs.anc + '</span>\
                            <div class="spec-label">ANC</div>\
                        </div>\
                    </div>\
                    <button class="btn-configure" onclick="openConfigurator(' + product.id + ')">\
                        Configure <i class="bi bi-arrow-right"></i>\
                    </button>\
                </div>\
            </div>\
        </div>';
    }).join('');

    wireFavoriteButtons();
}

/* ---------- Configurator ---------- */

function openConfigurator(productId) {
    var product = _cfg.products.find(function (p) { return p.id === productId; });
    var modelIndex = productId - 1;

    currentConfig.model = _cfg.models[modelIndex];

    document.getElementById('configProductName').textContent = product.name;
    document.getElementById('configProductImage').src = product.image;

    document.getElementById('productsSection').classList.add('hidden');
    document.getElementById('configuratorPage').classList.add('active');

    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.classList.remove('active');
        if (link.textContent.trim() === 'Configure') {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    loadConfigOptions();
    updateSummary();
}

function closeConfigurator() {
    document.getElementById('configuratorPage').classList.remove('active');
    document.getElementById('productsSection').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadConfigOptions() {
    // Model (read-only display)
    document.getElementById('modelOptions').innerHTML = '\
        <div class="option-card selected">\
            <div class="d-flex justify-content-between align-items-center">\
                <div>\
                    <div class="option-name">' + currentConfig.model.name + '</div>\
                </div>\
                <div class="option-price">₹' + currentConfig.model.price.toLocaleString('en-IN') + '</div>\
            </div>\
        </div>';

    // Audio options
    document.getElementById('audioOptions').innerHTML = _cfg.audioOptions.map(function (option, index) {
        return '\
        <div class="option-card ' + (currentConfig.audio.name === option.name ? 'selected' : '') + '"\
             onclick="selectAudio(' + index + ')">\
            <div class="d-flex justify-content-between align-items-center">\
                <div>\
                    <div class="option-name">' + option.name + '</div>\
                    ' + (option.detail ? '<div class="option-included">' + option.detail + '</div>' : '') + '\
                </div>\
                <div class="option-price">' + (option.included ? 'Included' : '+₹' + option.price.toLocaleString('en-IN')) + '</div>\
            </div>\
        </div>';
    }).join('');

    // Battery options
    document.getElementById('batteryOptions').innerHTML = _cfg.batteryOptions.map(function (option, index) {
        return '\
        <div class="option-card ' + (currentConfig.battery.name === option.name ? 'selected' : '') + '"\
             onclick="selectBattery(' + index + ')">\
            <div class="d-flex justify-content-between align-items-center">\
                <div>\
                    <div class="option-name">' + option.name + '</div>\
                </div>\
                <div class="option-price">' + (option.included ? 'Included' : '+₹' + option.price.toLocaleString('en-IN')) + '</div>\
            </div>\
        </div>';
    }).join('');
}

function selectAudio(index) {
    currentConfig.audio = _cfg.audioOptions[index];
    loadConfigOptions();
    updateSummary();
}

function selectBattery(index) {
    currentConfig.battery = _cfg.batteryOptions[index];
    loadConfigOptions();
    updateSummary();
}

function updateSummary() {
    document.getElementById('summaryModel').textContent =
        currentConfig.model.name + ' - ₹' + currentConfig.model.price.toLocaleString('en-IN');
    document.getElementById('summaryAudio').textContent = currentConfig.audio.name;
    document.getElementById('summaryBattery').textContent = currentConfig.battery.name;

    var total = currentConfig.model.price + currentConfig.audio.price + currentConfig.battery.price;
    document.getElementById('summaryTotal').textContent = '₹' + total.toLocaleString('en-IN');
}

function resetConfiguration() {
    currentConfig = {
        model: _cfg.models[0],
        audio: _cfg.audioOptions[0],
        battery: _cfg.batteryOptions[0]
    };
    loadConfigOptions();
    updateSummary();
}

/* ---------- Favorites ---------- */

function wireFavoriteButtons() {
    if (!window.AeronixSession) return;

    document.querySelectorAll('.favorite-btn[data-product-type="' + _cfg.productType + '"]')
        .forEach(function (button) {
            var productId = Number(button.dataset.productId);
            window.AeronixSession.registerFavoriteButton(button, function () {
                var product = _cfg.products.find(function (p) { return p.id === productId; });
                if (!product) return null;
                return {
                    id: product.id,
                    type: _cfg.productType,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    subtitle: product.subtitle
                };
            });
        });
}

/* ---------- Cart ---------- */

function addToCart() {
    var item = {
        id: Date.now(),
        type: _cfg.productTypeDisplay,
        name: currentConfig.model.name,
        image: document.getElementById('configProductImage').src,
        config: {
            model: currentConfig.model.name,
            audio: currentConfig.audio.name,
            battery: currentConfig.battery.name
        },
        price: currentConfig.model.price + currentConfig.audio.price + currentConfig.battery.price
    };

    cart.push(item);
    saveCartToStorage();
    updateCartUI();
    showAddedToCartNotification(item.name);
    openCart();
}
