document.addEventListener('DOMContentLoaded', () => {
    // Menu Swipe Logic
    const menuContainer = document.querySelector('.menu-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    menuContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        menuContainer.classList.add('active');
        startX = e.pageX - menuContainer.offsetLeft;
        scrollLeft = menuContainer.scrollLeft;
    });

    menuContainer.addEventListener('mouseleave', () => {
        isDown = false;
        menuContainer.classList.remove('active');
    });

    menuContainer.addEventListener('mouseup', () => {
        isDown = false;
        menuContainer.classList.remove('active');
    });

    menuContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - menuContainer.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        menuContainer.scrollLeft = scrollLeft - walk;
    });

    // Optional: Add simple Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.menu-card').forEach(card => {
        observer.observe(card);
    });
});
