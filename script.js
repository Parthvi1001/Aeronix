
let horizontalFinished = false;

document.body.classList.add('light-mode');
const ASPECT_RATIO = 2 / 3;

// Only run drone animation on pages that have the canvas elements
if (document.getElementById('canvasOne')) {

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

  // normalised progress (0 â†’ 1)
  let progress = Math.min(rawProgress, 1);

  const vw = window.innerWidth;

  const droneWidth = Math.min(vw * 0.5, 650);
  const droneHeight = droneWidth * ASPECT_RATIO;

  const NAVBAR_OFFSET = 90;

  // =========================
  // DRONE 1 (0 â†’ 50%)
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
  // DRONE 2 (50 â†’ END)
  // =========================
  else {
    wrapper1.style.display = "none";
    wrapper2.style.display = "flex";

    let p = (rawProgress - 0.5) / 0.5;
p = Math.max(0, Math.min(1, p));

let x =
  (vw - droneWidth) / 2 + p * (-vw * 0.8);

// ðŸ”¥ STOP WHEN DRONE TOUCHES SCREEN WALL
if (x <= 0 && !horizontalFinished) {
  horizontalFinished = true;

  // lock drone exactly at wall
  x = 0;
  // p remains current to keep frame

  // ðŸ”¥ RELEASE STICKY â†’ START VERTICAL SCROLL
  section.style.height = "200vh";
}


// ðŸ”¥ STOP HORIZONTAL WHEN DRONE-2 EXITS
    if (x <= 0) {
      // p remains current to lock animation
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

} // end drone animation guard

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

// About Section Scroll Reveal
const aboutEl = document.getElementById('aboutContent');
if (aboutEl) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate letters
                const title = document.getElementById('aboutTitle');
                if (title) {
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
            }
        });
    }, { threshold: 0.3 });

    aboutObserver.observe(aboutEl);
}

// Contact Section Reveal
const contactEl = document.getElementById('contactSection');
if (contactEl) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    contactObserver.observe(contactEl);
}

// Contact Form Submission
const contactFormEl = document.getElementById('contactForm');
if (contactFormEl) {
    contactFormEl.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            message: document.getElementById('contactMessage').value,
            timestamp: new Date().toISOString()
        };

        // Store in sessionStorage
        const contacts = JSON.parse(sessionStorage.getItem('contacts') || '[]');
        contacts.push(formData);
        sessionStorage.setItem('contacts', JSON.stringify(contacts));

        alert('Message sent successfully! We\'ll get back to you soon.');
        e.target.reset();
    });
}


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

// Store recently viewed products in sessionStorage
sessionStorage.setItem('lastVisited', new Date().toISOString());

// ===================================
// DRONE SHOWCASE COUNTER ANIMATION
// ===================================
function animateDroneCounters() {
    const counters = document.querySelectorAll('.drone-counter');
    console.log('Found counters:', counters.length);
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter')) || 0;
        let current = 0;
        const duration = 4000;
        const increment = target / (duration / 24);
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
        }, 24);
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
