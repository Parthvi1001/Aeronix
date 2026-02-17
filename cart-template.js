// ──────────────────────────────────────────────
//  Cart Template – injects cart button, sidebar,
//  overlay & bill modal into <div id="cart-root">
// ──────────────────────────────────────────────
const CART_TEMPLATE = `
    <!-- Cart Floating Button -->
    <button class="cart-icon-btn" onclick="openCart()">
        <i class="bi bi-cart3"></i>
        <span class="cart-badge" id="cartBadge">0</span>
    </button>

    <!-- Cart Overlay -->
    <div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>

    <!-- Cart Sidebar -->
    <div class="cart-sidebar" id="cartSidebar">
        <div class="cart-header">
            <h4><i class="bi bi-cart3"></i> Shopping Cart</h4>
            <button class="cart-close" onclick="closeCart()">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
        <div class="cart-items" id="cartItems">
            <div class="cart-empty">
                <i class="bi bi-cart-x"></i>
                <p>Your cart is empty</p>
            </div>
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span class="cart-total-price" id="cartTotalPrice">₹0</span>
            </div>
            <button class="btn-checkout" onclick="generateBill()">
                <i class="bi bi-receipt"></i> Generate Bill
            </button>
            <button class="btn-clear-cart" onclick="clearCart()">
                <i class="bi bi-trash"></i> Clear Cart
            </button>
        </div>
    </div>

    <!-- Bill Modal -->
    <div class="bill-modal" id="billModal">
        <div class="bill-content">
            <div class="bill-header">
                <h3>AERONIX</h3>
                <p>Invoice <span id="billNumber"></span></p>
                <p id="billDate"></p>
            </div>
            <div class="bill-body" id="billItems"></div>
            <div class="bill-summary">
                <div class="bill-row">
                    <span>Subtotal</span>
                    <span id="billSubtotal">₹0</span>
                </div>
                <div class="bill-row">
                    <span>GST (18%)</span>
                    <span id="billTax">₹0</span>
                </div>
                <div class="bill-row total">
                    <span>Total</span>
                    <span class="bill-amount" id="billTotal">₹0</span>
                </div>
            </div>
            <div class="bill-footer">
                <button class="btn-print" onclick="printBill()">
                    <i class="bi bi-printer"></i> Print
                </button>
                <button class="btn-close-bill" onclick="closeBill()">
                    Close
                </button>
            </div>
        </div>
    </div>
`;

function mountCart() {
    const root = document.getElementById('cart-root');
    if (!root || root.dataset.cartMounted) return;

    root.innerHTML = CART_TEMPLATE;
    root.dataset.cartMounted = 'true';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountCart);
} else {
    mountCart();
}
