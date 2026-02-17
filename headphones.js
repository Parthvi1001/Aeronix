// Product Data
        const products = [
            {
                id: 1,
                name: "Aeronix Rockerz 450",
                subtitle: "Adaptive ANC Commuter",
                price: 2499,
                badge: "CONSUMER",
                specs: {
                    battery: "20h",
                    audio: "HD",
                    anc: "Basic"
                },
                image: "assets/headphones-1.jpg.jpeg"
            },
            {
                id: 2,
                name: "Aeronix Tune 770NC",
                subtitle: "Studio Tuned Precision",
                price: 4599,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "30h",
                    audio: "Hi-Res",
                    anc: "Advanced"
                },
                image: "assets/headphones-2.jpg.jpeg"
            },
            {
                id: 3,
                name: "Aeronix Horizon X",
                subtitle: "Flagship Wireless Suite",
                price: 7499,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "40h",
                    audio: "Studio",
                    anc: "Adaptive"
                },
                image: "assets/headphones-3.jpg.jpeg"

            },
            {
                id: 4,
                name: "Aeronix Studio H1",
                subtitle: "Mastering Reference",
                price: 10999,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "50h",
                    audio: "Master",
                    anc: "Premium"
                },
                image: "assets/headphones-4.jpg.jpeg"
            },
            {
                id: 5,
                name: "Aeronix Thunder",
                subtitle: "Immersive Gaming",
                price: 1699,
                badge: "CONSUMER",
                specs: {
                    battery: "15h",
                    audio: "Clear",
                    anc: "Passive"
                },
                image: "assets/headphones-5.jpg.jpeg"
            },
            {
                id: 6,
                name: "Aeronix Nova Wave",
                subtitle: "Lifestyle Wireless",
                price: 3299,
                badge: "CONSUMER",
                specs: {
                    battery: "25h",
                    audio: "7.1",
                    anc: "Game"
                },
                image: "assets/headphones-6.jpg.jpeg"
            },
            {
                id: 7,
                name: "Aeronix Sonic Lux",
                subtitle: "Premium Noise Shield",
                price: 1999,
                badge: "CONSUMER",
                specs: {
                    battery: "18h",
                    audio: "Bass+",
                    anc: "Wind"
                },
                image: "assets/headphones-7.jpg.jpeg"
            },
            {
                id: 8,
                name: "Aeronix Quantum Pro",
                subtitle: "Producer's Choice",
                price: 5999,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "35h",
                    audio: "Ref",
                    anc: "Studio"
                },
                image: "assets/headphones-8.jpg.jpeg"
            }
        ];

        const models = [
            { name: "Aeronix Rockerz 450", price: 2499 },
            { name: "Aeronix Tune 770NC", price: 4599 },
            { name: "Aeronix Horizon X", price: 7499 },
            { name: "Aeronix Studio H1", price: 10999 },
            { name: "Aeronix Thunder", price: 1699 },
            { name: "Aeronix Nova Wave", price: 3299 },
            { name: "Aeronix Sonic Lux", price: 1999 },
            { name: "Aeronix Quantum Pro", price: 5999 }
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

        let currentConfig = {
            model: models[0],
            audio: audioOptions[0],
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

        function updateSummary() {
            document.getElementById('summaryModel').textContent =
                `${currentConfig.model.name} - ₹${currentConfig.model.price.toLocaleString('en-IN')}`;

            document.getElementById('summaryAudio').textContent = currentConfig.audio.name;
            document.getElementById('summaryBattery').textContent = currentConfig.battery.name;

            const total = currentConfig.model.price +
                         currentConfig.audio.price +
                         currentConfig.battery.price;

            document.getElementById('summaryTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
        }

        function resetConfiguration() {
            currentConfig = {
                model: models[0],
                audio: audioOptions[0],
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


        function addToCart() {
            const item = {
                id: Date.now(),
                type: 'Headphones',
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
            
            // Show success animation
            showAddedToCartNotification(item.name);
            openCart();
        }

