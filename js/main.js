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

   

