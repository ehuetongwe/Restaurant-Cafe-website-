console.log('===== APP.JS FILE IS LOADING =====');

document.addEventListener('DOMContentLoaded', () => {
    console.log('APP.JS: DOMContentLoaded fired');

    // ─── Supabase Client (inside DOMContentLoaded for safety) ────
    let supabase = null;
    try {
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabase = window.supabase.createClient(
                'https://vzwqakkjufbvpagthtif.supabase.co',
                'sb_publishable_XSjWXgIpKTcrTCsHaz3wMQ_-7yPQv4r'
            );
            console.log('APP.JS: Supabase client initialized ✓');
        } else {
            console.warn('APP.JS: Supabase library not available — forms will fall back to phone number');
        }
    } catch (error) {
        console.error('APP.JS: Error initializing Supabase:', error);
    }

    // ─── Close Modal Helper ─────────────────────────────────────────
    function closeModal(modalEl) {
        if (modalEl) {
            modalEl.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // ─── Hamburger Menu ─────────────────────────────────────────────
    try {
        const hamburger = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function () {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
            });

            // Close menu when clicking a nav link
            document.querySelectorAll('.nav-menu a').forEach(function (link) {
                link.addEventListener('click', function () {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
            console.log('APP.JS: Hamburger menu ✓');
        }
    } catch (err) {
        console.error('APP.JS: Hamburger error:', err);
    }

    // ─── Menu Tab Filtering ─────────────────────────────────────────
    try {
        const menuTabs = document.querySelectorAll('.menu-tab');
        const menuContainers = document.querySelectorAll('.menu-container');

        if (menuTabs.length > 0 && menuContainers.length > 0) {
            menuTabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    menuTabs.forEach(function (t) { t.classList.remove('active'); });
                    tab.classList.add('active');
                    var category = tab.getAttribute('data-category');
                    menuContainers.forEach(function (container) {
                        if (container.getAttribute('data-category') === category) {
                            container.classList.remove('hidden');
                        } else {
                            container.classList.add('hidden');
                        }
                    });
                });
            });
            console.log('APP.JS: Menu tabs ✓ (' + menuTabs.length + ' tabs)');
        }
    } catch (err) {
        console.error('APP.JS: Menu tabs error:', err);
    }

    // ─── Menu Swipe / Drag ──────────────────────────────────────────
    try {
        document.querySelectorAll('.menu-container').forEach(function (menuContainer) {
            var isDown = false;
            var startX;
            var scrollLeft;

            menuContainer.addEventListener('mousedown', function (e) {
                isDown = true;
                menuContainer.classList.add('active');
                startX = e.pageX - menuContainer.offsetLeft;
                scrollLeft = menuContainer.scrollLeft;
            });
            menuContainer.addEventListener('mouseleave', function () {
                isDown = false;
                menuContainer.classList.remove('active');
            });
            menuContainer.addEventListener('mouseup', function () {
                isDown = false;
                menuContainer.classList.remove('active');
            });
            menuContainer.addEventListener('mousemove', function (e) {
                if (!isDown) return;
                e.preventDefault();
                var x = e.pageX - menuContainer.offsetLeft;
                menuContainer.scrollLeft = scrollLeft - (x - startX) * 2;
            });
        });
        console.log('APP.JS: Menu swipe ✓');
    } catch (err) {
        console.error('APP.JS: Menu swipe error:', err);
    }

    // ─── Menu Card Fade-in Observer ─────────────────────────────────
    try {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });
        document.querySelectorAll('.menu-card').forEach(function (card) {
            observer.observe(card);
        });
        console.log('APP.JS: Card observer ✓');
    } catch (err) {
        console.error('APP.JS: Card observer error:', err);
    }

    // ─── Smooth Scroll for Navigation Links ─────────────────────────
    try {
        var navLinks = document.querySelectorAll('.nav-menu a:not(.nav-reservations)');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                    e.preventDefault();
                    var targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        var navHeader = document.querySelector('.nav-header');
                        var navHeight = navHeader ? navHeader.offsetHeight : 0;
                        window.scrollTo({
                            top: targetElement.offsetTop - navHeight - 20,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        console.log('APP.JS: Smooth scroll ✓');
    } catch (err) {
        console.error('APP.JS: Smooth scroll error:', err);
    }

    // ─── Reservations Modal ─────────────────────────────────────────
    try {
        var modal = document.getElementById('reservations-modal');
        var reservationsBtn = document.querySelector('.nav-reservations');
        var reservationForm = document.getElementById('reservation-form');

        if (reservationsBtn && modal) {
            reservationsBtn.addEventListener('click', function (e) {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            console.log('APP.JS: Reservations button ✓');
        }

        if (reservationForm) {
            reservationForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var submitBtn = reservationForm.querySelector('[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';

                var formData = new FormData(reservationForm);
                var payload = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone') || null,
                    guests: parseInt(formData.get('guests')) || null,
                    date: formData.get('date'),
                    time: formData.get('time') || null,
                    special_requests: formData.get('special_requests') || null
                };

                if (!supabase) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Find a Table';
                    alert('Online reservations are temporarily unavailable. Please call us directly at (310) 555-0199.');
                    return;
                }

                supabase.from('reservations').insert([payload]).then(function (result) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Find a Table';
                    if (result.error) {
                        alert('Something went wrong. Please try again or call us directly.');
                        console.error('Reservation error:', result.error);
                    } else {
                        alert('Thank you! Your reservation request has been received. We\'ll confirm within 24 hours.');
                        closeModal(modal);
                        reservationForm.reset();
                    }
                }).catch(function (networkErr) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Find a Table';
                    alert('Network error. Please check your connection and try again.');
                    console.error('Reservation network error:', networkErr);
                });
            });
            console.log('APP.JS: Reservation form ✓');
        }
    } catch (err) {
        console.error('APP.JS: Reservations error:', err);
    }

    // ─── Modal Close Wiring (all modals) ────────────────────────────
    try {
        document.querySelectorAll('.modal-close').forEach(function (btn) {
            btn.addEventListener('click', function () {
                closeModal(btn.closest('.modal'));
            });
        });

        document.querySelectorAll('.modal').forEach(function (modalEl) {
            modalEl.addEventListener('click', function (e) {
                if (e.target === modalEl) closeModal(modalEl);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(function (m) {
                    closeModal(m);
                });
            }
        });
        console.log('APP.JS: Modal close handlers ✓');
    } catch (err) {
        console.error('APP.JS: Modal close error:', err);
    }

    // ─── Event Inquiry Modal ────────────────────────────────────────
    try {
        var eventModal = document.getElementById('event-inquiry-modal');
        var eventCtaBtn = document.getElementById('events-cta-btn');
        var eventForm = document.getElementById('event-inquiry-form');

        if (eventCtaBtn && eventModal) {
            eventCtaBtn.addEventListener('click', function (e) {
                e.preventDefault();
                eventModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            console.log('APP.JS: Event CTA button ✓');
        }

        if (eventForm) {
            eventForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var submitBtn = eventForm.querySelector('[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                var formData = new FormData(eventForm);
                var guestCountRaw = formData.get('guest_count');
                var payload = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone') || null,
                    event_type: formData.get('event_type'),
                    event_date: formData.get('event_date') || null,
                    guest_count: guestCountRaw ? parseInt(guestCountRaw) : null,
                    message: formData.get('message')
                };

                if (!supabase) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Inquiry';
                    alert('Online inquiries are temporarily unavailable. Please call us directly at (310) 555-0199.');
                    return;
                }

                supabase.from('event_inquiries').insert([payload]).then(function (result) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Inquiry';
                    if (result.error) {
                        alert('Something went wrong. Please try again or contact us directly.');
                        console.error('Event inquiry error:', result.error);
                    } else {
                        alert('Thank you! We\'ve received your inquiry and will be in touch within 24 hours.');
                        closeModal(eventModal);
                        eventForm.reset();
                    }
                }).catch(function (networkErr) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Inquiry';
                    alert('Network error. Please check your connection and try again.');
                    console.error('Event inquiry network error:', networkErr);
                });
            });
            console.log('APP.JS: Event inquiry form ✓');
        }
    } catch (err) {
        console.error('APP.JS: Event inquiry error:', err);
    }

    // ─── Orphaned CTA Buttons ───────────────────────────────────────
    try {
        document.querySelectorAll('a.cta-button').forEach(function (btn) {
            var href = btn.getAttribute('href');
            var id = btn.getAttribute('id');

            // Skip buttons with their own handlers or valid anchors
            if (btn.classList.contains('nav-reservations') || id === 'events-cta-btn') return;
            if (btn.classList.contains('events-cta') && id === 'events-cta-btn') return;
            if (href && href.startsWith('#') && href.length > 1) return;

            if (href === '#') {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    var text = btn.textContent.trim().toLowerCase();
                    if (text.indexOf('order') !== -1 || text.indexOf('pickup') !== -1) {
                        alert('Online ordering is coming soon! Please call us at (310) 555-0199 to place a pickup order.');
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
                console.log('APP.JS: Orphaned CTA "' + btn.textContent.trim() + '" ✓');
            }
        });
    } catch (err) {
        console.error('APP.JS: Orphaned CTA error:', err);
    }

    // ─── Section Reveal Animations ──────────────────────────────────
    try {
        var revealSections = document.querySelectorAll('.events-section, .instagram-section, .about-section');
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        revealSections.forEach(function (section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            sectionObserver.observe(section);
        });
        console.log('APP.JS: Section reveal animations ✓');
    } catch (err) {
        console.error('APP.JS: Section reveal error:', err);
    }

    // ─── Active Nav Highlight on Scroll ─────────────────────────────
    try {
        var scrollNavLinks = document.querySelectorAll('.nav-menu a:not(.nav-reservations)');
        var sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', function () {
            var scrollPosition = window.scrollY + 100;
            sections.forEach(function (section) {
                var sectionTop = section.offsetTop;
                var sectionHeight = section.offsetHeight;
                var sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    scrollNavLinks.forEach(function (link) {
                        link.classList.remove('active-link');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active-link');
                        }
                    });
                }
            });
        });
        console.log('APP.JS: Scroll nav highlight ✓');
    } catch (err) {
        console.error('APP.JS: Scroll nav error:', err);
    }

    console.log('APP.JS: ===== ALL INITIALIZATION COMPLETE =====');
});
