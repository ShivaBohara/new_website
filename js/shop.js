// ── CART SYSTEM ──────────────────────────────────

// Load cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem('jiguCart')) || [];

// Update cart count badge in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.textContent = count;
        badge.classList.toggle('has-items', count > 0);
    }
}

// Add item to cart
function addToCart(id, name, price, image) {

    // check if item already in cart
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        // just increase quantity
        existingItem.quantity += 1;
    } else {
        // add new item
        cart.push({ id, name, price, image, quantity: 1 });
    }

    // save to localStorage
    localStorage.setItem('jiguCart', JSON.stringify(cart));

    // update badge
    updateCartCount();

    // show toast
    showToast();
}

// Show "added to cart" notification
function showToast() {
    const toast = document.getElementById('cartToast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ── FILTER SYSTEM ────────────────────────────────

const filterBtns = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        // update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        productItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ── INIT ─────────────────────────────────────────
updateCartCount();