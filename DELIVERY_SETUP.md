# Starter Kit Delivery Setup - System 1

## Files that exist and are ready to deliver
- 01_Business_Planner.pdf
- 02_Client_Contract_Template.pdf
- 03_Launch_Checklist.pdf
- 04_Invoice_Template.pdf
- 05_Pricing_and_Offer_Worksheet.pdf
- 06_30_Day_Content_Calendar.pdf
- Texas_Small_Business_Starter_Kit.zip (all 6)

## Option A - Lemon Squeezy (Recommended for first launch, fastest)
1. lemonsqueezy.com > Create Product > Digital Product
2. Name: Texas Small Business Starter Kit
3. Price: $47 one-time
4. Upload: Texas_Small_Business_Starter_Kit.zip
5. Enable: Instant delivery email + License / Download link
6. Add: Terms, Privacy, Refund Policy URLs
7. Test: Buy with test card 4242 4242 4242 4242, check email delivers ZIP, download works
8. Go live: Replace test mode with live mode, paste checkout link into store page

## Option B - Stripe + File Delivery
1. Stripe Dashboard > Product > $47
2. Use Stripe Payment Links + a delivery service (e.g. SendOwl, Gumroad) OR
3. Host ZIP in Supabase Storage (private bucket) + generate signed URL after webhook confirms payment
4. Webhook: checkout.session.completed -> create signed URL (24h expiry) -> email to buyer

## What NOT to do
- Do NOT link directly to the ZIP on a public page - anyone could download without paying
- Do NOT promise instant delivery until you have tested a full purchase yourself
- Do NOT sell until refund policy is published

## Test checklist before launch
- [ ] Test purchase completes
- [ ] Email arrives within 2 minutes
- [ ] ZIP downloads and opens, all 6 PDFs inside
- [ ] Refund flow tested
- [ ] Receipt shows Dustin Carl Umfress as seller
