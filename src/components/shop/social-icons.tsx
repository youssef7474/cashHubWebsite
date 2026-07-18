import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M14 8.5h2.25V6H14c-1.93 0-3.5 1.57-3.5 3.5V12H8.25v2.5H10.5V21h2.75v-6.5h2.15L16 12h-2.75V9.5c0-.55.45-1 1-1Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M14.2 4c.35 2.05 1.72 3.5 3.8 3.75V10c-1.35-.04-2.58-.5-3.55-1.25v5.4c0 2.95-2.3 5.3-5.2 5.3A5.22 5.22 0 0 1 4 14.25c0-2.9 2.3-5.25 5.25-5.25.35 0 .7.04 1.03.1v2.65a2.6 2.6 0 0 0-1.03-.22 2.55 2.55 0 0 0-2.55 2.55c0 1.4 1.15 2.55 2.55 2.55s2.5-1.12 2.5-2.5V4h2.45Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 3.5A8.45 8.45 0 0 0 3.6 11.9c0 1.49.4 2.94 1.15 4.22L3.5 20.5l4.53-1.19a8.46 8.46 0 0 0 4.01 1.02h.01c4.66 0 8.45-3.79 8.45-8.45 0-2.26-.88-4.38-2.48-5.98A8.42 8.42 0 0 0 12.04 3.5Zm0 15.45h-.01a7.02 7.02 0 0 1-3.57-.98l-.26-.15-2.69.7.72-2.62-.17-.27a7 7 0 0 1-1.08-3.73 7.02 7.02 0 0 1 12.04-4.96 6.96 6.96 0 0 1 2.06 4.97 7.03 7.03 0 0 1-7.04 7.04Zm3.85-5.25c-.21-.1-1.25-.62-1.44-.69-.19-.07-.33-.1-.47.1-.14.21-.54.69-.66.83-.12.14-.24.16-.45.05-.21-.1-.88-.32-1.68-1.03-.62-.55-1.04-1.23-1.16-1.44-.12-.21-.01-.32.09-.43.09-.09.21-.24.31-.36.1-.12.14-.21.21-.35.07-.14.03-.26-.02-.36-.05-.1-.47-1.13-.64-1.55-.17-.41-.34-.35-.47-.36h-.4c-.14 0-.36.05-.55.26-.19.21-.72.7-.72 1.71s.74 1.98.84 2.12c.1.14 1.45 2.21 3.51 3.1.49.21.87.34 1.17.43.49.15.94.13 1.29.08.39-.06 1.25-.51 1.43-1 .18-.49.18-.91.12-.99-.05-.09-.19-.14-.4-.24Z" />
    </svg>
  );
}
