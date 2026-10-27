export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Classes that keep a lone last card from hanging off the left of a 2- or
 * 3-column grid: it spans both columns on tablet and sits in the middle
 * column on desktop.
 */
export function serviceGridItemClass(index, count) {
  if (index !== count - 1) return undefined;
  return cn(count % 2 === 1 && "sm:col-span-2 lg:col-span-1", count % 3 === 1 && "lg:col-start-2");
}
