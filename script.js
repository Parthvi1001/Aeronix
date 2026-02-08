
// NAVBAR CONTRAST DETECTION
function getUnderlyingElement(x, y) {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return document.elementFromPoint(x, y);
    const prev = navbar.style.pointerEvents;
    navbar.style.pointerEvents = 'none';
    const el = document.elementFromPoint(x, y);
    navbar.style.pointerEvents = prev;
    return el;
}

function rgbToLuminance(r, g, b) {
    // convert sRGB to linear
    const srgb = [r, g, b].map((v) => {
        v = v / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function resolveBackgroundColor(el) {
    while (el && el !== document.documentElement) {
        const style = getComputedStyle(el);
        const bg = style.backgroundColor;
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') return bg;
        el = el.parentElement;
    }
    return getComputedStyle(document.body).backgroundColor || 'rgb(255,255,255)';
}

function parseRGB(colorStr) {
    const m = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return [255,255,255];
    return [parseInt(m[1],10), parseInt(m[2],10), parseInt(m[3],10)];
}

function updateNavbarContrast() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // ================================
    // FORCE RULE-BASED NAVBAR COLORS
    // ================================

    // DARK MODE → always white
    if (!document.body.classList.contains('light-mode')) {
        navbar.classList.add('light-nav');
        return;
    }

    const hero = document.querySelector('.hero-section');
    const horizontal = document.querySelector('.horizontal-section');
    const tws = document.querySelector('.tws-scroll-section');

    if (hero && horizontal) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const horizontalTop = horizontal.getBoundingClientRect().top;

        // HERO → keep light background
        if (heroBottom > 80) {
            navbar.classList.add('light-nav');
            return;
        }

        // FROM HORIZONTAL SECTION ONWARD → keep light background static
        if (horizontalTop <= 80) {
            navbar.classList.add('light-nav');
            return;
        }
    }

    if (tws) {
        const twsTop = tws.getBoundingClientRect().top;
        const twsBottom = tws.getBoundingClientRect().bottom;

        if (twsTop <= 80 && twsBottom > 80) {
            navbar.classList.add('light-nav');
            return;
        }
    }

    // ================================
    // FALLBACK: AUTO CONTRAST DETECTION
    // ================================

    const mega = document.querySelector('.mega-menu');
    if (mega) {
        const megaStyle = getComputedStyle(mega);
        if (megaStyle.visibility === 'visible' || megaStyle.opacity > 0.1) {
            navbar.classList.add('light-nav');
            return;
        }
    }

    const rect = navbar.getBoundingClientRect();
    const x = Math.floor(window.innerWidth / 2);
    const y = Math.min(Math.floor(rect.bottom + 8), window.innerHeight - 1);

    const underlying = getUnderlyingElement(x, y) || document.body;
    const bg = resolveBackgroundColor(underlying);
    const [r, g, b] = parseRGB(bg);
    const lum = rgbToLuminance(r, g, b);

    if (lum > 0.5) {
        navbar.classList.add('light-nav');
    } else {
        navbar.classList.remove('light-nav');
    }
}


// Run on load, scroll, resize, and theme toggle
// window.addEventListener('load', updateNavbarContrast);
// window.addEventListener('scroll', updateNavbarContrast, { passive: true });
// window.addEventListener('resize', updateNavbarContrast);

// If theme toggle exists, run after toggling
// Theme toggle removed; navbar contrast updates rely on scroll/resize only.

// --- HERO TEXT CONTRAST FOR CAROUSEL SLIDES AND SECTIONS ---
function setHeroMode(mode) {
    const hero = document.querySelector('.hero-content');
    if (!hero) return;
    hero.classList.remove('on-dark-bg', 'on-light-bg');
    if (mode === 'dark') hero.classList.add('on-dark-bg');
    if (mode === 'light') hero.classList.add('on-light-bg');
}

// Listen to Bootstrap carousel events (uses slid.bs.carousel)
const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
    heroCarousel.addEventListener('slid.bs.carousel', (e) => {
        // Determine the active index
        const items = heroCarousel.querySelectorAll('.carousel-item');
        let activeIndex = 0;
        items.forEach((it, i) => { if (it.classList.contains('active')) activeIndex = i; });

        // third slide (index 2) -> dark background -> white text
        if (activeIndex === 2) {
            setHeroMode('dark');
        } else {
            // otherwise let section observer decide; default to light mode for readability
            setHeroMode('light');
        }
    });
}

// IntersectionObserver for sections below hero — detects background luminance
const sections = document.querySelectorAll('section');
if (sections.length) {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            // compute resolved bg color for this section
            const bg = resolveBackgroundColor(el);
            const [r,g,b] = parseRGB(bg);
            const lum = rgbToLuminance(r,g,b);
            // if section is light, ensure hero text becomes dark (for contrast)
            if (lum > 0.5) {
                setHeroMode('light');
            } else {
                setHeroMode('dark');
            }
        });
    }, { root: null, threshold: 0.45 });

    // Observe only sections after the hero to avoid immediate override
    let startObserving = false;
    sections.forEach((sec) => {
        if (startObserving) obs.observe(sec);
        if (sec.classList.contains('hero-section')) startObserving = true;
    });
}

// run once to initialize hero mode
window.addEventListener('load', () => {
    // set initial based on active slide
    if (heroCarousel) {
        const items = heroCarousel.querySelectorAll('.carousel-item');
        let activeIndex = 0;
        items.forEach((it, i) => { if (it.classList.contains('active')) activeIndex = i; });
        if (activeIndex === 2) setHeroMode('dark'); else setHeroMode('light');
    }
});
// PRODUCT DATA (JSON)
const productsData = [
    {
        id: 1,
        name: "SkyX Pro Drone",
        category: "drone",
        feature: "8K Cinematic Camera",
        price: "₹1,07,817",
        tags: ["8K HDR", "GPS Lock", "Carbon Build"],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400"
    },
    {
        id: 2,
        name: "Falcon Mini",
        category: "drone",
        feature: "Ultra Portable Design",
        price: "₹66,317",
        tags: ["Foldable", "45min Flight", "Smart Return"],
        image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=400"
    },
    {
        id: 3,
        name: "Sound Pro Headphones",
        category: "headphones",
        feature: "Active Noise Cancellation",
        price: "₹28,967",
        tags: ["ANC", "Studio Tuned", "USB-C"],
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 4,
        name: "Bass X Headphones",
        category: "headphones",
        feature: "Deep Bass Technology",
        price: "₹23,157",
        tags: ["Deep Bass", "40H Play", "Comfort Fit"],
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"
    },
    {
        id: 5,
        name: "AirFlow TWS",
        category: "tws",
        feature: "30Hr Battery Life",
        price: "₹16,517",
        tags: ["30H Battery", "IPX4", "Transparency"],
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400"
    },
    {
        id: 6,
        name: "Sonic Buds Pro",
        category: "tws",
        feature: "Spatial Audio",
        price: "₹20,667",
        tags: ["Spatial", "Wireless Charge", "Wind Guard"],
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400"
    },
    {
        id: 7,
        name: "Storm Racer Drone",
        category: "drone",
        feature: "120 kph Sport Mode",
        price: "₹82,917",
        tags: ["Sport", "Obstacle Avoid", "4K/120"],
        image: "https://images.unsplash.com/photo-1523966211575-eb4a6b8e0f6b?w=400"
    },
    {
        id: 8,
        name: "Arc Pulse Headphones",
        category: "headphones",
        feature: "Adaptive EQ + LDAC",
        price: "₹33,117",
        tags: ["Hi-Res", "Adaptive EQ", "LDAC"],
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400"
    },
    {
        id: 9,
        name: "Nova Air TWS",
        category: "tws",
        feature: "Featherweight Fit",
        price: "₹14,857",
        tags: ["Feather", "Dual Pair", "Low Latency"],
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
    }
];

let horizontalFinished = false;

document.body.classList.add('light-mode');

// Cart Array
let cart = JSON.parse(localStorage.getItem('aeronixCart')) || [];

// Update cart count
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return; // 🔥 prevents crash
  el.textContent = cart.length;
}



// Render Products
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return; // safeguard: avoid breaking subsequent scripts
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
        // newVideo.play().catch(e => console.log('Video play failed:', e));
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

const ASPECT_RATIO = 2 / 3;

// Setup a drone
function setupDrone(canvasId, framePath, frameCount) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.65;
  }
  resize();
  window.addEventListener("resize", resize);

  const images = [];
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `${framePath}${String(i).padStart(6, "0")}.png`;
    images.push(img);
  }

  return { canvas, ctx, images, frameCount };
}

// Init drones
const drone1 = setupDrone(
  "canvasOne",
  "assets/frames/drone1/frame_",
  150
);

const drone2 = setupDrone(
  "canvasTwo",
  "assets/frames/drone2/frame_",
  173
);

// Wrappers
const wrapper1 = document.getElementById("droneOne");
const wrapper2 = document.getElementById("droneTwo");

window.addEventListener("scroll", () => {
  const section = document.querySelector(".horizontal-section");

  const scrollY = window.scrollY;
  const start = section.offsetTop;
  const end = start + section.offsetHeight - window.innerHeight;

  // raw progress (do NOT clamp to 1 yet)
  let rawProgress = (scrollY - start) / (end - start);
  rawProgress = Math.max(0, rawProgress);

  // normalised progress (0 → 1)
  let progress = Math.min(rawProgress, 1);

  const vw = window.innerWidth;

  const droneWidth = Math.min(vw * 0.5, 650);
  const droneHeight = droneWidth * ASPECT_RATIO;

  const NAVBAR_OFFSET = 90;

  // =========================
  // DRONE 1 (0 → 50%)
  // =========================
  if (progress < 0.5) {
    wrapper1.style.display = "flex";
    wrapper2.style.display = "none";

    const p = progress / 0.5;

    const x =
      (vw - droneWidth) / 2 + p * (-vw * 0.8);

    const y =
      (drone1.canvas.height - droneHeight) / 2 -
      drone1.canvas.height * 0.04 +
      NAVBAR_OFFSET;

    const frame = Math.floor(
      p * (drone1.frameCount - 1)
    );

    drone1.ctx.clearRect(
      0,
      0,
      drone1.canvas.width,
      drone1.canvas.height
    );

    drone1.ctx.save();
    drone1.ctx.shadowColor = "rgba(0,0,0,0.3)";
    drone1.ctx.shadowBlur = 40;
    drone1.ctx.shadowOffsetY = 30;

    drone1.ctx.drawImage(
      drone1.images[frame],
      x,
      y,
      droneWidth,
      droneHeight
    );

    drone1.ctx.restore();
  }

  // =========================
  // DRONE 2 (50 → END)
  // =========================
  else {
    wrapper1.style.display = "none";
    wrapper2.style.display = "flex";

    let p = (rawProgress - 0.5) / 0.5;
p = Math.max(0, Math.min(1, p));

let x =
  (vw - droneWidth) / 2 + p * (-vw * 0.8);

// 🔥 STOP WHEN DRONE TOUCHES SCREEN WALL
if (x <= 0 && !horizontalFinished) {
  horizontalFinished = true;

  // lock drone exactly at wall
  x = 0;
  p = p; // keep current frame

  // 🔥 RELEASE STICKY → START VERTICAL SCROLL
  section.style.height = "200vh";
}


    // 🔥 STOP HORIZONTAL WHEN DRONE-2 EXITS
    if (x <= 0) {
      p = 1;              // lock animation
      x = 0;   // lock position
    }

    const y =
      (drone2.canvas.height - droneHeight) / 2 -
      drone2.canvas.height * 0.04 +
      NAVBAR_OFFSET;

    const frame = Math.floor(
      p * (drone2.frameCount - 1)
    );

    drone2.ctx.clearRect(
      0,
      0,
      drone2.canvas.width,
      drone2.canvas.height
    );

    drone2.ctx.save();
    drone2.ctx.shadowColor = "rgba(0,0,0,0.3)";
    drone2.ctx.shadowBlur = 40;
    drone2.ctx.shadowOffsetY = 30;

    drone2.ctx.drawImage(
      drone2.images[frame],
      x,
      y,
      droneWidth,
      droneHeight
    );

    drone2.ctx.restore();
  }
});



// window.addEventListener("scroll", () => {
//   const section = document.querySelector(".horizontal-section");

//   const scrollY = window.scrollY;
//   const start = section.offsetTop;
//   const end = start + section.offsetHeight - window.innerHeight;

//   const drone2FullyOut = x <= -droneWidth;

// //   let progress = (scrollY - start) / (end - start);
// //   progress = Math.max(0, Math.min(1, progress));

// let rawProgress = (scrollY - start) / (end - start);
// rawProgress = Math.max(0, rawProgress);



//   const vw = window.innerWidth;

//   const droneWidth = Math.min(vw * 0.5, 650);
//   const droneHeight = droneWidth * ASPECT_RATIO;

//   const NAVBAR_OFFSET = 90; // adjust if your navbar is taller




//   // =========================
//   // DRONE 1 (0 → 50%)
//   // =========================
//   if (progress < 0.5) {
//     wrapper1.style.display = "flex";
//     wrapper2.style.display = "none";

//     const p = progress / 0.5;

//     const x =
//       (vw - droneWidth) / 2 + p * (-vw * 0.8);

//     const y =
//   (drone1.canvas.height - droneHeight) / 2 -
//   drone1.canvas.height * 0.04 +
//   NAVBAR_OFFSET;


//     const frame = Math.floor(
//       p * (drone1.frameCount - 1)
//     );

//     drone1.ctx.clearRect(
//       0,
//       0,
//       drone1.canvas.width,
//       drone1.canvas.height
//     );

//     drone1.ctx.save();
//     drone1.ctx.shadowColor = "rgba(0,0,0,0.3)";
//     drone1.ctx.shadowBlur = 40;
//     drone1.ctx.shadowOffsetY = 30;

//     drone1.ctx.drawImage(
//       drone1.images[frame],
//       x,
//       y,
//       droneWidth,
//       droneHeight
//     );

//     drone1.ctx.restore();
//   }

//   // =========================
//   // DRONE 2 (50 → 100%)
//   // =========================
//   else {
//     wrapper1.style.display = "none";
//     wrapper2.style.display = "flex";

//     const p = (progress - 0.5) / 0.5;

//     const x =
//       (vw - droneWidth) / 2 + p * (-vw * 0.8);

//     const y =
//   (drone2.canvas.height - droneHeight) / 2 -
//   drone2.canvas.height * 0.04 +
//   NAVBAR_OFFSET;


//     const frame = Math.floor(
//       p * (drone2.frameCount - 1)
//     );

//     drone2.ctx.clearRect(
//       0,
//       0,
//       drone2.canvas.width,
//       drone2.canvas.height
//     );

//     drone2.ctx.save();
//     drone2.ctx.shadowColor = "rgba(0,0,0,0.3)";
//     drone2.ctx.shadowBlur = 40;
//     drone2.ctx.shadowOffsetY = 30;

//     drone2.ctx.drawImage(
//       drone2.images[frame],
//       x,
//       y,
//       droneWidth,
//       droneHeight
//     );

//     drone2.ctx.restore();
//   }
// });


// window.addEventListener("scroll", () => {
//   const section = document.querySelector(".horizontal-section");
//   if (!section) return;

//   const scrollY = window.scrollY;
//   const start = section.offsetTop;
//   const end = start + section.offsetHeight - window.innerHeight;

//   let progress = (scrollY - start) / (end - start);
//   progress = Math.max(0, Math.min(1, progress));

//   const vw = window.innerWidth;

//   const droneWidth = Math.min(vw * 0.45, 650);
//   const droneHeight = droneWidth * ASPECT_RATIO;

//   const centerX = (vw - droneWidth) / 2;

//   // --- Y positions (same height)
//   const y1 =
//     (drone1.canvas.height - droneHeight) / 2 -
//     drone1.canvas.height * 0.04;

//   const y2 =
//     (drone2.canvas.height - droneHeight) / 2 -
//     drone2.canvas.height * 0.04;

//   // --- Horizontal motion (Rivian style)
//   const x1 =
//     -droneWidth * 1.2 + progress * (centerX + droneWidth * 1.1);

//   const x2 =
//     vw - progress * (centerX + droneWidth * 1.1);

//   // --- Frames (each drone uses its own count)
//   const frame1 = Math.floor(progress * (drone1.frameCount - 1));
//   const frame2 = Math.floor(progress * (drone2.frameCount - 1));

//   // --- Clear canvases
//   drone1.ctx.clearRect(
//     0,
//     0,
//     drone1.canvas.width,
//     drone1.canvas.height
//   );

//   drone2.ctx.clearRect(
//     0,
//     0,
//     drone2.canvas.width,
//     drone2.canvas.height
//   );

//   // --- Draw Drone 1
//   drone1.ctx.save();
//   drone1.ctx.shadowColor = "rgba(0,0,0,0.35)";
//   drone1.ctx.shadowBlur = 50;
//   drone1.ctx.shadowOffsetY = 40;

//   drone1.ctx.drawImage(
//     drone1.images[frame1],
//     x1,
//     y1,
//     droneWidth,
//     droneHeight
//   );

//   drone1.ctx.restore();

//   // --- Draw Drone 2
//   drone2.ctx.save();
//   drone2.ctx.shadowColor = "rgba(0,0,0,0.35)";
//   drone2.ctx.shadowBlur = 50;
//   drone2.ctx.shadowOffsetY = 40;

//   drone2.ctx.drawImage(
//     drone2.images[frame2],
//     x2,
//     y2,
//     droneWidth,
//     droneHeight
//   );

//   drone2.ctx.restore();
// });





// // Spiderman Web-Slinging Animation - With Scroll Lock
// let animationComplete = false;
// let scrollLocked = false;

// window.addEventListener('scroll', () => {
//     const section = document.querySelector('.superhero-section');
//     if (!section) return;

//     const sectionTop = section.offsetTop;
//     const sectionBottom = sectionTop + section.offsetHeight;
//     const scrollPos = window.scrollY + window.innerHeight / 2;

//     // Check if we're in the spiderman section
//     if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
        
//         // If animation not complete, lock scroll and run animation
//         if (!animationComplete) {
//             handleSpidermanAnimation();
//         }
//     }
// });

// // Handle scroll wheel events for smooth control
// let wheelDelta = 0;
// const maxWheelDelta = 100;

// window.addEventListener('wheel', (e) => {
//     const section = document.querySelector('.superhero-section');
//     if (!section) return;

//     const sectionTop = section.offsetTop;
//     const sectionBottom = sectionTop + section.offsetHeight;
//     const scrollPos = window.scrollY + window.innerHeight / 2;

//     // If we're in the section and animation not complete
//     if (scrollPos >= sectionTop && scrollPos <= sectionBottom && !animationComplete) {
//         e.preventDefault();
        
//         // Accumulate wheel delta
//         if (e.deltaY > 0) {
//             wheelDelta = Math.min(wheelDelta + e.deltaY / 10, maxWheelDelta);
//         }
        
//         updateAnimation(wheelDelta / maxWheelDelta);
//     }
// }, { passive: false });

// function updateAnimation(progress) {
//     const spiderman = document.getElementById('spiderman');
//     const airpod1 = document.getElementById('airpod1');
//     const heroText = document.getElementById('heroText');
//     const webPath1 = document.getElementById('webPath1');

//     // Clamp progress between 0 and 1
//     progress = Math.max(0, Math.min(1, progress));

//     // Stage 1: Spiderman appears (0-0.15)
//     if (progress > 0.05) {
//         spiderman.classList.add('active');
//     }

//     // Stage 2: AirPod appears (0.15-0.25)
//     if (progress > 0.15) {
//         airpod1.classList.add('visible');
//     }

//     // Stage 3: Shoot web (0.3-0.4)
//     if (progress > 0.3) {
//         webPath1.classList.add('shooting');

//         // Calculate web path from Spiderman (top right) to AirPod (bottom left)
//         const spideyX = 85; // Right side
//         const spideyY = 25; // Top
//         const airpodStartX = 15; // Left side
//         const airpodStartY = 75; // Bottom

//         // Create curved path
//         const controlX = (spideyX + airpodStartX) / 2 - 10;
//         const controlY = (spideyY + airpodStartY) / 2;
//         webPath1.setAttribute('d', `M ${spideyX} ${spideyY} Q ${controlX} ${controlY}, ${airpodStartX} ${airpodStartY}`);
//     }

//     // Stage 4: Pull AirPod (0.4-0.9)
//     if (progress > 0.4 && progress <= 0.9) {
//         const pullProgress = (progress - 0.4) / 0.5;
//         const easePull = easeInOutCubic(pullProgress);

//         // Start position (bottom left)
//         const startX = 10;
//         const startY = 15;
        
//         // Target position (near Spiderman, top right)
//         const targetX = 70;
//         const targetY = 25;

//         // Calculate current position
//         const currentX = startX + (targetX - startX) * easePull;
//         const currentY = startY + (targetY - startY) * easePull;

//         airpod1.style.left = `${currentX}%`;
//         airpod1.style.bottom = `${currentY}%`;
//         airpod1.style.transform = `scale(${1 - easePull * 0.4}) rotateZ(${easePull * 720}deg) rotateY(${easePull * 360}deg)`;

//         // Update web path during pull
//         const spideyX = 85;
//         const spideyY = 25;
//         const controlX = (spideyX + currentX) / 2 - (1 - easePull) * 10;
//         const controlY = (spideyY + (100 - currentY)) / 2;
//         webPath1.setAttribute('d', `M ${spideyX} ${spideyY} Q ${controlX} ${controlY}, ${currentX} ${100 - currentY}`);

//         // Add catch effect at end
//         if (pullProgress > 0.85 && !airpod1.classList.contains('caught')) {
//             airpod1.classList.add('caught');
//         }
//     }

//     // Stage 5: Animation complete (0.9+)
//     if (progress >= 0.9) {
//         // Fade out web
//         webPath1.style.opacity = 1 - (progress - 0.9) * 10;
        
//         // Show text
//         heroText.classList.add('active');

//         // Mark animation as complete
//         if (!animationComplete) {
//             animationComplete = true;
//             // Allow normal scrolling after a brief delay
//             setTimeout(() => {
//                 document.body.style.overflow = 'auto';
//             }, 500);
//         }
//     }
// }

// function handleSpidermanAnimation() {
//     const section = document.querySelector('.superhero-section');
//     const rect = section.getBoundingClientRect();
    
//     // Calculate progress based on section visibility
//     let progress = 0;
//     if (rect.top <= 0) {
//         progress = Math.min(Math.abs(rect.top) / window.innerHeight, 1);
//     }

//     updateAnimation(progress);
// }

// ============================================
// TWS SCROLL ANIMATION
// Add this JavaScript to the END of your script.js file
// ============================================

// TWS Configuration
const TWS_CONFIG = {
    FRAME_COUNT: 40,
    IMAGE_PATH: 'assets/frames/tws-pics/',
    IMAGE_PREFIX: 'ezgif-frame-',
    IMAGE_EXTENSION: '.jpg',
    PADDING_SIZE: 3
};

// TWS DOM Elements
const twsElements = {
    canvas: document.getElementById('twsCanvas'),
    loadingScreen: document.getElementById('twsLoadingScreen'),
    loadingProgress: document.getElementById('twsLoadingProgress'),
    heroOverlay: document.getElementById('twsHeroOverlay'),
    scrollIndicator: document.getElementById('twsScrollIndicator'),
    textOverlay1: document.getElementById('twsText1'),
    textOverlay2: document.getElementById('twsText2'),
    textOverlay3: document.getElementById('twsText3'),
    section: document.querySelector('.tws-scroll-section')
};

// Check if canvas exists before initializing
if (twsElements.canvas) {
    const twsContext = twsElements.canvas.getContext('2d');

    // TWS State
    const twsState = {
        images: [],
        imagesLoaded: 0,
        currentFrame: 0
    };

    // Utility: Pad number with zeros
    function twsPadNumber(num, size = TWS_CONFIG.PADDING_SIZE) {
        return String(num).padStart(size, '0');
    }

    // Utility: Clamp value
    function twsClamp(value, min, max) {
        return Math.max(min, Math.min(value, max));
    }

    // Utility: Ease in-out
    function twsEaseInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Preload TWS Images
    function twsPreloadImages() {
        for (let i = 1; i <= TWS_CONFIG.FRAME_COUNT; i++) {
            const img = new Image();
            const frameNumber = twsPadNumber(i);
            img.src = `${TWS_CONFIG.IMAGE_PATH}${TWS_CONFIG.IMAGE_PREFIX}${frameNumber}${TWS_CONFIG.IMAGE_EXTENSION}`;
            
            img.onload = () => twsHandleImageLoad(img, i);
            img.onerror = () => twsHandleImageError(img.src);
        }
    }

    // Handle Image Load
    function twsHandleImageLoad(img, index) {
        twsState.images[index - 1] = img;
        twsState.imagesLoaded++;
        twsUpdateLoadingProgress();
        
        if (twsState.imagesLoaded === TWS_CONFIG.FRAME_COUNT) {
            twsFinishLoading();
        }
    }

    // Handle Image Error
    function twsHandleImageError(src) {
        console.error(`Failed to load TWS frame: ${src}`);
        twsState.imagesLoaded++;
        twsUpdateLoadingProgress();
        
        if (twsState.imagesLoaded === TWS_CONFIG.FRAME_COUNT) {
            twsFinishLoading();
        }
    }

    // Update Loading Progress
    function twsUpdateLoadingProgress() {
        const progress = Math.round((twsState.imagesLoaded / TWS_CONFIG.FRAME_COUNT) * 100);
        if (twsElements.loadingProgress) {
            twsElements.loadingProgress.textContent = `${progress}%`;
        }
    }

    // Finish Loading
    function twsFinishLoading() {
        twsSetCanvasSize();
        twsRenderFrame(0);
    }

    // Set Canvas Size
    function twsSetCanvasSize() {
        if (twsElements.canvas) {
            twsElements.canvas.width = window.innerWidth;
            twsElements.canvas.height = window.innerHeight;
            twsRenderFrame(twsState.currentFrame);
        }
    }

    // Calculate Cover Dimensions
    function twsCalculateCoverDimensions(canvasWidth, canvasHeight, imgWidth, imgHeight) {
        const canvasAspect = canvasWidth / canvasHeight;
        const imgAspect = imgWidth / imgHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgAspect;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawWidth = canvasHeight * imgAspect;
            drawHeight = canvasHeight;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        }

        return { drawWidth, drawHeight, offsetX, offsetY };
    }

    // Render Frame
    function twsRenderFrame(index) {
        const safeIndex = twsClamp(Math.floor(index), 0, TWS_CONFIG.FRAME_COUNT - 1);
        const img = twsState.images[safeIndex];
        
        if (!img || !img.complete) return;

        twsContext.clearRect(0, 0, twsElements.canvas.width, twsElements.canvas.height);

        const dimensions = twsCalculateCoverDimensions(
            twsElements.canvas.width,
            twsElements.canvas.height,
            img.width,
            img.height
        );

        twsContext.drawImage(
            img,
            dimensions.offsetX,
            dimensions.offsetY,
            dimensions.drawWidth,
            dimensions.drawHeight
        );
    }

    // Calculate Text Opacity
    function twsCalculateTextOpacity(scrollFraction, fadeInStart, fadeInEnd, fadeOutEnd) {
        if (scrollFraction < fadeInStart) {
            return 0;
        } else if (scrollFraction < fadeInEnd) {
            const progress = (scrollFraction - fadeInStart) / (fadeInEnd - fadeInStart);
            return twsEaseInOut(progress); // Max 100% opacity
        } else if (scrollFraction < fadeOutEnd) {
            const progress = (scrollFraction - fadeInEnd) / (fadeOutEnd - fadeInEnd);
            return (1 - twsEaseInOut(progress)); // Max 100% opacity
        } else {
            return 0;
        }
    }

    // Handle TWS Scroll
    function twsHandleScroll() {
        if (!twsElements.section) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const sectionTop = twsElements.section.offsetTop;
        const sectionHeight = twsElements.section.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Check if we're in the TWS section
        const inSection = scrollTop >= sectionTop && scrollTop <= (sectionTop + sectionHeight);
        
        if (!inSection) {
            // Hide all text when outside TWS section
            if (twsElements.heroOverlay) {
                twsElements.heroOverlay.style.opacity = 0;
            }
            if (twsElements.textOverlay1) {
                twsElements.textOverlay1.style.opacity = 0;
            }
            if (twsElements.textOverlay2) {
                twsElements.textOverlay2.style.opacity = 0;
            }
            if (twsElements.textOverlay3) {
                twsElements.textOverlay3.style.opacity = 0;
            }
            return;
        }

        const relativeScroll = scrollTop - sectionTop;
        const maxScroll = sectionHeight - viewportHeight;
        const scrollFraction = twsClamp(relativeScroll / maxScroll, 0, 1);

        // Update Frame
        const targetFrame = Math.floor(scrollFraction * (TWS_CONFIG.FRAME_COUNT - 1));
        if (targetFrame !== twsState.currentFrame) {
            twsState.currentFrame = targetFrame;
            twsRenderFrame(targetFrame);
        }

        // Update Hero Overlay - Only show during TWS section, fade out on scroll
        const heroOpacity = scrollFraction < 0.08 ? 1 : Math.max(0, 1 - ((scrollFraction - 0.08) * 5));
        const heroScale = 1 - (scrollFraction * 0.015);
        if (twsElements.heroOverlay) {
            twsElements.heroOverlay.style.opacity = heroOpacity;
            twsElements.heroOverlay.style.transform = `scale(${heroScale})`;
        }
        
        // Previously the navbar logo was hidden after scrolling past a threshold.
        // Keep the logo visible at all times by not toggling the `hide-logo` class.
        // const navbar = document.querySelector('.navbar');
        // if (navbar) {
        //     if (scrollTop > 300) {
        //         navbar.classList.add('hide-logo');
        //     } else {
        //         navbar.classList.remove('hide-logo');
        //     }
        // }

        // Update Scroll Indicator
        if (twsElements.scrollIndicator) {
            const indicatorOpacity = relativeScroll > 100 ? 0 : 1;
            twsElements.scrollIndicator.style.opacity = indicatorOpacity;
        }
// hello
        // Update Text Overlays
        if (twsElements.textOverlay1) {
            const text1Opacity = twsCalculateTextOpacity(scrollFraction, 0.15, 0.25, 0.4);
            twsElements.textOverlay1.style.opacity = text1Opacity;
        }

        if (twsElements.textOverlay2) {
            const text2Opacity = twsCalculateTextOpacity(scrollFraction, 0.45, 0.55, 0.7);
            twsElements.textOverlay2.style.opacity = text2Opacity;
        }

        if (twsElements.textOverlay3) {
            const text3Opacity = twsCalculateTextOpacity(scrollFraction, 0.75, 0.85, 0.95);
            twsElements.textOverlay3.style.opacity = text3Opacity;
        }
    }

    // Optimized Scroll Event
    let twsTicking = false;
    window.addEventListener('scroll', () => {
        if (!twsTicking) {
            requestAnimationFrame(() => {
                twsHandleScroll();
                twsTicking = false;
            });
            twsTicking = true;
        }
    }, { passive: true });

    // Handle Resize
    window.addEventListener('resize', () => {
        twsSetCanvasSize();
    });

    // Initialize TWS Animation
    function initTWSAnimation() {
        twsPreloadImages();
        twsHandleScroll();
    }

    // Start TWS Animation
    initTWSAnimation();
}

// Easing functions
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

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


// Smooth scroll and reveal About section on About nav click
document.addEventListener('DOMContentLoaded', function() {
    var aboutLink = document.querySelector('a[href="#about"]');
    var aboutSection = document.getElementById('about');
    if (aboutLink && aboutSection) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Optionally, add a class to highlight or reveal the section
            aboutSection.classList.add('visible');
            setTimeout(function() {
                aboutSection.classList.remove('visible');
            }, 1200);
        });
    }
});

// Initialize
renderProducts();
updateCartCount();

// Store recently viewed products in sessionStorage
sessionStorage.setItem('lastVisited', new Date().toISOString());

// // ================================
// // DRONE SHOWCASE COUNTER ANIMATION
// // ================================
// // Animated counter function for drone showcase
// function animateDroneCounter(element, start, end, duration) {
//     let startTimestamp = null;
    
//     const step = (timestamp) => {
//         if (!startTimestamp) startTimestamp = timestamp;
//         const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
//         // Easing function for smooth animation
//         const easeOutQuart = 1 - Math.pow(1 - progress, 4);
//         const currentValue = Math.floor(easeOutQuart * (end - start) + start);
        
//         element.textContent = currentValue;
        
//         if (progress < 1) {
//             window.requestAnimationFrame(step);
//         }
//     };
    
//     window.requestAnimationFrame(step);
// }

// // Observe drone showcase section and trigger animations
// const droneShowcaseSection = document.querySelector('.drone-showcase-section');
// let droneAnimated = false;

// const droneObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting && !droneAnimated) {
//             droneAnimated = true;
            
//             const counters = document.querySelectorAll('.drone-counter');
            
//             counters.forEach((counter, index) => {
//                 const target = parseInt(counter.getAttribute('data-counter'));
                
//                 // Stagger the animation start for each counter
//                 setTimeout(() => {
//                     animateDroneCounter(counter, 0, target, 2000);
//                 }, index * 150);
//             });
//         }
//     });
// }, { threshold: 0.3 });

// if (droneShowcaseSection) {
//     droneObserver.observe(droneShowcaseSection);
// }

// ================================
// DRONE SHOWCASE COUNTER ANIMATION
// ================================
// ================================
// FINAL NAVBAR COLOR CONTROLLER
// ================================
// document.addEventListener("DOMContentLoaded", () => {
//     const navbar = document.querySelector(".navbar");
//     const hero = document.querySelector(".hero-section");
//     const horizontal = document.querySelector(".horizontal-section");
//     const tws = document.querySelector(".tws-scroll-section");

//     if (!navbar || !hero || !horizontal || !tws) return;

//     function updateNavbarColor() {
//         const scrollY = window.scrollY + 80;

//         // DARK MODE → ALWAYS WHITE
//         if (!document.body.classList.contains("light-mode")) {
//             navbar.classList.add("light-nav");
//             return;
//         }

//         const heroEnd = hero.offsetTop + hero.offsetHeight;
//         const horizontalStart = horizontal.offsetTop;
//         const twsStart = tws.offsetTop;
//         const twsEnd = tws.offsetTop + tws.offsetHeight;

//         // HERO → WHITE
//         if (scrollY < heroEnd) {
//             navbar.classList.add("light-nav");
//         }
//         // HORIZONTAL → BLACK
//         else if (scrollY >= horizontalStart && scrollY < twsStart) {
//             navbar.classList.remove("light-nav");
//         }
//         // TWS → WHITE
//         else if (scrollY >= twsStart && scrollY < twsEnd) {
//             navbar.classList.add("light-nav");
//         }
//         // AFTER TWS → BLACK
//         else {
//             navbar.classList.remove("light-nav");
//         }
//     }

//     window.addEventListener("scroll", updateNavbarColor, { passive: true });
//     window.addEventListener("resize", updateNavbarColor);
//     updateNavbarColor();
// });

// ===================================
// DRONE SHOWCASE COUNTER ANIMATION
// ===================================
function animateDroneCounters() {
    const counters = document.querySelectorAll('.drone-counter');
    console.log('Found counters:', counters.length);
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter')) || 0;
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        // Ensure counters visibly start at 0
        counter.textContent = '0';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Start counters only when the drone showcase section enters viewport
let droneCountersAnimated = false;
const droneSection = document.querySelector('.drone-showcase-section');
if (droneSection) {
    const countersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !droneCountersAnimated) {
                droneCountersAnimated = true;
                animateDroneCounters();
            }
        });
    }, { threshold: 0.3 });
    countersObserver.observe(droneSection);
}
