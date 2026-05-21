// REVEAL ANIMATION: items fade in as you scroll down (same feel as Yangda)
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach((item, index) => {
        item.style.setProperty("--delay", `${Math.min(index * 60, 300)}ms`);
        observer.observe(item);
    });

   

