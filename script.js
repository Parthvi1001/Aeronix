// PRODUCT DATA (JSON)
const productsData = [
    {
        id: 1,
        name: "SkyX Pro Drone",
        category: "drone",
        feature: "8K Cinematic Camera",
        price: "$1299",
        tags: ["8K HDR", "GPS Lock", "Carbon Build"],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400"
    },
    {
        id: 2,
        name: "Falcon Mini",
        category: "drone",
        feature: "Ultra Portable Design",
        price: "$799",
        tags: ["Foldable", "45min Flight", "Smart Return"],
        image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=400"
    },
    {
        id: 3,
        name: "Sound Pro Headphones",
        category: "headphones",
        feature: "Active Noise Cancellation",
        price: "$349",
        tags: ["ANC", "Studio Tuned", "USB-C"],
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 4,
        name: "Bass X Headphones",
        category: "headphones",
        feature: "Deep Bass Technology",
        price: "$279",
        tags: ["Deep Bass", "40H Play", "Comfort Fit"],
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"
    },
    {
        id: 5,
        name: "AirFlow TWS",
        category: "tws",
        feature: "30Hr Battery Life",
        price: "$199",
        tags: ["30H Battery", "IPX4", "Transparency"],
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400"
    },
    {
        id: 6,
        name: "Sonic Buds Pro",
        category: "tws",
        feature: "Spatial Audio",
        price: "$249",
        tags: ["Spatial", "Wireless Charge", "Wind Guard"],
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400"
    },
    {
        id: 7,
        name: "Storm Racer Drone",
        category: "drone",
        feature: "120 kph Sport Mode",
        price: "$999",
        tags: ["Sport", "Obstacle Avoid", "4K/120"],
        image: "https://images.unsplash.com/photo-1523966211575-eb4a6b8e0f6b?w=400"
    },
    {
        id: 8,
        name: "Arc Pulse Headphones",
        category: "headphones",
        feature: "Adaptive EQ + LDAC",
        price: "$399",
        tags: ["Hi-Res", "Adaptive EQ", "LDAC"],
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400"
    },
    {
        id: 9,
        name: "Nova Air TWS",
        category: "tws",
        feature: "Featherweight Fit",
        price: "$179",
        tags: ["Feather", "Dual Pair", "Low Latency"],
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
    }
];

// THEME TOGGLE
const themeToggleBtn = document.getElementById('themeToggle');
const bodyElement = document.body;

function applyTheme(theme) {
    const isLight = theme === 'light';
    bodyElement.classList.toggle('light-mode', isLight);
    themeToggleBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('aeronixTheme', theme);
}

const savedTheme = localStorage.getItem('aeronixTheme') || 'dark';
applyTheme(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const nextTheme = bodyElement.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(nextTheme);
});

// Cart Array
let cart = JSON.parse(localStorage.getItem('aeronixCart')) || [];

// Update cart count
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
    localStorage.setItem('aeronixCart', JSON.stringify(cart));
}

// Render Products
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = productsData.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-tags">
                            ${(product.tags || []).map(tag => `<span class="product-tag">${tag}</span>`).join('')}
                        </div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-feature">${product.feature}</p>
                        <p class="product-price">${product.price}</p>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();

    // Visual feedback
    const btn = event.target.closest('.add-to-cart');
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    btn.style.background = '#10b981';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
        btn.style.background = '';
    }, 1500);
}

// Video Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.video-slide');
const videos = document.querySelectorAll('.hero-video');

function nextSlide() {
    // Pause current video
    const currentVideo = slides[currentSlide].querySelector('.hero-video');
    if (currentVideo) {
        currentVideo.pause();
    }

    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');

    // Play new video
    const newVideo = slides[currentSlide].querySelector('.hero-video');
    if (newVideo) {
        newVideo.currentTime = 0;
        newVideo.play().catch(e => console.log('Video play failed:', e));
    }
}

// Auto advance every 5 seconds
setInterval(nextSlide, 5000);

// Play first video on load
window.addEventListener('load', () => {
    const firstVideo = slides[0].querySelector('.hero-video');
    if (firstVideo) {
        firstVideo.play().catch(e => console.log('Video autoplay failed:', e));
    }
});

// Horizontal Drone Scroll
// window.addEventListener('scroll', () => {
//     const section = document.querySelector('.horizontal-section');
//     const container = document.querySelector('.drone-container');

//     if (!section || !container) return;

//     const sectionTop = section.offsetTop;
//     const sectionHeight = section.offsetHeight;
//     const scrollPos = window.scrollY;

//     const drone1 = document.getElementById('drone1');
//     const drone2 = document.getElementById('drone2');

//     if (scrollPos > sectionTop && scrollPos < sectionTop + sectionHeight) {
//         const progress = (scrollPos - sectionTop) / sectionHeight;

//         // First drone moves left and fades
//         drone1.style.transform = `translateX(${-progress * 150}%)`;
//         drone1.style.opacity = 1 - progress * 2;

//         // Second drone enters from right
//         drone2.style.transform = `translateX(${100 - progress * 150}%)`;
//         drone2.style.opacity = (progress - 0.3) * 2;
//     }
// });

// const canvas = document.getElementById("droneCanvas");
// const ctx = canvas.getContext("2d");

// const frameCount = 150;
// const images = [];
// const img = new Image();

// canvas.width = 600;
// canvas.height = 400;

// // preload frames_000001.png → frames_000150.png
// for (let i = 1; i <= frameCount; i++) {
//   const image = new Image();
//   image.src = `assets/frames/frame_${String(i).padStart(6, "0")}.png`;
//   images.push(image);
// }

// window.addEventListener("scroll", () => {
//   const section = document.querySelector(".horizontal-section");
//   const scrollY = window.scrollY;

//   const start = section.offsetTop;
//   const end = start + section.offsetHeight - window.innerHeight;

//   if (scrollY >= start && scrollY <= end) {
//     const progress = (scrollY - start) / (end - start);
//     const frameIndex = Math.min(
//       frameCount - 1,
//       Math.floor(progress * frameCount)
//     );

//     const xMove = progress * 250; // horizontal movement

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(images[frameIndex], xMove, 0, canvas.width, canvas.height);
//   }
// });

const frameCount = 150;

function setupDrone(canvasId, wrapperId, direction) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const wrapper = document.getElementById(wrapperId);

  canvas.width = 600;
  canvas.height = 400;

  const images = [];
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `assets/frames/frame_${String(i).padStart(6, "0")}.png`;
    images.push(img);
  }

  return { canvas, ctx, images, wrapper, direction };
}

const drone1 = setupDrone("canvasOne", "droneOne", -1); // LEFT
const drone2 = setupDrone("canvasTwo", "droneTwo", -1);  // LEFT

window.addEventListener("scroll", () => {
  const section = document.querySelector(".horizontal-section");
  const scrollY = window.scrollY;
  const start = section.offsetTop;
  const end = start + section.offsetHeight - window.innerHeight;
  const totalProgress = (scrollY - start) / (end - start);

  // ---- DRONE 1 ----
  if (totalProgress >= 0 && totalProgress < 0.5) {
    const p = totalProgress / 0.5;
    drone1.wrapper.style.opacity = 1;
    drone2.wrapper.style.opacity = 0;

    const frame = Math.floor(p * (frameCount - 1));
    const x = drone1.direction * p * 250;

    drone1.ctx.clearRect(0, 0, 600, 400);
    drone1.ctx.drawImage(drone1.images[frame], x, 0, 600, 400);
  }

  // ---- DRONE 2 ----
  if (totalProgress >= 0.5 && totalProgress <= 1) {
    const p = (totalProgress - 0.5) / 0.5;
    drone1.wrapper.style.opacity = 0;
    drone2.wrapper.style.opacity = 1;

    const frame = Math.floor(p * (frameCount - 1));
    const x = drone2.direction * p * 250;

    drone2.ctx.clearRect(0, 0, 600, 400);
    drone2.ctx.drawImage(drone2.images[frame], x, 0, 600, 400);
  }
});




// Superhero Animation
window.addEventListener('scroll', () => {
    const section = document.querySelector('.superhero-section');
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollPos = window.scrollY;

    if (scrollPos > sectionTop && scrollPos < sectionTop + sectionHeight) {
        const progress = (scrollPos - sectionTop) / sectionHeight;

        const superhero = document.getElementById('superhero');
        const airpod1 = document.getElementById('airpod1');
        const airpod2 = document.getElementById('airpod2');
        const heroText = document.getElementById('heroText');

        if (progress > 0.3) {
            superhero.classList.add('active');
        }

        if (progress > 0.5) {
            airpod1.classList.add('animate');
            airpod2.classList.add('animate');

            const flyProgress = (progress - 0.5) * 2;
            airpod1.style.left = `${10 + flyProgress * 35}%`;
            airpod1.style.top = `${20 + flyProgress * 25}%`;
            airpod1.style.transform = `rotate(${flyProgress * 360}deg) scale(${1 - flyProgress * 0.5})`;

            airpod2.style.right = `${10 - flyProgress * -35}%`;
            airpod2.style.top = `${20 + flyProgress * 25}%`;
            airpod2.style.transform = `rotate(${-flyProgress * 360}deg) scale(${1 - flyProgress * 0.5})`;
        }

        if (progress > 0.7) {
            heroText.classList.add('active');
        }
    }
});

// About Section Scroll Reveal
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate letters
            const title = document.getElementById('aboutTitle');
            const text = title.textContent;
            title.innerHTML = '';

            text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.className = 'letter';
                span.textContent = char;
                span.style.animationDelay = `${i * 0.1}s`;
                title.appendChild(span);
            });
        }
    });
}, { threshold: 0.3 });

aboutObserver.observe(document.getElementById('aboutContent'));

// Contact Section Reveal
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

contactObserver.observe(document.getElementById('contactSection'));

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    // Store in sessionStorage
    const contacts = JSON.parse(sessionStorage.getItem('contacts') || '[]');
    contacts.push(formData);
    sessionStorage.setItem('contacts', JSON.stringify(contacts));

    alert('Message sent successfully! We\'ll get back to you soon.');
    e.target.reset();
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize
renderProducts();
updateCartCount();

// Store recently viewed products in sessionStorage
sessionStorage.setItem('lastVisited', new Date().toISOString());