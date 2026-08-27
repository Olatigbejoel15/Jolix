# Jolix

A logistics platform for creating shipments, dispatching drivers, and tracking deliveries in real time.

## Tech stack
- Frontend: Next.js, TypeScript, Tailwind CSS
- Animation: Framer Motion
- Icons: Bootstrap Icons
- Backend (coming later): Laravel

## Progress log

### Day 1
- Project scaffolded with `create-next-app` (TypeScript, Tailwind, App Router)
- Installed Framer Motion and Bootstrap Icons
- Set up Jolix brand colors and fonts (`globals.css`, `layout.tsx`)

## Getting started
```bash
npm install
npm run dev
```
Then open http://localhost:3000

### Day 2
- Built the full homepage: Hero (with real background photo + animated delivery scene), Trust strip, How it works, Services, Built for everyone, Live tracking showcase, Drive with Jolix banner, Final CTA, Footer
- Responsive navbar with working mobile hamburger menu
- Established the guest-checkout decision: shipments can be created without an account

### Day 3
- Built Login and Signup pages with a shared AuthLayout (full-bleed photo background, centered card)
- Built Track a shipment: search page + dynamic /track/[trackingId] results page with progress timeline
- Built the full Drive with Jolix page (hero, perks, requirements, how it works, FAQ, CTA)
- Built the driver application form at /drivers/apply, with a confirmation state on submit