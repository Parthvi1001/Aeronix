// Sign-in / sign-up page logic
(function initAuthPage() {
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const successScreen = document.getElementById('successScreen');

    if (!signinForm || !signupForm || !successScreen) return;

    window.showMessage = function showMessage(elementId, message, type) {
        const messageEl = document.getElementById(elementId);
        if (!messageEl) return;
        messageEl.textContent = message;
        messageEl.className = `message ${type} show`;
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 5000);
    };

    window.showSignup = function showSignup() {
        signinForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    };

    window.showSignin = function showSignin() {
        signupForm.classList.add('hidden');
        signinForm.classList.remove('hidden');
    };

    window.showSuccess = function showSuccess(user) {
        signinForm.classList.add('hidden');
        signupForm.classList.add('hidden');
        successScreen.classList.remove('hidden');

        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.textContent = user.name ? `Good to see you, ${user.name}!` : 'You are now signed in';
        }
        const userEmail = document.getElementById('userEmail');
        if (userEmail) userEmail.textContent = `Email: ${user.email}`;
        const userCreated = document.getElementById('userCreated');
        if (userCreated) userCreated.textContent = `Account created: ${new Date(user.createdAt).toLocaleString()}`;
        const userLastLogin = document.getElementById('userLastLogin');
        if (userLastLogin) {
            userLastLogin.textContent = user.lastLogin
                ? `Last login: ${new Date(user.lastLogin).toLocaleString()}`
                : 'First login';
        }
    };

    window.handleLogout = function handleLogout() {
        successScreen.classList.add('hidden');
        signinForm.classList.remove('hidden');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        if (email) email.value = '';
        if (password) password.value = '';
        if (window.AeronixSession) {
            window.AeronixSession.clearActiveUser();
        }
    };

    window.handleSignIn = async function handleSignIn() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        if (!email || !password) {
            window.showMessage('message', 'Please fill in all fields', 'error');
            return;
        }

        const btn = document.getElementById('signinBtn');
        btn.disabled = true;
        btn.textContent = 'Signing in...';

        try {
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, remember })
            });

            const data = await response.json();

            if (data.success) {
                if (window.AeronixSession) {
                    window.AeronixSession.storeActiveUser(data.user, { remember });
                    const pendingFavorite = window.AeronixSession.consumePendingFavorite();
                    if (pendingFavorite) {
                        if (window.AeronixSession.addFavorite(pendingFavorite)) {
                            window.AeronixSession.showToast('Added to favorites', 'info');
                        }
                    }
                    const pendingRedirect = window.AeronixSession.consumePendingRedirect();
                    if (pendingRedirect) {
                        setTimeout(() => {
                            window.location.href = pendingRedirect;
                        }, 1200);
                    }
                }
                window.showSuccess(data.user);
            } else {
                window.showMessage('message', data.message, 'error');
            }
        } catch (error) {
            window.showMessage('message', 'Connection error. Please make sure the server is running.', 'error');
            console.error('Error:', error);
        } finally {
            btn.disabled = false;
            btn.textContent = 'Sign In';
        }
    };

    window.handleSignUp = async function handleSignUp() {
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;

        if (!name) {
            window.showMessage('signupMessage', 'Name is required', 'error');
            return;
        }

        if (!email || !password) {
            window.showMessage('signupMessage', 'Email and password are required', 'error');
            return;
        }

        if (password.length < 6) {
            window.showMessage('signupMessage', 'Password must be at least 6 characters', 'error');
            return;
        }

        const btn = document.getElementById('signupBtn');
        btn.disabled = true;
        btn.textContent = 'Creating account...';

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name })
            });

            const data = await response.json();

            if (data.success) {
                if (window.AeronixSession) {
                    window.AeronixSession.storeActiveUser(data.user);
                    const pendingFavorite = window.AeronixSession.consumePendingFavorite();
                    if (pendingFavorite) {
                        if (window.AeronixSession.addFavorite(pendingFavorite)) {
                            window.AeronixSession.showToast('Added to favorites', 'info');
                        }
                    }
                    const pendingRedirect = window.AeronixSession.consumePendingRedirect();
                    if (pendingRedirect) {
                        setTimeout(() => {
                            window.location.href = pendingRedirect;
                        }, 1200);
                    }
                }
                window.showMessage('signupMessage', 'Account created successfully! Signing you in...', 'success');
                setTimeout(() => {
                    window.showSuccess(data.user);
                }, 1000);
            } else {
                window.showMessage('signupMessage', data.message, 'error');
            }
        } catch (error) {
            window.showMessage('signupMessage', 'Connection error. Please make sure the server is running.', 'error');
            console.error('Error:', error);
        } finally {
            btn.disabled = false;
            btn.textContent = 'Sign Up';
        }
    };

    // Allow Enter key to submit
    const password = document.getElementById('password');
    if (password) {
        password.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                window.handleSignIn();
            }
        });
    }

    const signupPassword = document.getElementById('signupPassword');
    if (signupPassword) {
        signupPassword.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                window.handleSignUp();
            }
        });
    }

    // Mobile menu toggle (if wired elsewhere)
    window.toggleMenu = function toggleMenu() {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) navLinks.classList.toggle('active');
    };

    // Background Carousel Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    }

    function initCarousel() {
        if (slides.length > 0) {
            slides[0].classList.add('active');
            setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
    }

    // Start carousel when page loads
    document.addEventListener('DOMContentLoaded', initCarousel);

    // Also initialize immediately in case DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }
})();
