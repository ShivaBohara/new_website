// Check if user is logged in and update header icon
function updateAuthIcon() {
    const user = JSON.parse(localStorage.getItem('jiguUser') || 'null');
    const authBtn = document.querySelector('[aria-label="Sign In"]');

    if (user && authBtn) {
        authBtn.setAttribute('aria-label', 'Profile');
        authBtn.setAttribute('title', user.name);
        authBtn.onclick = function() {
            window.location.href = 'pages/profile.html';
        };
    }
}

updateAuthIcon();
// ── WISHLIST SYSTEM ───────────────────────────────
const API = 'http://localhost:5000/api';

async function toggleWishlist(productId, productName, productPrice, heartBtn) {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('jiguUser') || 'null');

    if (!user) {
        // Not logged in — send to login page
        window.location.href = 'pages/auth.html';
        return;
    }

    // Check if already in wishlist
    const wishlist = JSON.parse(localStorage.getItem('jiguWishlist') || '[]');
    const alreadyAdded = wishlist.find(item => item.productId === productId);

    try {
        if (alreadyAdded) {
            // Remove from wishlist
            const response = await fetch(`${API}/wishlist/remove`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, productId })
            });

            if (response.ok) {
                // Update local storage
                const updated = wishlist.filter(i => i.productId !== productId);
                localStorage.setItem('jiguWishlist', JSON.stringify(updated));

                // Update heart button
                heartBtn.style.color = '';
                heartBtn.title = 'Add to wishlist';
                showWishlistToast('Removed from wishlist');
            }
        } else {
            // Add to wishlist
            const response = await fetch(`${API}/wishlist/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, productId, productName, productPrice })
            });

            if (response.ok) {
                // Update local storage
                wishlist.push({ productId, productName, productPrice });
                localStorage.setItem('jiguWishlist', JSON.stringify(wishlist));

                // Update heart button
                heartBtn.style.color = '#cc0000';
                heartBtn.title = 'Remove from wishlist';
                showWishlistToast('Added to wishlist');
            }
        }
    } catch (error) {
        // If backend not running, still save locally
        if (alreadyAdded) {
            const updated = wishlist.filter(i => i.productId !== productId);
            localStorage.setItem('jiguWishlist', JSON.stringify(updated));
            heartBtn.style.color = '';
            showWishlistToast('Removed from wishlist');
        } else {
            wishlist.push({ productId, productName, productPrice });
            localStorage.setItem('jiguWishlist', JSON.stringify(wishlist));
            heartBtn.style.color = '#cc0000';
            showWishlistToast('Added to wishlist');
        }
    }
}

function showWishlistToast(message) {
    // Reuse cart toast if it exists
    const toast = document.getElementById('cartToast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }
}

// Load wishlist state on page load
function loadWishlistState() {
    const wishlist = JSON.parse(localStorage.getItem('jiguWishlist') || '[]');
    wishlist.forEach(item => {
        const btn = document.querySelector(`[data-wishlist-id="${item.productId}"]`);
        if (btn) btn.style.color = '#cc0000';
    });
}

loadWishlistState();
   

