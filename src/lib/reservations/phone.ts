const PHONE_PATTERN = /^\d{8,15}$/;

/** Normalize and expand common Egypt/local phone formats for lookup. */
export function phoneLookupVariants(phone: string): string[] {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return [];

  const variants = new Set<string>([digits]);

  // 01xxxxxxxxx → 1xxxxxxxxx, 201xxxxxxxxx
  if (digits.startsWith("0") && digits.length >= 10) {
    const withoutZero = digits.slice(1);
    variants.add(withoutZero);
    variants.add(`20${withoutZero}`);
  }

  // 1xxxxxxxxx (10 digits) → 01xxxxxxxxx, 201xxxxxxxxx
  if (digits.startsWith("1") && digits.length === 10) {
    variants.add(`0${digits}`);
    variants.add(`20${digits}`);
  }

  // 201xxxxxxxxx → 1xxxxxxxxx, 01xxxxxxxxx
  if (digits.startsWith("20") && digits.length >= 12) {
    const national = digits.slice(2);
    variants.add(national);
    variants.add(`0${national}`);
  }

  return [...variants].filter((v) => PHONE_PATTERN.test(v));
}

export function isValidPhoneDigits(phone: string): boolean {
  return PHONE_PATTERN.test(phone.replace(/\D/g, ""));
}
