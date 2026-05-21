 // Open search when clicking the search icon
document.getElementById('searchToggle').addEventListener('click', function() {
    document.getElementById('searchOverlay').classList.add('is-open');
    document.getElementById('searchInput').focus(); // auto-focus the input
    
});
// Close search when clicking anywhere outside the search bar
document.addEventListener('click', function(e) {
    const overlay = document.getElementById('searchOverlay');
    const toggleBtn = document.getElementById('searchToggle');

    if (!overlay.contains(e.target) && e.target !== toggleBtn) {
        overlay.classList.remove('is-open');
    }
});

// Close search when clicking the X button
document.getElementById('searchClose').addEventListener('click', function() {
    document.getElementById('searchOverlay').classList.remove('is-open');
});
