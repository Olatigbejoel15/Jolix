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

### Day 4
- Built About, Services, and Contact pages (all footer links now go somewhere real)
- Contact page includes a working form with a confirmation state
- Entire public-facing site is now complete: Home, Login, Signup, Track, Drivers (+ apply), About, Services, Contact

### Day 5
- Built the full driver portal: DriverLayout (sidebar + mobile drawer), Today's Deliveries (accept/start actions), Delivery Detail (status progression, proof-of-delivery photo upload, notes), Earnings, and Driver Profile
- Added the Jolix favicon (icon.svg), reusing the delivery van shapes from DeliveryScene for brand consistency
- Fixed all "Create a shipment" links across the site to point to the new standalone /ship page instead of /signup, preserving guest checkout
- Moved shipment creation out of the customer dashboard into its own /ship route, so it stays accessible without login while /dashboard remains the logged-in-only area

### Day 6
- Built the full admin dashboard: AdminLayout, Overview (stats + weekly shipment chart), Shipments (search, filter, driver assignment, cancel), Drivers (add, activate/deactivate, performance), Fleet (vehicles, assignment, maintenance log), Analytics (revenue bar chart, shipment line chart, status breakdown donut chart)
- Installed Recharts for all chart rendering
- Entire Jolix frontend is now complete: full public site, customer dashboard, driver portal, and admin dashboard — all three portals from the original spec, built with mock data standing in for the real backend

## Next phase
Frontend is done. Next up: the Laravel backend — real database, authentication (Sanctum), real pricing via a maps API, real tracking ID generation, payments (Paystack), and Laravel Reverb for live tracking via WebSockets. Maps (Mapbox/Google Maps) also deferred until real GPS data exists.