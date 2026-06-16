 // SMOOTH SCROLL: clicking nav links scrolls smoothly to sections
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

// ── MOBILE HAMBURGER MENU ─────────────────────────
const hamburgerBtn   = document.getElementById('hamburgerToggle');
const mobileMenu      = document.getElementById('mobileMenu');
const mobileOverlay   = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');

// ── MACHINES EXPAND/COLLAPSE INSIDE MOBILE MENU ───
const machinesBtn = document.getElementById('machinesExpandBtn');
const machinesSub = document.getElementById('machinesSubmenu');

if (machinesBtn) {
    machinesBtn.addEventListener('click', () => {
        machinesBtn.classList.toggle('is-open');
        machinesSub.classList.toggle('is-open');
    });
}
function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    mobileOverlay.classList.add('is-open');
}
function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    mobileOverlay.classList.remove('is-open');
}

if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

// ── CAROUSEL ARROWS (mobile only) ─────────────────
// Pass the grid id and the arrows-container id; wires < > to scroll
// the grid by one card width each click.
function setupCarousel(gridId, arrowsId) {
    const grid = document.getElementById(gridId);
    const arrowsBox = document.getElementById(arrowsId);
    if (!grid || !arrowsBox) return;

    const leftBtn = arrowsBox.querySelector('.carousel-arrow--left');
    const rightBtn = arrowsBox.querySelector('.carousel-arrow--right');

    function cardWidth() {
        const firstCard = grid.firstElementChild;
        return firstCard ? firstCard.getBoundingClientRect().width + 14 : 300;
        // +14 matches the gap set in CSS
    }

    leftBtn.addEventListener('click', () => {
        grid.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
        grid.scrollBy({ left: cardWidth(), behavior: 'smooth' });
    });
}

setupCarousel('solutionsGrid', 'solutionsArrows');
setupCarousel('eventsGrid', 'eventsArrows');