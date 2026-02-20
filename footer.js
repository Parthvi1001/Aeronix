// ──────────────────────────────────────────────
//  Footer Template – injects footer into
//  <div id="footer-root" data-tagline="...">
//  The data-tagline attribute lets each page set
//  a custom description; a default is provided.
// ──────────────────────────────────────────────
const FOOTER_DEFAULT_TAGLINE =
    'Design-led technology for sound and flight, crafted to elevate every experience.';

function buildFooterTemplate(tagline) {
    return `
    <footer class="site-footer">
        <div class="footer-shell">
            <div class="footer-brand-block">
                <div class="footer-brand">AERONIX</div>
                <p class="footer-description">${tagline}</p>
            </div>

            <div class="footer-grid">
                <div class="footer-col">
                    <h6 class="footer-title">Products</h6>
                    <ul class="footer-links">
                        <li><a href="drone.html">Drones</a></li>
                        <li><a href="headphones.html">Headphones</a></li>
                        <li><a href="airburds.html">Earbuds</a></li>
                        <li><a href="aeronix.html#about">Why Aeronix</a></li>
                        <li><a href="index.html">Customer Portal</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h6 class="footer-title">Company</h6>
                    <ul class="footer-links">
                        <li><a href="aeronix.html#about">Our Mission</a></li>
                        <li><a href="aeronix.html#contactSection">Support Team</a></li>
                        <li><a href="mailto:partners@aeronix.com">Partner With Us</a></li>
                        <li><a href="mailto:careers@aeronix.com">Careers</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h6 class="footer-title">Get in Touch</h6>
                    <div class="footer-contact">
                        <span><i class="bi bi-geo-alt"></i> Gujarat, India</span>
                        <a href="tel:+919876543210"><i class="bi bi-telephone"></i> +91 98765 43210</a>
                        <a href="mailto:support@aeronix.com"><i class="bi bi-envelope"></i> support@aeronix.com</a>
                        <span><i class="bi bi-clock"></i> Mon\u2013Fri \u00b7 9am\u20136pm IST</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <span class="footer-copy">\u00a9 2026 AERONIX. All rights reserved.</span>
            <div class="footer-legal">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
            </div>
            <div class="footer-socials footer-bottom-socials">
                <a href="#" class="footer-social" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#" class="footer-social" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" class="footer-social" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                <a href="#" class="footer-social" aria-label="GitHub"><i class="fab fa-github"></i></a>
            </div>
        </div>
    </footer>
    `;
}

function mountFooter() {
    const root = document.getElementById('footer-root');
    if (!root || root.dataset.footerMounted) return;

    const tagline = root.dataset.tagline || FOOTER_DEFAULT_TAGLINE;
    root.innerHTML = buildFooterTemplate(tagline);
    root.dataset.footerMounted = 'true';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountFooter);
} else {
    mountFooter();
}
