# Aeronix Front-End Suite

A collection of Aeronix product pages plus a lightweight client-side sign-in experience. The entire project now runs without any server-side API calls.

## Features

✅ Local sign up and sign in stored in `localStorage`
✅ Remember me session support
✅ Favorites, cart, and configuration flows across product pages
✅ Responsive layouts for earbuds, headphones, and drones
✅ Animated landing page with scroll-driven experiences

## Files Overview

- `index.html` – Sign-in/sign-up UI with success screen
- `auth.js` – Client-side auth logic (no API calls)
- `session.js` – Shared session helpers and favorites manager
- `aeronix.html` – Marketing landing page with animations powered by `script.js`
- `airburds.html`, `headphones.html`, `drone.html` – Product catalog and configurator pages

## Getting Started

1. Open `index.html` (or any page) directly in your browser.
2. Use the sign-up form to create a user. Accounts are stored locally in `localStorage` under the `aeronixUsers` key.
3. Sign in with the same credentials; the session layer keeps you signed in per tab or persistently if you tick **Remember me**.

No build step or backend server is required. Simply open the HTML files in a modern browser.

## Local Storage Keys

- `aeronixUsers` – Array of registered users (email, name, password, timestamps)
- `aeronixUser` – Active user session (stored in `sessionStorage` or `localStorage` depending on **Remember me**)
- `aeronixFavorites` – Favorites per user
- `aeronixCart` – Shared cart for product configurators

## Notes

- Passwords are stored in plain text for simplicity. For production usage, introduce a secure backend with hashing and proper authentication.
- Clearing browser storage (or using private mode) resets stored users and cart data.
- Favorites and sign-in flows rely on `window.AeronixSession`; make sure `session.js` is included before any page-specific scripts.

## License

Free to use and modify!
