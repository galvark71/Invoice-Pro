# Invoice Pro - Real Next.js + Supabase App
Owner: Dustin Carl Umfress

## What this is
Production-ready starter code for Invoice Pro (System 2). Not a demo shell.
- Next.js 14 App Router
- Supabase for clients, invoices, items
- Dashboard, New Invoice, Clients, All Invoices pages

## 1. Create Supabase project
1. Go to supabase.com > New Project
2. Copy Project URL + anon key + service role key
3. In Supabase > SQL Editor > New Query > paste `supabase/schema.sql` > Run
4. Verify tables: profiles, clients, invoices, invoice_items exist

## 2. Run locally
```
npm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
# open http://localhost:3000
```
Test: Create a client, create an invoice, check Supabase Table Editor - row must appear.

## 3. Deploy to Vercel
1. Push this folder to GitHub
2. vercel.com > Import Project
3. Add env vars from .env.local
4. Deploy. Your live URL is your real app.

## 4. Payments (do this AFTER app works)
- Stripe Dashboard > Products > Create $9/mo and $79/year
- Add Stripe Checkout to /new page later, or use Lemon Squeezy checkout link
- Do NOT take payments until Terms, Privacy, Refund pages are live

## Launch blocker checklist
- [ ] Supabase tables created
- [ ] .env.local filled
- [ ] Test invoice saves and appears in Supabase
- [ ] Vercel deploy succeeds
- [ ] Terms / Privacy / Refund live
- [ ] THEN announce

## Delivery for Starter Kit (System 1)
Starter Kit ZIP is delivered via Lemon Squeezy / Stripe file delivery, NOT from this app.
Steps in DELIVERY_SETUP.md
