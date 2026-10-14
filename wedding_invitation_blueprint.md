# Wedding Invitation Experience Blueprint

This document records the proposed implementation for the Razia & Abduraziq engagement invitation experience, as outlined by the project stakeholder. It captures the agreed technology stack, asset requirements, and the high-level workflow to be executed in Codex or an equivalent code-generation environment.

## Tech Stack Overview

| Layer | Technology |
| --- | --- |
| Frontend | React + Vite + Framer Motion |
| Authentication | Invite code lookup (Firestore + Local sync) |
| Database | Firebase Firestore |
| Storage | Local + Cloud sync |
| Reveal Animation | Silk curtains with gold tassels |
| Bismillah Presentation | Floating gold calligraphy with soft light rays |
| Soundscape | Oud + Qanun + soft wind chime (toggle for non-instrument mode) |
| Countdown | Hijri + Gregorian support |
| Admin Panel | Guest management, RSVP tracking, personalised name pairing |
| Offline Fallback | Local mode when Firebase is unavailable |

## Folder Structure

```
src/
 ┣ assets/
 ┃ ┣ envelope.png
 ┃ ┣ waxseal.png
 ┃ ┣ invitecard.png
 ┃ ┣ silk-curtain-left.png
 ┃ ┣ silk-curtain-right.png
 ┃ ┣ sparkle-overlay.mp4
 ┃ ┣ bismillah-gold.png
 ┃ ┗ nasheed-soft.mp3
 ┣ components/
 ┃ ┣ CurtainReveal.jsx
 ┃ ┣ BismillahIntro.jsx
 ┃ ┣ Envelope.jsx
 ┃ ┣ InvitationCard.jsx
 ┃ ┣ RSVP.jsx
 ┃ ┣ Countdown.jsx
 ┃ ┗ AudioToggle.jsx
 ┣ pages/
 ┃ ┣ GuestEntry.jsx
 ┃ ┗ AdminDashboard.jsx
 ┣ data/
 ┃ ┗ guestData.js
 ┣ firebase.js
 ┣ App.jsx
 ┗ index.css
index.jsx
```

## Codex Prompt

Paste the following prompt into Codex to generate the full implementation:

```
You are building a wedding invitation site for a Muslim couple with animated reveal.

Theme: White marble + gold + emerald accents
Fonts: Serif luxury + Islamic Thuluth Bismillah image overlay
Aesthetic: Silk curtains reveal, gold light rays, firefly sparkles, wax seal, oud nasheed

Build this React app with Vite.

Features:
- Invite code entry field
- Look up guest in Firestore (fallback JSON + LocalStorage sync)
- Play nasheed (toggle ON/OFF)
- Curtain opens (framer motion)
- Bismillah gold calligraphy appears with light rays glow
- Envelope with wax seal appears
- On click seal → wax melts, envelope opens
- Invitation card slides up
- Show names: “Welcome to the Engagement of Razia & Abduraziq”
- Guest name appears beautifully beneath title
- Countdown to 16 December 2025 + 25 Jumada al-Thani 1447 AH
- After date unlock photo upload + message wall
- Admin dashboard (secured by secret URL + passcode)
- Admin can add guests, assign partners, mark RSVP

Pages:
- / → invite code
- /invite → reveal
- /admin → dashboard

Important:
- Animate curtains with realistic fabric motion
- Elegant gold sparkles, not childish confetti
- Audio autoplay only after user click (Islamic etiquette mode toggle)
- Mobile-first

Assets placeholders:
src/assets:
  envelope.png
  waxseal.png
  invitecard.png
  silk-curtain-left.png
  silk-curtain-right.png
  sparkle-overlay.mp4
  bismillah-gold.png
  nasheed-soft.mp3

Generate code for every file listed in folder structure.
Do NOT leave placeholders. Output full code.
After generating each file, continue until entire system complete.
```

## Asset Guide

| File | Purpose |
| --- | --- |
| envelope.png | Paper envelope front |
| waxseal.png | Melt seal with click |
| invitecard.png | Invitation watercolor |
| silk-curtain-left.png | Left curtain panel |
| silk-curtain-right.png | Right curtain panel |
| sparkle-overlay.mp4 | Subtle sparkle effect overlay |
| bismillah-gold.png | Bismillah calligraphy asset |
| nasheed-soft.mp3 | Soft nasheed / oud soundtrack |

## Experience Notes

- Greeting copy: “Assalamu Alaikum, [Guest Name]\nWe are honoured to invite you to a blessed celebration of love & unity.\nRazia & Abduraziq\n🕊️ Engagement Ceremony”.
- Soft harp chime accompanies the curtain reveal.
- Bismillah glow is synchronised with gold dust particle sweep before the envelope animation.
- Invitation card ascends once the wax seal melts on tap/click.

## Next Steps

Once the generated project builds successfully, share the outcome so Firebase rules, domain setup, admin PIN, nasheed toggle fallback, storage synchronisation, and polish items can be provided.
```
