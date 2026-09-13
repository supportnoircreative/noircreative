import {
  BadgeCheck,
  BarChart3,
  Boxes,
  Clock4,
  Megaphone,
  Search,
  ShieldCheck,
  Star,
  TextQuote,
  TrendingUp,
} from "lucide-react";

/**
 * Maps the string `icon` keys used in src/data/amazonVa.js to lucide icons.
 * Add a key here first if you introduce a new one in the data file.
 */
export const AMAZON_ICONS = {
  search: Search,
  listing: TextQuote,
  ads: Megaphone,
  inventory: Boxes,
  account: BadgeCheck,
  growth: TrendingUp,
  shield: ShieldCheck,
  clock: Clock4,
  reviews: Star,
  report: BarChart3,
};

/** Falls back to a neutral icon so a typo in the data file never crashes a page. */
export function amazonIcon(key) {
  return AMAZON_ICONS[key] ?? BadgeCheck;
}
