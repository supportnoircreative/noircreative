export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Classes that keep a lone last card from hanging off the left of a 2- or
 * 3-column grid: it spans both columns on tablet and sits in the middle
 * column on desktop. `slots` is the desktop slot count, which differs from
 * the card count when a featured card spans two columns.
 */
export function serviceGridItemClass(index, count, slots = count) {
  if (index !== count - 1) return undefined;
  return cn(count % 2 === 1 && "sm:col-span-2 lg:col-span-1", slots % 3 === 1 && "lg:col-start-2");
}

/** Desktop grid slots a list of services occupies (featured cards take two). */
export function serviceSlots(services) {
  return services.reduce((n, s) => n + (s.featured ? 2 : 1), 0);
}
