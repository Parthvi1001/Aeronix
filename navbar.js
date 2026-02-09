const NAVBAR_TEMPLATE = `
<nav class="navbar">
    <div class="nav-container">
        <a href="aeronix.html" class="logo">AERONIX</a>
        <ul class="nav-menu nav-links">
            <li class="nav-item shop">
                <a href="airburds.html">Earbuds</a>
                <div class="mega-menu">
                    <div class="left"><br>
                        <h4>PRODUCTS</h4><br>
                        <ul>
                            <li>Aeronix SkyHawk X1</li>
                            <li>Aeronix Phantom Pro</li>
                            <li>Aeronix Mavic Ultra</li>
                            <li>Aeronix Spark Mini</li>
                            <li>Aeronix FPV Racer</li>
                        </ul><br><hr>
                        <p class="guarantee">🛡 30-Day Guarantee | 1-Year Warranty</p>
                    </div>
                    <div class="right">
                        <div class="card">
                            <div class="img-box">
                                <img src="earbuds.jpg" alt="Aeronix Earbuds">
                            </div>
                            <p>Aeronix Buds 4v ANC</p>
                        </div>
                        <div class="card">
                            <div class="img-box">
                                <img src="hearbuds.jpg" alt="Aeronix Nord Buds 2r True">
                            </div>
                            <p>Aeronix Nord Buds 2r True</p>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item shop">
                <a href="headphones.html">Headphones</a>
                <div class="mega-menu">
                    <div class="left"><br>
                        <h4>PRODUCTS</h4><br>
                        <ul>
                            <li>Aeronix SkyHawk X1</li>
                            <li>Aeronix Phantom Pro</li>
                            <li>Aeronix Mavic Ultra</li>
                            <li>Aeronix Spark Mini</li>
                            <li>Aeronix FPV Racer</li>
                        </ul><br><hr>
                        <p class="guarantee">🛡 60-Day Guarantee | 6-Months Warranty</p>
                    </div>
                    <div class="right">
                        <div class="card">
                            <div class="img-box">
                                <img src="headPhone.jpg" alt="Aeronix ANC Headphones">
                            </div>
                            <p>Aeronix ANC Headphones</p>
                        </div>
                        <div class="card">
                            <div class="img-box">
                                <img src="hhadephone.jpg" alt="Aeronix Studio Headphones">
                            </div>
                            <p>Aeronix Studio Headphones</p>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item shop">
                <a href="drone.html">Drone</a>
                <div class="mega-menu">
                    <div class="left"><br>
                        <h4>PRODUCTS</h4><br>
                        <ul>
                            <li>Aeronix SkyHawk X1</li>
                            <li>Aeronix Phantom Pro</li>
                            <li>Aeronix Mavic Ultra</li>
                            <li>Aeronix Spark Mini</li>
                            <li>Aeronix FPV Racer</li>
                        </ul><br><hr>
                        <p class="guarantee">🛡 120-Day Guarantee | 2-Years Warranty</p>
                    </div>
                    <div class="right">
                        <div class="card">
                            <div class="img-box">
                                <img src="drone1.jpg" alt="Aeronix SkyHawk X1">
                            </div>
                            <p>Aeronix SkyHawk X1</p>
                        </div>
                        <div class="card">
                            <div class="img-box">
                                <img src="hdrone.jpg" alt="Aeronix Phantom Pro">
                            </div>
                            <p>Aeronix Phantom Pro</p>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item">
                <a href="aeronix.html#about" class="nav-link">About</a>
            </li>
        </ul>
        <div class="nav-actions" id="navActions">
            <a href="index.html" class="nav-btn nav-btn-secondary">Sign In</a>
        </div>
        <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</nav>
`;

function applyMobileMenuBehavior(root) {
    // Keep a single mobile-menu implementation so every page behaves identically.
    const navMenu = root.querySelector('.nav-menu');
    const navActions = root.querySelector('.nav-actions');
    const navContainer = root.querySelector('.nav-container');
    const toggle = root.querySelector('#mobileToggle');

    if (!navMenu || !toggle || !navContainer) {
        return;
    }

    const closeMenu = () => {
        toggle.setAttribute('aria-expanded', 'false');
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = '';
        }
        navMenu.style.flexDirection = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.background = '';
        navMenu.style.padding = '';
        navMenu.style.gap = '';
        navMenu.style.boxShadow = '';
        navMenu.style.zIndex = '';
        if (navActions) {
            navActions.style.paddingTop = '';
        }
    };

    const openMenu = () => {
        toggle.setAttribute('aria-expanded', 'true');
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        const containerHeight = navContainer.getBoundingClientRect().height;
        navMenu.style.top = `${containerHeight}px`;
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = getComputedStyle(document.body).getPropertyValue('--nav-bg') || 'rgba(10, 14, 39, 0.95)';
        navMenu.style.padding = '24px 20px';
        navMenu.style.gap = '18px';
        navMenu.style.boxShadow = '0 12px 32px rgba(15, 23, 42, 0.25)';
        navMenu.style.zIndex = '1000';
        if (navActions) {
            navActions.style.paddingTop = '12px';
        }
    };

    const handleToggle = () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    toggle.addEventListener('click', handleToggle);

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
            navMenu.style.display = '';
        } else if (toggle.getAttribute('aria-expanded') !== 'true') {
            navMenu.style.display = 'none';
        }
    });

    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    closeMenu();
}

function handleAnchorNavigation(root) {
    const navElement = root.querySelector('.navbar');

    const scrollToHash = (hash) => {
        if (!hash) {
            return;
        }
        const target = document.querySelector(hash);
        if (!target) {
            return;
        }
        const navHeight = navElement ? navElement.getBoundingClientRect().height : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    };

    const normalizePath = (path) => path.replace(/\/+$/, '');

    root.querySelectorAll('a[href*="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const url = new URL(link.getAttribute('href'), window.location.href);
            if (normalizePath(url.pathname) === normalizePath(window.location.pathname) && url.hash) {
                event.preventDefault();
                history.pushState(null, '', url.hash);
                scrollToHash(url.hash);
            }
        });
    });

    if (window.location.hash) {
        requestAnimationFrame(() => scrollToHash(window.location.hash));
    }
}

function mountNavbar() {
    const root = document.getElementById('nav-root');
    if (!root) {
        return;
    }

    if (root.dataset.navbarMounted) {
        return;
    }

    root.innerHTML = NAVBAR_TEMPLATE;
    root.dataset.navbarMounted = 'true';
    applyMobileMenuBehavior(root);
    handleAnchorNavigation(root);
    setupAuthActions(root);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountNavbar);
} else {
    mountNavbar();
}

function setupAuthActions(root) {
    if (!root || root.dataset.authActionsMounted === 'true') {
        return;
    }

    const navActions = root.querySelector('#navActions');
    if (!navActions) {
        return;
    }

    const render = () => {
        const session = window.AeronixSession;
        const user = session ? session.getActiveUser() : null;

        navActions.innerHTML = '';

        if (!user) {
            const signInLink = document.createElement('a');
            signInLink.href = 'index.html';
            signInLink.className = 'nav-btn nav-btn-secondary';
            signInLink.textContent = 'Sign In';
            navActions.appendChild(signInLink);
            return;
        }

        const signOutBtn = document.createElement('button');
        signOutBtn.type = 'button';
        signOutBtn.className = 'nav-btn nav-btn-secondary';
        signOutBtn.textContent = 'Sign Out';
        signOutBtn.addEventListener('click', () => {
            const sessionApi = window.AeronixSession;
            if (sessionApi) {
                sessionApi.clearActiveUser();
                if (typeof sessionApi.showToast === 'function') {
                    sessionApi.showToast('Signed out', 'info');
                }
            }
        });

        navActions.appendChild(signOutBtn);
    };

    const attachSessionEvents = () => {
        if (root.dataset.authListenersAttached === 'true') {
            return;
        }
        window.addEventListener('aeronix:user-change', render);
        root.dataset.authListenersAttached = 'true';
    };

    const initRender = () => {
        if (window.AeronixSession) {
            render();
            attachSessionEvents();
            return true;
        }
        return false;
    };

    if (!initRender()) {
        const intervalId = setInterval(() => {
            if (initRender()) {
                clearInterval(intervalId);
            }
        }, 200);

        setTimeout(() => clearInterval(intervalId), 5000);
    }

    root.dataset.authActionsMounted = 'true';
}
