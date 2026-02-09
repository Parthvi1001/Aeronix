// Headphones page specific styles logic
const headphonesNavbar = document.querySelector('.navbar');
        const updateHeadphonesNavbar = () => {
            if (!headphonesNavbar) return;
            headphonesNavbar.classList.toggle('scrolled', window.scrollY > 0);
        };
        window.addEventListener('scroll', updateHeadphonesNavbar, { passive: true });
        window.addEventListener('load', updateHeadphonesNavbar);

// Product Data
        const products = [
            {
                id: 1,
                name: "Sony WH-1000XM5",
                subtitle: "The Perfect Start",
                price: 2499,
                badge: "CONSUMER",
                specs: {
                    battery: "20h",
                    audio: "HD",
                    anc: "Basic"
                },
                image: "h1.jpg"
            },
            {
                id: 2,
                name: "Bose 700",
                subtitle: "Professional Grade",
                price: 4599,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "30h",
                    audio: "Hi-Res",
                    anc: "Advanced"
                },
                image: "h2.jpg"
            },
            {
                id: 3,
                name: "AirPods Max",
                subtitle: "Beyond Limits",
                price: 7499,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "40h",
                    audio: "Studio",
                    anc: "Adaptive"
                },
                image: "h3.jpg"

            },
            {
                id: 4,
                name: "Sennheiser HD 800S",
                subtitle: "Business Class",
                price: 10999,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "50h",
                    audio: "Master",
                    anc: "Premium"
                },
                image: "h4.jpg"
            },
            {
                id: 5,
                name: "boAt Rockerz 450",
                subtitle: "Compact Power",
                price: 1699,
                badge: "CONSUMER",
                specs: {
                    battery: "15h",
                    audio: "Clear",
                    anc: "Passive"
                },
                image: "h5.jpg"
            },
            {
                id: 6,
                name: "HyperX Cloud III",
                subtitle: "Victory Sound",
                price: 3299,
                badge: "CONSUMER",
                specs: {
                    battery: "25h",
                    audio: "7.1",
                    anc: "Game"
                },
                image: "h6.jpg"
            },
            {
                id: 7,
                name: "JBL Tune 510BT",
                subtitle: "Active Lifestyle",
                price: 1999,
                badge: "CONSUMER",
                specs: {
                    battery: "18h",
                    audio: "Bass+",
                    anc: "Wind"
                },
                image: "h7.jpg"
            },
            {
                id: 8,
                name: "Audio-Technica ATH-M50x",
                subtitle: "Producer Edition",
                price: 5999,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "35h",
                    audio: "Ref",
                    anc: "Studio"
                },
                image: "h8.jpg"
            }
        ];

        const models = [
            { name: "Sony WH-1000XM5", price: 2499 },
            { name: "Bose 700", price: 4599 },
            { name: "AirPods Max", price: 7499 },
            { name: "Sennheiser HD 800S", price: 10999 },
            { name: "boAt Rockerz 450", price: 1699 },
            { name: "HyperX Cloud III", price: 3299 },
            { name: "JBL Tune 510BT", price: 1999 },
            { name: "Audio-Technica ATH-M50x", price: 5999 }
        ];

        const audioOptions = [
            { name: "Standard HD", detail: "16-bit/44.1kHz", price: 0, included: true },
            { name: "Hi-Res Audio", detail: "24-bit/96kHz", price: 499 },
            { name: "Studio Master", detail: "24-bit/192kHz", price: 999 }
        ];

        const batteryOptions = [
            { name: "Standard (20h)", price: 0, included: true },
            { name: "Extended (35h)", price: 399 },
            { name: "Ultra (50h)", price: 799 }
        ];

        const colorOptions = [
            { name: "Midnight Black", color: "#1a1a1a", price: 0, free: true },
            { name: "Pearl White", color: "#f5f5f5", price: 199 },
            { name: "Sunset Orange", color: "#FF6B35", price: 299 },
            { name: "Ocean Blue", color: "#4A90E2", price: 299 },
            { name: "Forest Green", color: "#00D084", price: 299 }
        ];

        let currentConfig = {
            model: models[0],
            audio: audioOptions[0],
            battery: batteryOptions[0],
            color: colorOptions[0]
        };

        // Load Products
        function loadProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = products.map(product => `
                <div class="col-lg-4 col-md-6">
                    <div class="product-card">
                        <div class="product-image-container">
                            <div class="product-actions">
                                <button class="action-btn favorite-btn" data-product-type="headphone" data-product-id="${product.id}" aria-label="Toggle favorite"><i class="bi bi-heart"></i></button>
                                <button class="action-btn"><i class="bi bi-shuffle"></i></button>
                            </div>
                            <img src="${product.image}" alt="${product.name}" class="product-image">
                        </div>
                        <div class="product-info">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h5 class="product-title">${product.name}</h5>
                                    <p class="product-subtitle">${product.subtitle}</p>
                                </div>
                                <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                            </div>
                            <div class="product-specs">
                                <div class="spec-item">
                                    <span class="spec-value">${product.specs.battery}</span>
                                    <div class="spec-label">Battery</div>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-value">${product.specs.audio}</span>
                                    <div class="spec-label">Audio</div>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-value">${product.specs.anc}</span>
                                    <div class="spec-label">ANC</div>
                                </div>
                            </div>
                            <button class="btn-configure" onclick="openConfigurator(${product.id})">
                                Configure <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            wireFavoriteButtons();
        }

        function openConfigurator(productId) {
            const product = products.find(p => p.id === productId);
            const modelIndex = productId - 1;
            
            currentConfig.model = models[modelIndex];
            
            document.getElementById('configProductName').textContent = product.name;
            document.getElementById('configProductImage').src = product.image;
            
            // Hide products section and show configurator page
            document.getElementById('productsSection').classList.add('hidden');
            document.getElementById('configuratorPage').classList.add('active');
            
            // Highlight Configure in navbar
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.textContent.trim() === 'Configure') {
                    link.classList.add('active');
                }
            });
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            loadConfigOptions();
            updateSummary();
        }

        function closeConfigurator() {
            // Hide configurator page and show products section
            document.getElementById('configuratorPage').classList.remove('active');
            document.getElementById('productsSection').classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function loadConfigOptions() {
            // Models - Show only the current selected model
            document.getElementById('modelOptions').innerHTML = `
                <div class="option-card selected">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="option-name">${currentConfig.model.name}</div>
                        </div>
                        <div class="option-price">₹${currentConfig.model.price.toLocaleString('en-IN')}</div>
                    </div>
                </div>
            `;

            // Audio
            document.getElementById('audioOptions').innerHTML = audioOptions.map((option, index) => `
                <div class="option-card ${currentConfig.audio.name === option.name ? 'selected' : ''}" 
                     onclick="selectAudio(${index})">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="option-name">${option.name}</div>
                            <div class="option-included">${option.detail}</div>
                        </div>
                        <div class="option-price">${option.included ? 'Included' : '+₹' + option.price.toLocaleString('en-IN')}</div>
                    </div>
                </div>
            `).join('');

            // Battery
            document.getElementById('batteryOptions').innerHTML = batteryOptions.map((option, index) => `
                <div class="option-card ${currentConfig.battery.name === option.name ? 'selected' : ''}" 
                     onclick="selectBattery(${index})">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="option-name">${option.name}</div>
                        </div>
                        <div class="option-price">${option.included ? 'Included' : '+₹' + option.price.toLocaleString('en-IN')}</div>
                    </div>
                </div>
            `).join('');

            // Colors
            const colorOptionsEl = document.getElementById('colorOptions');
            colorOptionsEl.innerHTML = colorOptions.map((option, index) => `
                <div class="color-option ${currentConfig.color.name === option.name ? 'selected' : ''}" 
                     onclick="selectColor(${index})">
                    <div class="color-circle" data-color="${option.color}"></div>
                    <div class="color-name">${option.name}</div>
                    <div class="color-price">${option.free ? 'Free' : '+₹' + option.price.toLocaleString('en-IN')}</div>
                </div>
            `).join('');
            applyColorSwatches(colorOptionsEl);
        }

        function applyColorSwatches(scope) {
            scope.querySelectorAll('.color-circle[data-color]').forEach((el) => {
                el.style.backgroundColor = el.dataset.color;
            });
        }

        function selectModel(index) {
            currentConfig.model = models[index];
            loadConfigOptions();
            updateSummary();
        }

        function selectAudio(index) {
            currentConfig.audio = audioOptions[index];
            loadConfigOptions();
            updateSummary();
        }

        function selectBattery(index) {
            currentConfig.battery = batteryOptions[index];
            loadConfigOptions();
            updateSummary();
        }

        function selectColor(index) {
            currentConfig.color = colorOptions[index];
            loadConfigOptions();
            updateSummary();
            
            // Apply color overlay to product image
            const imageContainer = document.querySelector('#configuratorPage .product-image-container');
            if (imageContainer) {
                const selectedColor = colorOptions[index].color;
                imageContainer.style.setProperty('--selected-color', selectedColor);
                
                // Remove all color classes
                imageContainer.classList.remove('color-black', 'color-white');
                
                // Add specific class for black/white colors for better effect
                if (colorOptions[index].name.toLowerCase().includes('black')) {
                    imageContainer.classList.add('color-black');
                } else if (colorOptions[index].name.toLowerCase().includes('white')) {
                    imageContainer.classList.add('color-white');
                }
            }
        }

        function updateSummary() {
            document.getElementById('summaryModel').textContent =
                `${currentConfig.model.name} - ₹${currentConfig.model.price.toLocaleString('en-IN')}`;

            document.getElementById('summaryAudio').textContent = currentConfig.audio.name;
            document.getElementById('summaryBattery').textContent = currentConfig.battery.name;
            document.getElementById('summaryColor').textContent = currentConfig.color.name;

            const total = currentConfig.model.price +
                         currentConfig.audio.price +
                         currentConfig.battery.price +
                         currentConfig.color.price;

            document.getElementById('summaryTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
        }

        function resetConfiguration() {
            currentConfig = {
                model: models[0],
                audio: audioOptions[0],
                battery: batteryOptions[0],
                color: colorOptions[0]
            };
            loadConfigOptions();
            updateSummary();
            
            // Reset color overlay to default (first color - Midnight Black)
            const imageContainer = document.querySelector('#configuratorPage .product-image-container');
            if (imageContainer) {
                imageContainer.style.setProperty('--selected-color', colorOptions[0].color);
                imageContainer.classList.remove('color-white');
                imageContainer.classList.add('color-black');
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            loadProducts();
            loadCartFromStorage();
            updateCartUI();
            
            // Highlight Models in navbar on page load
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.textContent.trim() === 'Models') {
                    link.classList.add('active');
                }
            });
        });

        // Shopping Cart Functionality
        let cart = [];

        function wireFavoriteButtons() {
            if (!window.AeronixSession) {
                return;
            }

            document.querySelectorAll('.favorite-btn[data-product-type="headphone"]').forEach((button) => {
                const productId = Number(button.dataset.productId);
                window.AeronixSession.registerFavoriteButton(button, () => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;
                    return {
                        id: product.id,
                        type: 'headphone',
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        subtitle: product.subtitle
                    };
                });
            });
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
            const item = {
                id: Date.now(),
                type: 'Headphones',
                name: currentConfig.model.name,
                image: document.getElementById('configProductImage').src,
                config: {
                    model: currentConfig.model.name,
                    audio: currentConfig.audio.name,
                    battery: currentConfig.battery.name,
                    color: currentConfig.color.name
                },
                price: currentConfig.model.price + currentConfig.audio.price + currentConfig.battery.price + currentConfig.color.price
            };
            
            cart.push(item);
            saveCartToStorage();
            updateCartUI();
            
            // Show success animation
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

        function updateCartUI() {
            const cartItemsContainer = document.getElementById('cartItems');
            const cartBadge = document.getElementById('cartBadge');
            const cartTotal = document.getElementById('cartTotalPrice');
            
            // Update badge
            cartBadge.textContent = cart.length;
            cartBadge.style.display = cart.length > 0 ? 'flex' : 'none';
            
            // Update cart items
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
                            <div class="cart-item-config">${item.config.audio || item.config.camera} • ${item.config.battery} • ${item.config.color}</div>
                            <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                        </div>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                `).join('');
            }
            
            // Update total
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
                        <div class="bill-item-details">${item.config.audio || item.config.camera} • ${item.config.battery} • ${item.config.color}</div>
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
            
            // Clear cart after generating bill
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
