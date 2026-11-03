# Cinematic Wedding Invitation Website

A responsive, reusable wedding invitation inspired by the uploaded reference video: charcoal/black-and-white photography, warm ivory serif typography, muted gold accents, a floating pill navigation, scroll reveals, event details, countdown, and WhatsApp RSVP.

## Run locally
Open `index.html` in a browser, or use VS Code Live Server for local testing.

## Reuse for another couple
Edit only `config.js`:
- `groom`, `bride`, and `tagline`
- `eventDate` in ISO format including timezone (example: `2026-11-28T11:00:00+05:30`)
- `eventTime`, `venueName`, `venueAddress`, `region`, `mapUrl`
- ceremony details and the six image URLs
- `whatsappNumber` in international format, digits only (India example: `919876543210`)

Replace the sample Unsplash images with the couple's own optimized photographs for a closer match to the video. Keep the image subjects centered because the design uses full-bleed background crops.

## Included interactions
- Sticky rounded couple-name navigation
- Smooth Schedule jump
- Scroll-triggered reveal animations
- Live event countdown
- Google Maps directions link
- RSVP form with Yes / No, guest count, and WhatsApp message handoff

## Deployment
Upload the extracted folder contents to your hosting web root (often `public_html`). Ensure `index.html`, `styles.css`, `config.js`, and `script.js` are in the same directory. No build step or backend is required.

## Notes
This is a fresh implementation based on the visible design and behavior in the supplied screen recording, not a copy of the original site's source code. The reference video does not expose the original source assets or exact animation timings.