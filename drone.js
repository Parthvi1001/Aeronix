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
                name: "SkyX Pro Drone",
                subtitle: "Cinematic Flagship",
                price: 6999,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "45 min",
                    camera: "8K",
                    range: "12 km"
                },
                image: "drone1.jpg"
            },
            {
                id: 2,
                name: "Falcon Mini",
                subtitle: "Ultra Portable",
                price: 4699,
                badge: "CONSUMER",
                specs: {
                    battery: "35 min",
                    camera: "4K",
                    range: "8 km"
                },
                image: "drone2.jpg"
            },
            {
                id: 3,
                name: "Storm Racer",
                subtitle: "Sport Performance",
                price: 5799,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "30 min",
                    camera: "4K/120",
                    range: "6 km"
                },
                image: "drone3.jpeg"
            },
            {
                id: 4,
                name: "Atlas Mapper",
                subtitle: "Survey Grade",
                price: 8999,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "55 min",
                    camera: "6K",
                    range: "15 km"
                },
                image: "hdrone.jpg"
            },
            {
                id: 5,
                name: "Nimbus Air",
                subtitle: "Everyday Pilot",
                price: 3199,
                badge: "CONSUMER",
                specs: {
                    battery: "28 min",
                    camera: "2.7K",
                    range: "5 km"
                },
                image: "drone.jfif"
            },
            {
                id: 6,
                name: "Terra Scout",
                subtitle: "Explorer Edition",
                price: 6399,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "40 min",
                    camera: "5K",
                    range: "10 km"
                },
                image: "drone1.jfif"
            },
            {
                id: 7,
                name: "Pulse FPV",
                subtitle: "Agile + Fast",
                price: 4299,
                badge: "CONSUMER",
                specs: {
                    battery: "25 min",
                    camera: "4K",
                    range: "4 km"
                },
                image: "droneWear.jpg"
            },
            {
                id: 8,
                name: "Horizon X8",
                subtitle: "Long Range",
                price: 7599,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "50 min",
                    camera: "6K",
                    range: "14 km"
                },
                image: "drone1.jpg"
            }
        ];

        const models = [
            { name: "SkyX Pro Drone", price: 6999 },
            { name: "Falcon Mini", price: 4699 },
            { name: "Storm Racer", price: 5799 },
            { name: "Atlas Mapper", price: 8999 },
            { name: "Nimbus Air", price: 3199 },
            { name: "Terra Scout", price: 6399 },
            { name: "Pulse FPV", price: 4299 },
            { name: "Horizon X8", price: 7599 }
        ];

        const cameraOptions = [
            { name: "Standard 4K", detail: "4K/60fps", price: 0, included: true },
            { name: "Pro 6K", detail: "6K/60fps", price: 499 },
            { name: "Cinematic 8K", detail: "8K/30fps", price: 999 }
        ];

        const batteryOptions = [
            { name: "Standard (30 min)", price: 0, included: true },
            { name: "Extended (45 min)", price: 399 },
            { name: "Endurance (60 min)", price: 799 }
        ];

        let currentConfig = {
            model: models[0],
            camera: cameraOptions[0],
            battery: batteryOptions[0]
        };

        // Load Products
        function loadProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = products.map(product => `
                <div class="col-lg-4 col-md-6">
                    <div class="product-card">
                        <div class="product-image-container">
                            <div class="product-actions">
                                <button class="action-btn"><i class="bi bi-heart"></i></button>
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
                                    <span class="spec-value">${product.specs.camera}</span>
                                    <div class="spec-label">Camera</div>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-value">${product.specs.range}</span>
                                    <div class="spec-label">Range</div>
                                </div>
                            </div>
                            <button class="btn-configure" onclick="openConfigurator(${product.id})">
                                Configure <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
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
            document.getElementById('cameraOptions').innerHTML = cameraOptions.map((option, index) => `
                <div class="option-card ${currentConfig.camera.name === option.name ? 'selected' : ''}" 
                     onclick="selectCamera(${index})">
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

        }

        function selectModel(index) {
            currentConfig.model = models[index];
            loadConfigOptions();
            updateSummary();
        }

        function selectCamera(index) {
            currentConfig.camera = cameraOptions[index];
            loadConfigOptions();
            updateSummary();
        }

        function selectBattery(index) {
            currentConfig.battery = batteryOptions[index];
            loadConfigOptions();
            updateSummary();
        }

        function updateSummary() {
            document.getElementById('summaryModel').textContent =
                `${currentConfig.model.name} - ₹${currentConfig.model.price.toLocaleString('en-IN')}`;

            document.getElementById('summaryCamera').textContent = currentConfig.camera.name;
            document.getElementById('summaryBattery').textContent = currentConfig.battery.name;

            const total = currentConfig.model.price +
                         currentConfig.camera.price +
                         currentConfig.battery.price;

            document.getElementById('summaryTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
        }

        function resetConfiguration() {
            currentConfig = {
                model: models[0],
                camera: cameraOptions[0],
                battery: batteryOptions[0]
            };
            loadConfigOptions();
            updateSummary();
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
                name: currentConfig.model.name,
                image: document.getElementById('configProductImage').src,
                config: {
                    model: currentConfig.model.name,
                    camera: currentConfig.camera.name,
                    battery: currentConfig.battery.name
                },
                price: currentConfig.model.price + currentConfig.camera.price + currentConfig.battery.price
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
                            <div class="cart-item-config">${item.config.audio || item.config.camera} â€¢ ${item.config.battery}</div>
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
                        <div class="bill-item-details">${item.config.audio || item.config.camera} â€¢ ${item.config.battery}</div>
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
