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
                name: "SkyHawk X1",
                price: 6999,
                tagline: "The Perfect Start",
                badge: "CONSUMER",
                badgeClass: "badge-consumer",
                image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&h=600&fit=crop",
                specs: {
                    speed: "45 km/h",
                    flight: "28 min",
                    camera: "4K"
                }
            },
            {
                id: 2,
                name: "Phantom Pro",
                price: 12999,
                tagline: "Professional Grade",
                badge: "PROFESSIONAL",
                badgeClass: "badge-professional",
                image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop",
                specs: {
                    speed: "68 km/h",
                    flight: "42 min",
                    camera: "6K"
                }
            },
            {
                id: 3,
                name: "Mavic Ultra",
                price: 24999,
                tagline: "Beyond Limits",
                badge: "PROFESSIONAL",
                badgeClass: "badge-professional",
                image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&h=600&fit=crop",
                specs: {
                    speed: "85 km/h",
                    flight: "55 min",
                    camera: "8K"
                }
            },
            {
                id: 4,
                name: "Spark Mini",
                price: 3499,
                tagline: "Compact Adventure",
                badge: "CONSUMER",
                badgeClass: "badge-consumer",
                image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&h=600&fit=crop",
                specs: {
                    speed: "35 km/h",
                    flight: "20 min",
                    camera: "2.7K"
                }
            },
            {
                id: 5,
                name: "FPV Racer",
                price: 15999,
                tagline: "Racing Performance",
                badge: "PROFESSIONAL",
                badgeClass: "badge-professional",
                image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&h=600&fit=crop",
                specs: {
                    speed: "120 km/h",
                    flight: "18 min",
                    camera: "4K"
                }
            },
            {
                id: 6,
                name: "Inspire Titan",
                price: 45999,
                tagline: "Industrial Power",
                badge: "ENTERPRISE",
                badgeClass: "badge-enterprise",
                image: "drone1.jfif",
                specs: {
                    speed: "60 km/h",
                    flight: "90 min",
                    camera: "12K"
                }
            },
            {
                id: 7,
                name: "Tello Nano",
                price: 1999,
                tagline: "Pocket Explorer",
                badge: "CONSUMER",
                badgeClass: "badge-consumer",
                image: "drone2.jpg",
                specs: {
                    speed: "25 km/h",
                    flight: "15 min",
                    camera: "1080p"
                }
            },
            {
                id: 8,
                name: "Matrice Sentinel",
                price: 74999,
                tagline: "Security Excellence",
                badge: "ENTERPRISE",
                badgeClass: "badge-enterprise",
                image: "drone3.jpeg",
                specs: {
                    speed: "75 km/h",
                    flight: "120 min",
                    camera: "8K+ IR"
                }
            }
        ];

        // Configuration Options
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

        // Configuration State
        let currentConfig = {
            drone: null,
            camera: null,
            battery: null,
            color: null
        };

        let configHistory = [];

        // Page Navigation
        function showPage(page) {
            document.getElementById('homePage').classList.remove('active');
            document.getElementById('configurePage').classList.remove('active');
            
            if (page === 'home') {
                document.getElementById('homePage').classList.add('active');
            } else if (page === 'configure') {
                document.getElementById('configurePage').classList.add('active');
            }
        }

        // Load Drones on Page Load
        document.addEventListener('DOMContentLoaded', function() {
            loadDrones();
            initializeConfigurator();
            
            // Highlight Models in navbar on page load
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.textContent.trim() === 'Models') {
                    link.classList.add('active');
                }
            });
        });

        // Load Drones
        function loadDrones() {
            const grid = document.getElementById('dronesGrid');
            grid.innerHTML = '';
            
            drones.forEach(drone => {
                const card = createDroneCard(drone);
                grid.innerHTML += card;
            });

            wireFavoriteButtons();
        }

        // Create Drone Card HTML
        function createDroneCard(drone) {
            return `
                <div class="col-lg-4 col-md-6">
                    <div class="drone-card">
                        <div class="card-image-container">
                            <div class="card-actions">
                                <button class="action-btn favorite-btn" data-product-type="drone" data-product-id="${drone.id}" aria-label="Toggle favorite">
                                    <i class="bi bi-heart"></i>
                                </button>
                            </div>
                            <img src="${drone.image}" alt="${drone.name}">
                        </div>
                        <div class="card-body">
                            <h3 class="drone-name">${drone.name}</h3>
                            <div class="drone-price">₹${drone.price.toLocaleString('en-IN')}</div>
                            <p class="drone-tagline">${drone.tagline}</p>
                            <div class="specs-grid">
                                <div class="spec-item">
                                    <span class="spec-value">${drone.specs.speed.split(' ')[0]}</span>
                                    <span class="spec-label">${drone.specs.speed.split(' ')[1]} Speed</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-value">${drone.specs.flight.split(' ')[0]}</span>
                                    <span class="spec-label">${drone.specs.flight.split(' ')[1]} Flight</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-value">${drone.specs.camera}</span>
                                    <span class="spec-label">Camera</span>
                                </div>
                            </div>
                            <button class="btn-configure" onclick="configureDrone(${drone.id})">
                                Configure <i class="fas fa-arrow-right ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        function wireFavoriteButtons() {
            if (!window.AeronixSession) {
                return;
            }

            document.querySelectorAll('.favorite-btn[data-product-type="drone"]').forEach((button) => {
                const droneId = Number(button.dataset.productId);
                window.AeronixSession.registerFavoriteButton(button, () => {
                    const drone = drones.find(d => d.id === droneId);
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

        // Configure Drone
        function configureDrone(droneId) {
            const drone = drones.find(d => d.id === droneId);
            if (drone) {
                showPage('configure');
                selectModel(drone);
                loadModels(droneId);
                
                // Highlight Configure in navbar
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelectorAll('.nav-link').forEach(link => {
                    if (link.textContent.trim() === 'Configure') {
                        link.classList.add('active');
                    }
                });
            }
        }

        // Initialize Configurator
        function initializeConfigurator() {
            loadModels(1);
            loadCameraOptions();
            loadBatteryOptions();
            loadColorOptions();
            
            selectModel(drones[0]);
            selectCamera(configOptions.cameras[0]);
            selectBattery(configOptions.batteries[0]);
            selectColor(configOptions.colors[0]);
        }

        // Load Models - Show only the current selected model
        function loadModels(selectedId) {
            const grid = document.getElementById('modelGrid');
            grid.innerHTML = '';

            const selectedDrone = drones.find(d => d.id === selectedId);
            if (selectedDrone) {
                const modelCard = `
                    <div class="model-option selected">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <div class="model-name">${selectedDrone.name}</div>
                                <div class="model-price">₹${selectedDrone.price.toLocaleString('en-IN')}</div>
                            </div>
                            <i class="fas fa-check text-warning fs-4"></i>
                        </div>
                    </div>
                `;
                grid.innerHTML = modelCard;
            }
        }

        // Load Camera Options
        function loadCameraOptions() {
            const container = document.getElementById('cameraOptions');
            container.innerHTML = '';
            
            configOptions.cameras.forEach((camera, index) => {
                const isSelected = index === 0;
                const optionCard = `
                    <div class="option-card ${isSelected ? 'selected' : ''}" onclick="selectCameraById(${camera.id})">
                        <div class="option-info">
                            <div class="option-radio"></div>
                            <div class="option-details">
                                <h6>${camera.name}</h6>
                            </div>
                        </div>
                        <div class="option-price">
                            ${camera.included ? '<span class="price-included">Included</span>' : '<span class="price-add">+₹' + camera.price.toLocaleString('en-IN') + '</span>'}
                        </div>
                    </div>
                `;
                container.innerHTML += optionCard;
            });
        }

        // Load Battery Options
        function loadBatteryOptions() {
            const container = document.getElementById('batteryOptions');
            container.innerHTML = '';
            
            configOptions.batteries.forEach((battery, index) => {
                const isSelected = index === 0;
                const optionCard = `
                    <div class="option-card ${isSelected ? 'selected' : ''}" onclick="selectBatteryById(${battery.id})">
                        <div class="option-info">
                            <div class="option-radio"></div>
                            <div class="option-details">
                                <h6>${battery.name}</h6>
                            </div>
                        </div>
                        <div class="option-price">
                            ${battery.included ? '<span class="price-included">Included</span>' : '<span class="price-add">+₹' + battery.price.toLocaleString('en-IN') + '</span>'}
                        </div>
                    </div>
                `;
                container.innerHTML += optionCard;
            });
        }

        // Load Color Options
        function loadColorOptions() {
            const container = document.getElementById('colorOptions');
            container.innerHTML = '';
            
            configOptions.colors.forEach((color, index) => {
                const isSelected = index === 0;
                const colorCard = `
                    <div class="color-option ${isSelected ? 'selected' : ''}" onclick="selectColorById(${color.id})">
                        <div class="color-circle" data-color="${color.hex}"></div>
                        <div class="color-name">${color.name}</div>
                        <div class="color-price">${color.price === 0 ? 'Free' : '+₹' + color.price.toLocaleString('en-IN')}</div>
                    </div>
                `;
                container.innerHTML += colorCard;
            });

            applyColorSwatches(container);
        }

        function applyColorSwatches(scope) {
            scope.querySelectorAll('.color-circle[data-color]').forEach((el) => {
                el.style.backgroundColor = el.dataset.color;
            });
        }

        // Select Model by ID
        function selectModelById(id) {
            const drone = drones.find(d => d.id === id);
            if (drone) {
                selectModel(drone);
                document.querySelectorAll('.model-option').forEach(el => el.classList.remove('selected'));
                event.currentTarget.classList.add('selected');
            }
        }

        // Select Model
        function selectModel(drone) {
            saveToHistory();
            currentConfig.drone = drone;
            document.getElementById('previewImage').src = drone.image;
            document.getElementById('summaryModel').textContent = `${drone.name} - ₹${drone.price.toLocaleString('en-IN')}`;
            updateTotal();
        }

        // Select Camera by ID
        function selectCameraById(id) {
            const camera = configOptions.cameras.find(c => c.id === id);
            if (camera) {
                selectCamera(camera);
                document.querySelectorAll('#cameraOptions .option-card').forEach(el => el.classList.remove('selected'));
                event.currentTarget.classList.add('selected');
            }
        }

        // Select Camera
        function selectCamera(camera) {
            saveToHistory();
            currentConfig.camera = camera;
            document.getElementById('summaryCamera').textContent = camera.name;
            updateTotal();
        }

        // Select Battery by ID
        function selectBatteryById(id) {
            const battery = configOptions.batteries.find(b => b.id === id);
            if (battery) {
                selectBattery(battery);
                document.querySelectorAll('#batteryOptions .option-card').forEach(el => el.classList.remove('selected'));
                event.currentTarget.classList.add('selected');
            }
        }

        // Select Battery
        function selectBattery(battery) {
            saveToHistory();
            currentConfig.battery = battery;
            document.getElementById('summaryBattery').textContent = battery.name;
            updateTotal();
        }

        // Select Color by ID
        function selectColorById(id) {
            const color = configOptions.colors.find(c => c.id === id);
            if (color) {
                selectColor(color);
                document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
                event.currentTarget.classList.add('selected');
            }
        }

        // Select Color
        function selectColor(color) {
            saveToHistory();
            currentConfig.color = color;
            document.getElementById('summaryColor').textContent = color.name;
            updateTotal();
            
            // Apply color overlay to preview image
            const imageContainer = document.querySelector('.preview-image-container');
            if (imageContainer) {
                imageContainer.style.setProperty('--selected-color', color.hex);
                
                // Remove all color classes
                imageContainer.classList.remove('color-black', 'color-white');
                
                // Add specific class for black/white colors for better effect
                if (color.name.toLowerCase().includes('black')) {
                    imageContainer.classList.add('color-black');
                } else if (color.name.toLowerCase().includes('white')) {
                    imageContainer.classList.add('color-white');
                }
            }
        }

        // Update Total Price
        function updateTotal() {
            let total = 0;
            
            if (currentConfig.drone) total += currentConfig.drone.price;
            if (currentConfig.camera) total += currentConfig.camera.price;
            if (currentConfig.battery) total += currentConfig.battery.price;
            if (currentConfig.color) total += currentConfig.color.price;
            
            document.getElementById('previewPrice').textContent = '₹' + total.toLocaleString('en-IN');
            document.getElementById('summaryTotal').textContent = '₹' + total.toLocaleString('en-IN');
        }

        // Save to History
        function saveToHistory() {
            configHistory.push(JSON.parse(JSON.stringify(currentConfig)));
            if (configHistory.length > 10) {
                configHistory.shift();
            }
        }

        // Undo Configuration
        function undoConfig() {
            if (configHistory.length > 0) {
                currentConfig = configHistory.pop();
                
                if (currentConfig.drone) {
                    document.getElementById('previewImage').src = currentConfig.drone.image;
                    document.getElementById('summaryModel').textContent = `${currentConfig.drone.name} - ₹${currentConfig.drone.price.toLocaleString('en-IN')}`;
                }
                
                if (currentConfig.camera) {
                    document.getElementById('summaryCamera').textContent = currentConfig.camera.name;
                }
                
                if (currentConfig.battery) {
                    document.getElementById('summaryBattery').textContent = currentConfig.battery.name;
                }
                
                if (currentConfig.color) {
                    document.getElementById('summaryColor').textContent = currentConfig.color.name;
                }
                
                updateTotal();
            }
        }

        // Reset Configuration
        function resetConfig() {
            selectModel(drones[0]);
            selectCamera(configOptions.cameras[0]);
            selectBattery(configOptions.batteries[0]);
            selectColor(configOptions.colors[0]);
            
            document.querySelectorAll('.model-option').forEach((el, index) => {
                el.classList.toggle('selected', index === 0);
            });
            
            document.querySelectorAll('#cameraOptions .option-card').forEach((el, index) => {
                el.classList.toggle('selected', index === 0);
            });
            
            document.querySelectorAll('#batteryOptions .option-card').forEach((el, index) => {
                el.classList.toggle('selected', index === 0);
            });
            
            document.querySelectorAll('.color-option').forEach((el, index) => {
                el.classList.toggle('selected', index === 0);
            });
            
            configHistory = [];
        }

        // Save Configuration
        function saveConfig() {
            addToCart();
        }

        // Shopping Cart Functionality
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

        function addToCart() {
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
            notification.innerHTML = `<i class="fas fa-check-circle"></i> ${name} added to cart!`;
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
                        <i class="fas fa-shopping-cart"></i>
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
                            <i class="fas fa-times"></i>
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

        // Initialize cart on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadCartFromStorage();
            updateCartUI();
        });

        // Calculate Total
        function calculateTotal() {
            let total = 0;
            if (currentConfig.drone) total += currentConfig.drone.price;
            if (currentConfig.camera) total += currentConfig.camera.price;
            if (currentConfig.battery) total += currentConfig.battery.price;
            if (currentConfig.color) total += currentConfig.color.price;
            return total;
        }
