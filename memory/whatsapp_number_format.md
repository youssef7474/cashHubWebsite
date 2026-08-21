---
name: whatsapp-number-format
description: Egyptian shop numbers are stored local-format (leading 0, no country code); wa.me links need "2" prepended, not "20" appended-style conversion
metadata:
  type: project
---

Shop phone/WhatsApp numbers in Supabase (`shop.shop_number`, `social.phone`/`social.whatsapp`) are stored in local Egyptian format with a leading 0 and no country code, e.g. `01001234567`. WhatsApp's `wa.me` links require the international format instead: `201001234567`.

Because Egyptian local numbers already start with `0`, the correct conversion is simply prepending the digit `2` to the raw digits — `2` + `01001234567` = `201001234567`. This is NOT the same as stripping the leading 0 and adding country code `20` as two separate steps; it collapses into one prepend because of the existing leading zero.

**Why:** Confirmed working with the user 2026-08-21 after `ShopSocialLinks`/shop `Contact` WhatsApp buttons opened blank/broken chats — the numbers were missing the country code entirely.

**How to apply:** This normalization lives in `src/lib/shops/get-shop-from-supabase.ts` (the `whatsapp` derivation, guarded with `!whatsappDigits.startsWith("20")` so it's idempotent and skips empty numbers). Any new code path that reads a phone/WhatsApp number from Supabase for use in a `wa.me` link should go through `contact.whatsapp` from `ShopWebsiteData` rather than re-deriving it from `shop.shop_number` directly, to avoid duplicating or missing this fix. See [[shop-whatsapp-messaging]] for the related pre-filled-message work done in the same session.
