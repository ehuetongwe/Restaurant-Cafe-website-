// Debug script — runs after DOM is ready so element queries are reliable
document.addEventListener('DOMContentLoaded', () => {
    console.log('DEBUG: DOMContentLoaded fired!');

    const elements = {
        'Hamburger button': document.querySelector('.hamburger-menu'),
        'Nav menu': document.querySelector('.nav-menu'),
        'Menu tabs': document.querySelectorAll('.menu-tab'),
        'Reservations modal': document.getElementById('reservations-modal'),
        'Reservations button': document.querySelector('.nav-reservations'),
        'Reservation form': document.getElementById('reservation-form'),
        'Events modal': document.getElementById('event-inquiry-modal'),
        'Events CTA button': document.getElementById('events-cta-btn'),
        'Event inquiry form': document.getElementById('event-inquiry-form'),
        'Modal close buttons': document.querySelectorAll('.modal-close'),
        'CTA buttons': document.querySelectorAll('.cta-button')
    };

    let missing = [];
    for (const [name, el] of Object.entries(elements)) {
        const found = el instanceof NodeList ? el.length > 0 : !!el;
        console.log(`  ${found ? '✓' : '✗'} ${name}:`, el);
        if (!found) missing.push(name);
    }

    if (missing.length > 0) {
        console.warn('DEBUG: Missing elements:', missing.join(', '));
    } else {
        console.log('DEBUG: All critical elements found ✓');
    }

    // Report Supabase status
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        console.log('DEBUG: Supabase library loaded ✓');
    } else {
        console.warn('DEBUG: Supabase library NOT loaded — form submissions will fall back to phone prompt');
    }
});
