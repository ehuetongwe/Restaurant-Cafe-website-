document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Menu Tab Filtering Logic
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContainers = document.querySelectorAll('.menu-container');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Get the category to show
            const category = tab.getAttribute('data-category');

            // Hide all menu containers with fade effect
            menuContainers.forEach(container => {
                if (container.getAttribute('data-category') === category) {
                    container.classList.remove('hidden');
                } else {
                    container.classList.add('hidden');
                }
            });
        });
    });

    // Menu Swipe Logic for each container
    menuContainers.forEach(menuContainer => {
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

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-reservations)');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navHeight = document.querySelector('.nav-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Reservations Modal Functionality
    const modal = document.getElementById('reservations-modal');
    const reservationsBtn = document.querySelector('.nav-reservations');
    const closeBtn = document.querySelector('.modal-close');
    const reservationForm = document.querySelector('.reservation-form');

    // Open modal
    if (reservationsBtn) {
        reservationsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Handle reservation form submission
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(reservationForm);
            const reservationData = {
                people: formData.get('people') || 'Not specified',
                date: formData.get('date') || 'Not specified',
                time: formData.get('time') || 'Not specified'
            };

            // Log reservation data (in production, this would send to a server)
            console.log('Reservation submitted:', reservationData);

            // Show success message (you could replace this with a nicer modal)
            alert('Thank you for your reservation request! We will contact you shortly to confirm.');

            // Close modal and reset form
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            reservationForm.reset();
        });
    }

    // Add smooth reveal animations as user scrolls
    const revealSections = document.querySelectorAll('.events-section, .instagram-section, .about-section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // Add active state to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100; // Offset for fixed header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    });
});
