# Code Changes — Supabase Integration

All changes made to the website codebase to connect it to the Supabase database.

---

## `public/index.html`

### 1. "Plan Your Gathering" button — added `id`

Gave the existing events CTA button a JavaScript-targetable ID so it could open the new event inquiry modal.

```html
<!-- Before -->
<a href="#" class="cta-button events-cta">Plan Your Gathering</a>

<!-- After -->
<a href="#" id="events-cta-btn" class="cta-button events-cta">Plan Your Gathering</a>
```

---

### 2. Reservation form — expanded and fixed

The original form had only 3 fields (guest count, date, time) and none had `name` attributes, so `FormData` couldn't read any values. Updated to:

- Added `name`, `email`, `phone`, `special_requests` fields
- Added `name="guests"`, `name="date"`, `name="time"` attributes to existing fields
- Added `id="reservation-form"` to the form tag
- Updated the disclaimer text

---

### 3. Event inquiry modal — added (entirely new)

A second full modal was added with the id `event-inquiry-modal`, containing a 7-field form:
- Name (required)
- Email (required)
- Phone (optional)
- Event type — dropdown with 6 options (required)
- Preferred date (optional)
- Estimated guest count (optional)
- Message/vision (required)

---

### 4. Scripts added at the bottom

Two script tags added before `app.js`:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<script src="js/debug.js"></script>
```

The Supabase library must load before `app.js` so the client can be initialized at startup.

---

## `public/js/app.js`

### 1. Supabase client initialization — added at top of file

```js
let supabase = null;
try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        supabase = window.supabase.createClient(
            'https://vzwqakkjufbvpagthtif.supabase.co',
            '<anon-key>'
        );
    }
} catch (error) {
    console.error('Error initializing Supabase:', error);
}
```

If the CDN fails to load (network issue, ad blocker), `supabase` stays `null` and the forms fall back gracefully to showing a phone number.

---

### 2. Reservation form handler — replaced

| Before | After |
|---|---|
| `console.log()` the data | Builds a structured payload object |
| `alert()` a generic message | Calls `supabase.from('reservations').insert([payload])` |
| Synchronous | Async/await |
| No loading state | Button disabled + text changes to "Submitting..." during request |
| No error handling | Shows error alert or success alert based on Supabase response |

---

### 3. Modal close logic — refactored

The old code had three separate close handlers targeting one modal. The new code has a shared `closeModal(modalEl)` helper and loops over all `.modal-close` buttons and `.modal` overlays, so both modals are covered by the same logic.

---

### 4. Event inquiry modal and form handler — added

New code added to:
- Open `#event-inquiry-modal` when `#events-cta-btn` is clicked
- Handle form submission with the same async pattern as the reservation form
- Insert into `event_inquiries` table in Supabase
- Show success/error feedback and reset/close the modal on completion
