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

let horizontalFinished = false;

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
function updateCartCount(count) {
  const el = document.getElementById("cart-count");
  if (!el) return; // 🔥 prevents crash
  el.textContent = count;
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

// const frameCount = 150;

// function setupDrone(canvasId, wrapperId) {
//   const canvas = document.getElementById(canvasId);
//   const ctx = canvas.getContext("2d");
//   const wrapper = document.getElementById(wrapperId);

//   function resize() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   }
//   resize();
//   window.addEventListener("resize", resize);

//   const images = [];
//   for (let i = 1; i <= frameCount; i++) {
//     const img = new Image();
//     img.src = `assets/frames/frame_${String(i).padStart(6, "0")}.png`;
//     images.push(img);
//   }

//   return { canvas, ctx, images, wrapper };
// }

// const drone1 = setupDrone("canvasOne", "droneOne");
// const drone2 = setupDrone("canvasTwo", "droneTwo");

// window.addEventListener("scroll", () => {
//   const section = document.querySelector(".horizontal-section");
//   if (!section) return;

//   const scrollY = window.scrollY;
//   const start = section.offsetTop;
//   const end = start + section.offsetHeight - window.innerHeight;

//   let totalProgress = (scrollY - start) / (end - start);
//   totalProgress = Math.max(0, Math.min(1, totalProgress)); // clamp

//   const vw = window.innerWidth;
//   const vh = window.innerHeight;

//   const droneWidth = Math.min(vw * 0.7, 1000);
//   const droneHeight = droneWidth * (2 / 3);

//   const startX = vw + droneWidth;
//   const endX = -droneWidth;

//   // ---- DRONE 1 ----
//   if (totalProgress < 0.5) {
//     const p = totalProgress / 0.5;
//     const frame = Math.floor(p * (frameCount - 1));

//     drone1.wrapper.style.opacity = 1;
//     drone2.wrapper.style.opacity = 0;

//     const x = startX + (endX - startX) * p;
//     const y = (vh - droneHeight) / 2;

//     drone1.ctx.clearRect(0, 0, vw, vh);
//     drone1.ctx.drawImage(
//       drone1.images[frame],
//       x,
//       y,
//       droneWidth,
//       droneHeight
//     );
//   }

//   // ---- DRONE 2 ----
//   if (totalProgress >= 0.5) {
//     const p = (totalProgress - 0.5) / 0.5;
//     const frame = Math.floor(p * (frameCount - 1));

//     drone1.wrapper.style.opacity = 0;
//     drone2.wrapper.style.opacity = 1;

//     const x = startX + (endX - startX) * p;
//     const y = (vh - droneHeight) / 2;

//     drone2.ctx.clearRect(0, 0, vw, vh);
//     drone2.ctx.drawImage(
//       drone2.images[frame],
//       x,
//       y,
//       droneWidth,
//       droneHeight
//     );
//   }
// });

// ================================
// CONFIG
// ================================
// const DRONE_1_FRAMES = 150;
// const DRONE_2_FRAMES = 173;

// const DRONE_1_PATH = "assets/frames/drone1/frame_";
// const DRONE_2_PATH = "assets/frames/drone2/frame_";
// const ASPECT_RATIO = 2 / 3; // height / width

// const DRONE_1 = {
//   frames: 150,
//   path: "assets/frames/drone1/frame_"
// };

// const DRONE_2 = {
//   frames: 173,
//   path: "assets/frames/drone2/frame_"
// };

// ================================
// SETUP FUNCTION
// ================================
// function setupDrone(canvasId, wrapperId, frameCount, framePath) {

//   const canvas = document.getElementById(canvasId);
//   const ctx = canvas.getContext("2d");
//   const wrapper = document.getElementById(wrapperId);
//   const nameEl = wrapper.querySelector(".drone-name");

//   function resize() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   }
//   resize();
//   window.addEventListener("resize", resize);

//   const images = [];
//   for (let i = 1; i <= frameCount; i++) {
//     const img = new Image();
//     img.src = `${FRAME_PATH}${String(i).padStart(6, "0")}${FRAME_EXT}`;
//     images.push(img);
//   }

//   return { canvas, ctx, images, wrapper, nameEl };
// }
// function setupDrone(canvasId, framePath, frameCount) {
//   const canvas = document.getElementById(canvasId);
//   const ctx = canvas.getContext("2d");

//   // Resize canvas to viewport
//   function resize() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   }
//   resize();
//   window.addEventListener("resize", resize);

//   // Load frames
//   const images = [];
//   for (let i = 1; i <= frameCount; i++) {
//     const img = new Image();
//     img.src = `${framePath}${String(i).padStart(6, "0")}.png`;
//     images.push(img);
//   }

//   return {
//     canvas,
//     ctx,
//     images,
//     frameCount
//   };
// }

// function setupDrone(canvasId, config) {
//   const canvas = document.getElementById(canvasId);
//   const ctx = canvas.getContext("2d");

//   function resize() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   }
//   resize();
//   window.addEventListener("resize", resize);

//   const images = [];
//   for (let i = 1; i <= config.frames; i++) {
//     const img = new Image();
//     img.src = `${config.path}${String(i).padStart(6, "0")}.png`;
//     images.push(img);
//   }

//   return {
//     canvas,
//     ctx,
//     images,
//     frameCount: config.frames
//   };
// }

// // ================================
// // INIT DRONES
// // ================================
// // const drone1 = setupDrone("canvasOne", "droneOne");
// // const drone2 = setupDrone("canvasTwo", "droneTwo");

// const drone1 = setupDrone("canvasOne", DRONE_1);
// const drone2 = setupDrone("canvasTwo", DRONE_2);

// window.addEventListener("load", () => {
//   const img1 = drone1.images[0];
//   const img2 = drone2.images[0];

//   img1.onload = () => {
//     drone1.ctx.drawImage(
//       img1,
//       100,
//       100,
//       300,
//       200
//     );
//   };

//   img2.onload = () => {
//     drone2.ctx.drawImage(
//       img2,
//       500,
//       100,
//       300,
//       200
//     );
//   };
// });




// ================================
// SCROLL HANDLER
// ================================
// window.addEventListener("scroll", () => {
//   const section = document.querySelector(".horizontal-section");
//   if (!section) return;

//   const scrollY = window.scrollY;
//   const start = section.offsetTop;
//   const end = start + section.offsetHeight - window.innerHeight;

//   let progress = (scrollY - start) / (end - start);
//   progress = Math.max(0, Math.min(1, progress));

//   const vw = window.innerWidth;
//   const vh = window.innerHeight;

//   const droneWidth = Math.min(vw * 0.5, 700);
// const droneHeight = droneWidth * ASPECT_RATIO;


// //   const verticalOffset =
// //   window.innerWidth < 768 ? vh * 0.04 : vh * 0.08;


// // const y = (canvas.height - droneHeight) / 2 - canvas.height * 0.1;



//   const centerX = (vw - droneWidth) / 2;
//   const endX = -droneWidth * 0.9;

//   // -------- DRONE 1 --------
//   if (progress < 0.5) {
//     const y = (drone1.canvas.height - droneHeight) / 2 - drone1.canvas.height * 0.04;

//     const p = progress / 0.5;
//     drone1.ctx.drawImage(drone1.images[frame1], x1, y, w, h);


//     drone1.wrapper.style.display = "flex";
//     drone2.wrapper.style.display = "none";

//     const x = centerX + (endX - centerX) * p;

//     const scale = 1.08;
// const w = droneWidth * scale;
// const h = droneHeight * scale;

// const xScaled = x - (w - droneWidth) / 2;
// const yScaled = y - (h - droneHeight) / 2;

//     drone1.ctx.clearRect(
//   0,
//   0,
//   drone1.canvas.width,
//   drone1.canvas.height
// );

// drone1.ctx.save();
// drone1.ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
// drone1.ctx.shadowBlur = 50;
// drone1.ctx.shadowOffsetY = 40;

//     drone1.ctx.drawImage(
//       drone1.images[frame],
//       x,
//       y,
//       droneWidth,
//       droneHeight
//     );
//   }
//   drone1.ctx.restore();

//   // -------- DRONE 2 --------
//   if (progress >= 0.5) {
//     const y = (drone2.canvas.height - droneHeight) / 2 - drone2.canvas.height * 0.04;

//     const p = (progress - 0.5) / 0.5;
//     drone2.ctx.drawImage(drone2.images[frame2], x2, y, w, h);

//     drone1.wrapper.style.display = "none";
//     drone2.wrapper.style.display = "flex";

//     const x = centerX + (endX - centerX) * p;

//     const scale = 1.08;
// const w = droneWidth * scale;
// const h = droneHeight * scale;

// const xScaled = x - (w - droneWidth) / 2;
// const yScaled = y - (h - droneHeight) / 2;


//     drone2.ctx.clearRect(
//   0,
//   0,
//   drone2.canvas.width,
//   drone2.canvas.height
// );

//     drone2.ctx.save();
//     drone2.ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
//     drone2.ctx.shadowBlur = 50;
//     drone2.ctx.shadowOffsetY = 40;

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
            return twsEaseInOut(progress);
        } else if (scrollFraction < fadeOutEnd) {
            const progress = (scrollFraction - fadeInEnd) / (fadeOutEnd - fadeInEnd);
            return 1 - twsEaseInOut(progress);
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
        if (scrollTop < sectionTop - viewportHeight || scrollTop > sectionTop + sectionHeight) {
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

        // Update Hero Overlay - Start visible, fade out on scroll
        const heroOpacity = scrollFraction < 0.2 ? 1 : Math.max(0, 1 - ((scrollFraction - 0.2) * 3));
        const heroScale = 1 - (scrollFraction * 0.05);
        if (twsElements.heroOverlay) {
            twsElements.heroOverlay.style.opacity = heroOpacity;
            twsElements.heroOverlay.style.transform = `scale(${heroScale})`;
        }

        // Update Scroll Indicator
        if (twsElements.scrollIndicator) {
            const indicatorOpacity = relativeScroll > 100 ? 0 : 1;
            twsElements.scrollIndicator.style.opacity = indicatorOpacity;
        }

        // Update Text Overlays
        if (twsElements.textOverlay1) {
            const text1Opacity = twsCalculateTextOpacity(scrollFraction, 0.1, 0.2, 0.3);
            twsElements.textOverlay1.style.opacity = text1Opacity;
        }

        if (twsElements.textOverlay2) {
            const text2Opacity = twsCalculateTextOpacity(scrollFraction, 0.4, 0.5, 0.6);
            twsElements.textOverlay2.style.opacity = text2Opacity;
        }

        if (twsElements.textOverlay3) {
            const text3Opacity = twsCalculateTextOpacity(scrollFraction, 0.7, 0.8, 0.9);
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

