# Implement Chill Vibe Theme
> Directive for building the "Chill Vibe" Restaurant/Café website.

## Goal
Create a mobile-first, responsive website with a "chill," cozy aesthetic, featuring ambient video backgrounds and an interactive swipeable menu.

## Requirements
1.  **Aesthetic ("Chill Vibe")**:
    - Colors: Warm, earthy tones (latte, sage green, soft charcoal), or deep cozy dark mode.
    - Typography: Clean sans-serif for body, elegant serif or handwritten font for headings.
    - Media: Ambient video background (looping coffee, nature).
2.  **Functionality**:
    - **Mobile-First Menu**: The menu should be the star. Implement swipe/drag gestures to navigate categories or items.
    - **CTA**: Clear "Book Table" or "Order Online" buttons.
3.  **Content**:
    - Headline: Inviting and cozy.
    - Client Angle: "I bring hospitality brands to life with cozy, inviting digital vibes." (Include this in the About/Footer).

## Implementation Steps
1.  **Structure (`public/index.html`)**:
    - Hero Section: Full-screen video background, main headline, primary CTA.
    - Menu Section: Horizontal scroll or card stack for mobile swipe interactions.
    - About/Info Section: Contact info, location, and the "Client angle" text.
2.  **Styling (`public/css/style.css`)**:
    - Use CSS Variables for easy theming.
    - Glassmorphism effects for overlay text on video.
    - Smooth transitions.
3.  **Interactivity (`public/js/app.js`)**:
    - Touch event listeners (`touchstart`, `touchmove`, `touchend`) for the menu.
    - Video loading optimization.

## Edge Cases
- **Video Failure**: Provide a high-quality fallback image if the video fails to load or autoplay is blocked.
- **Accessibility**: Ensure high contrast text over video (use overlays). Keyboard navigation for the menu.
