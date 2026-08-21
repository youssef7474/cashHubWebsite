---
name: shop-whatsapp-messaging
description: Shop pages' WhatsApp buttons use getShopWhatsAppUrl (pre-filled booking message per shop), mirroring the home page's getWhatsAppUrl pattern
metadata:
  type: project
---

The home page WhatsApp CTA (`Navbar.tsx`) uses `getWhatsAppUrl(locale)` from `src/lib/whatsapp.ts`, which opens `wa.me` with a pre-filled onboarding message to the CashHub sales number. Shop pages previously built raw `https://wa.me/${contact.whatsapp}` links with no pre-filled text, so customers landed in a blank chat.

Added `getShopWhatsAppUrl(whatsappNumber, shopName, locale)` in the same file: builds a bilingual pre-filled booking-inquiry message addressed to the shop by name. Wired into every shop-side WhatsApp link:
- `src/components/shop/ShopSocialLinks.tsx` (shared WhatsApp icon across all 6 theme footers/contact sections) — takes a new `shopName` prop.
- Dedicated WhatsApp CTA buttons in `barber/Contact.tsx`, `midnight/Contact.tsx`, `studio/Find.tsx`.

**Why:** User asked to make shop-page WhatsApp messaging consistent with the home page's pre-filled-message approach, since blank WhatsApp chats gave customers no context.

**How to apply:** Any new theme or WhatsApp touchpoint for a shop should call `getShopWhatsAppUrl` (never build a raw `wa.me` link by hand) and pass `shop.name` so the message is properly addressed. Related: [[whatsapp-number-format]] for how the number itself is normalized before reaching this function.

**Emoji must stay within the Basic Multilingual Plane.** WhatsApp's `wa.me` → `web.whatsapp.com/send` redirect corrupts supplementary-plane emoji (anything needing a UTF-16 surrogate pair / 4-byte UTF-8, e.g. 👋 U+1F44B, 🚀 U+1F680) passed in the `text=` query param into a single U+FFFD replacement character (renders as a black diamond/box) — confirmed 2026-08-21, reproduced even in the sent message on WhatsApp Web, not just the draft. Both `TEMPLATES` and `SHOP_TEMPLATES` in `src/lib/whatsapp.ts` were switched to BMP-safe symbols (✨ U+2728, ⚡️ U+26A1+VS16) which encode as clean 3-byte UTF-8 sequences and survive the redirect. Never add emoji from the Emoticons/Supplemental Symbols blocks (roughly U+1F300+) to any wa.me prefilled text — stick to Dingbats/Misc Symbols (U+2600–U+27BF) or similar BMP ranges, and check with `codePointAt(0) <= 0xFFFF` if unsure.
