export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
