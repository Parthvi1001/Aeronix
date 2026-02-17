// Product Data
        const products = [
            {
                id: 1,
                name: "Aeronix Buds 4v ANC",
                subtitle: "Hybrid ANC Daily Driver",
                price: 1299,
                badge: "CONSUMER",
                specs: {
                    battery: "24h",
                    audio: "AAC",
                    anc: "Basic"
                },
                info: "Perfect for daily use with comfortable fit and reliable connectivity. Features clear sound and decent battery life for all-day listening.",
                image: "assets/earbuds-1.jpeg"
            },
            {
                id: 2,
                name: "Aeronix Nord Buds 2r True",
                subtitle: "Balanced Soundstage",
                price: 2499,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "30h",
                    audio: "LDAC",
                    anc: "Active"
                },
                info: "Professional-grade audio with adaptive ANC and transparency mode. Spatial audio support and premium drivers deliver exceptional sound quality.",
                image: "assets/earbuds-2.jpg.jpeg"
            },
            {
                id: 3,
                name: "Aeronix Buds 3 Pro",
                subtitle: "Flagship Spatial Audio",
                price: 3499,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "36h",
                    audio: "Hi-Res",
                    anc: "Adaptive"
                },
                info: "Flagship model with adaptive ANC, lossless audio codec support, and premium materials. Features personalized sound profiles and multi-device connectivity.",
                image: "assets/earbuds-3.jpg.jpeg"
            },
            {
                id: 4,
                name: "Aeronix Wireless Buds 3 TWS",
                subtitle: "Ultra-Low Latency",
                price: 4499,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "40h",
                    audio: "Studio",
                    anc: "Premium"
                },
                info: "Ultimate audio experience with custom-tuned drivers and professional-grade components. Perfect for audiophiles demanding studio-quality wireless audio.",
                image: "assets/earbuds-4.jpg.jpeg"
            },
            {
                id: 5,
                name: "Aeronix Dual Mic Z2",
                subtitle: "Clear Call Control",
                price: 1799,
                badge: "CONSUMER",
                specs: {
                    battery: "28h",
                    audio: "Bass+",
                    anc: "Wind"
                },
                info: "IPX7 waterproof rating with secure fit wings for intense workouts. Enhanced bass response and ambient sound mode keep you aware during outdoor activities.",
                image: "assets/earbuds-5.jpg.jpeg"
            },
            {
                id: 6,
                name: "Aeronix Echo Pods X",
                subtitle: "Featherlight Essentials",
                price: 999,
                badge: "CONSUMER",
                specs: {
                    battery: "20h",
                    audio: "Clear",
                    anc: "Passive"
                },
                info: "Ultra-lightweight and compact design fits perfectly in any ear. Great for commuting with reliable Bluetooth 5.3 connectivity and quick charging support.",
                image: "assets/earbuds-6.jpg.jpeg"
            },
            {
                id: 7,
                name: "Aeronix Pulse Air S",
                subtitle: "Fitness Secure Fit",
                price: 1999,
                badge: "CONSUMER",
                specs: {
                    battery: "32h",
                    audio: "7.1",
                    anc: "Game"
                },
                info: "Ultra-low latency mode (60ms) for competitive gaming. Dual connection support lets you use both PC and mobile simultaneously with no lag.",
                image: "assets/earbuds-7.jpg.jpeg"
            },
            {
                id: 8,
                name: "Aeronix Quantum Beat",
                subtitle: "Studio Reference",
                price: 2999,
                badge: "PRO",
                badgeClass: "pro",
                specs: {
                    battery: "35h",
                    audio: "Ref",
                    anc: "Studio"
                },
                info: "Flat frequency response for accurate mixing and monitoring. Used by audio professionals for critical listening with exceptional detail and clarity.",
                image: "assets/earbuds-8.jpg.jpeg"
            }
        ];

        const models = [
            { name: "Aeronix Buds 4v ANC", price: 1299 },
            { name: "Aeronix Nord Buds 2r True", price: 2499 },
            { name: "Aeronix Buds 3 Pro", price: 3499 },
            { name: "Aeronix Wireless Buds 3 TWS", price: 4499 },
            { name: "Aeronix Dual Mic Z2", price: 1799 },
            { name: "Aeronix Echo Pods X", price: 999 },
            { name: "Aeronix Pulse Air S", price: 1999 },
            { name: "Aeronix Quantum Beat", price: 2999 }
        ];

        const audioOptions = [
            { name: "Standard AAC", detail: "High-quality wireless audio", price: 0, included: true },
            { name: "LDAC Codec", detail: "3x higher quality streaming", price: 299 },
            { name: "Hi-Res Audio", detail: "Lossless wireless transmission", price: 599 }
        ];

        const batteryOptions = [
            { name: "Standard (24h)", price: 0, included: true },
            { name: "Extended (36h)", price: 349 },
            { name: "Ultra (48h)", price: 599 }
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
                                <button class="action-btn favorite-btn" data-product-type="earbud" data-product-id="${product.id}" aria-label="Toggle favorite"><i class="bi bi-heart"></i></button>
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
        document.addEventListener('DOMContentLoaded', function () {
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

            document.querySelectorAll('.favorite-btn[data-product-type="earbud"]').forEach((button) => {
                const productId = Number(button.dataset.productId);
                window.AeronixSession.registerFavoriteButton(button, () => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;
                    return {
                        id: product.id,
                        type: 'earbud',
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
                type: 'Earbuds',
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

