(function () {
    const USER_STORAGE_KEY = 'aeronixUser';
    const FAVORITES_STORAGE_KEY = 'aeronixFavorites';
    const PENDING_FAVORITE_KEY = 'aeronixPendingFavorite';
    const PENDING_REDIRECT_KEY = 'aeronixPendingRedirect';

    function safeParse(value, fallback = null) {
        if (!value) return fallback;
        try {
            return JSON.parse(value);
        } catch (error) {
            console.warn('AeronixSession: failed to parse JSON', error);
            return fallback;
        }
    }

    function removeStoredUser() {
        sessionStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
    }

    function storeActiveUser(user, options = {}) {
        if (!user || !user.id) {
            console.warn('AeronixSession: invalid user payload');
            return;
        }

        const persistent = Boolean(options.remember);
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name || '',
            storedAt: Date.now()
        };

        removeStoredUser();

        const target = persistent ? localStorage : sessionStorage;
        target.setItem(USER_STORAGE_KEY, JSON.stringify(payload));

        window.dispatchEvent(new CustomEvent('aeronix:user-change', { detail: { user: payload } }));
    }

    function getActiveUser() {
        const sessionUser = safeParse(sessionStorage.getItem(USER_STORAGE_KEY));
        if (sessionUser) return sessionUser;
        return safeParse(localStorage.getItem(USER_STORAGE_KEY));
    }

    function clearActiveUser() {
        removeStoredUser();
        window.dispatchEvent(new CustomEvent('aeronix:user-change', { detail: { user: null } }));
    }

    function readFavoritesStore() {
        return safeParse(localStorage.getItem(FAVORITES_STORAGE_KEY), {});
    }

    function writeFavoritesStore(store) {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(store));
    }

    function getFavoritesInternal(userId) {
        if (!userId) return [];
        const store = readFavoritesStore();
        return Array.isArray(store[userId]) ? store[userId] : [];
    }

    function saveFavoritesInternal(userId, items) {
        if (!userId) return;
        const store = readFavoritesStore();
        store[userId] = items;
        writeFavoritesStore(store);
        window.dispatchEvent(new CustomEvent('aeronix:favorites-change', { detail: { userId, favorites: items } }));
    }

    function showToast(message, variant = 'info') {
        if (!message) return;
        let container = document.querySelector('.aeronix-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'aeronix-toast-container';
            container.style.position = 'fixed';
            container.style.top = '24px';
            container.style.right = '24px';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.gap = '12px';
            container.style.zIndex = '2000';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `aeronix-toast aeronix-toast-${variant}`;
        toast.textContent = message;
        toast.style.background = variant === 'error' ? '#dc2626' : variant === 'warning' ? '#f59e0b' : '#2563eb';
        toast.style.color = '#fff';
        toast.style.padding = '12px 18px';
        toast.style.borderRadius = '10px';
        toast.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.2)';
        toast.style.fontSize = '14px';
        toast.style.fontWeight = '600';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                toast.remove();
                if (!container.children.length) {
                    container.remove();
                }
            }, 200);
        }, 2400);
    }

    function normalizeProduct(product) {
        if (!product || product.id == null || !product.type) return null;
        return {
            id: product.id,
            type: product.type,
            name: product.name || '',
            price: product.price != null ? product.price : null,
            image: product.image || '',
            subtitle: product.subtitle || ''
        };
    }

    function isFavorite(product) {
        const normalized = normalizeProduct(product);
        if (!normalized) return false;
        const user = getActiveUser();
        if (!user) return false;
        const favorites = getFavoritesInternal(user.id);
        return favorites.some(item => item.id === normalized.id && item.type === normalized.type);
    }

    function addFavorite(product) {
        const normalized = normalizeProduct(product);
        const user = getActiveUser();
        if (!normalized || !user) return false;
        const list = getFavoritesInternal(user.id);
        const exists = list.some(item => item.id === normalized.id && item.type === normalized.type);
        if (!exists) {
            list.push({ ...normalized, addedAt: new Date().toISOString() });
            saveFavoritesInternal(user.id, list);
        }
        return true;
    }

    function removeFavorite(product) {
        const normalized = normalizeProduct(product);
        const user = getActiveUser();
        if (!normalized || !user) return false;
        const list = getFavoritesInternal(user.id);
        const newList = list.filter(item => !(item.id === normalized.id && item.type === normalized.type));
        if (newList.length !== list.length) {
            saveFavoritesInternal(user.id, newList);
            return true;
        }
        return false;
    }

    function showSignInPrompt() {
        showToast('Sign in to use favorites', 'warning');
    }

    function setPendingFavorite(product) {
        const normalized = normalizeProduct(product);
        if (!normalized) return;
        sessionStorage.setItem(PENDING_FAVORITE_KEY, JSON.stringify(normalized));
        sessionStorage.setItem(PENDING_REDIRECT_KEY, window.location.href);
    }

    function consumePendingFavorite() {
        const pending = safeParse(sessionStorage.getItem(PENDING_FAVORITE_KEY));
        sessionStorage.removeItem(PENDING_FAVORITE_KEY);
        return pending;
    }

    function consumePendingRedirect() {
        const pending = sessionStorage.getItem(PENDING_REDIRECT_KEY);
        sessionStorage.removeItem(PENDING_REDIRECT_KEY);
        return pending;
    }

    function resolveSignInUrl() {
        try {
            const loginUrl = new URL('index.html', window.location.href);
            loginUrl.searchParams.set('source', 'favorites');
            return loginUrl.toString();
        } catch (error) {
            return 'index.html';
        }
    }

    function redirectToSignIn() {
        const target = resolveSignInUrl();
        setTimeout(() => {
            window.location.href = target;
        }, 750);
    }

    function applyFavoriteState(button, active) {
        if (!button) return;
        button.classList.toggle('is-favorite', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
        const icon = button.querySelector('i');
        if (icon) {
            if (icon.classList.contains('bi')) {
                icon.classList.toggle('bi-heart-fill', active);
                icon.classList.toggle('bi-heart', !active);
            }
            if (icon.classList.contains('fa')) {
                icon.classList.toggle('fa-heart', !active);
                icon.classList.toggle('fa-heart-circle-check', active);
            }
        }
    }

    function toggleFavorite(product) {
        const normalized = normalizeProduct(product);
        if (!normalized) return { status: 'invalid', favorite: false };
        const user = getActiveUser();
        if (!user) {
            showSignInPrompt();
            setPendingFavorite(normalized);
            redirectToSignIn();
            return { status: 'auth-required', favorite: false };
        }

        const list = getFavoritesInternal(user.id);
        const existingIndex = list.findIndex(item => item.id === normalized.id && item.type === normalized.type);

        if (existingIndex >= 0) {
            list.splice(existingIndex, 1);
            saveFavoritesInternal(user.id, list);
            showToast('Removed from favorites');
            return { status: 'removed', favorite: false };
        }

        list.push({ ...normalized, addedAt: new Date().toISOString() });
        saveFavoritesInternal(user.id, list);
        showToast('Added to favorites');
        return { status: 'added', favorite: true };
    }

    function registerFavoriteButton(button, supplyProduct) {
        if (!button || typeof supplyProduct !== 'function') return;

        const resolveProduct = () => normalizeProduct(supplyProduct());
        const initial = resolveProduct();
        if (!initial) return;
        applyFavoriteState(button, isFavorite(initial));

        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const product = resolveProduct();
            if (!product) return;
            const result = toggleFavorite(product);
            if (result.status === 'auth-required') return;
            applyFavoriteState(button, result.favorite);
        });
    }

    function getFavorites() {
        const user = getActiveUser();
        if (!user) return [];
        return getFavoritesInternal(user.id);
    }

    window.AeronixSession = {
        getActiveUser,
        storeActiveUser,
        clearActiveUser,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        registerFavoriteButton,
        applyFavoriteState,
        showToast,
        consumePendingFavorite,
        consumePendingRedirect,
        getFavorites
    };
})();
