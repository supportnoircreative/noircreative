/* ==========================================================================
   Amazon Growth: single source of content for the Amazon page (see
   AMAZON_PATH) and its home teaser. Everything rendered on that page is
   defined here; the components only lay it out. Swap this file's values for
   your own and nothing else needs to change.

   Editing rules of thumb
   ----------------------
   • `icon` fields accept only the keys listed in AMAZON_ICON_KEYS below
     (they map to lucide-react icons inside the components).
   • Arrays are rendered in order, and every list is length-agnostic: add or
     remove entries freely. The layouts read best at:
       principles 4 · platforms 5 (3 + 2) · process 4 · caseStudies 2–5
       metrics 3 or 4 per case study · closing 2
   • Headline arrays are [plain line, accent line]: the second line renders
     in the accent colour.
   • `accent` on a case study tints its metric rail: "lime" | "violet".
   • Keep metric `value` short (≤7 chars): it renders at display size.
   ========================================================================== */

/** Where the Amazon service lives. Every link, canonical, sitemap entry and
    schema URL builds from this, so the address is defined exactly once. The
    old /amazon-va URLs redirect here (see next.config.mjs). */
export const AMAZON_PATH = "/amazon-growth";

/** Icon keys the Amazon components know how to render. */
export const AMAZON_ICON_KEYS = [
  "search",
  "listing",
  "ads",
  "inventory",
  "account",
  "growth",
  "shield",
  "clock",
  "reviews",
  "report",
  "margin",
  "store",
];

export const amazonVa = {
  /* ---------------------------------------------------------------- hero */
  hero: {
    eyebrow: "Amazon & Walmart account management",
    title: ["Amazon growth, driven by data.", "Run by people, not\u00A0bots."],
    // One clear promise. Keep it under ~30 words: it sits directly under an
    // oversized headline and competes with it if it runs long.
    description:
      "We take full ownership of your Amazon and Walmart accounts. Listings, advertising, inventory and account health run as one strategy, reported against revenue, margin and TACoS.",
    primaryCta: { label: "Get a free account audit", href: "/contact" },
    secondaryCta: { label: "See the results", href: "#amazon-case-studies" },
    // Small trust line beneath the buttons.
    footnote: "No retainer to see the audit. You keep the findings either way.",
    // Marketplace strip under the hero, grouped by marketplace. Plain text
    // badges rather than logos, so no trademark artwork is reproduced.
    marketplaces: [
      { group: "Amazon", items: ["Seller Central", "Vendor Central", "Amazon Ads", "Brand Registry"] },
      { group: "Walmart", items: ["Walmart Marketplace", "Walmart Connect"] },
    ],
  },

  /* ------------------------------------------------- floating proof panel
     The tiles are built from caseStudies.items below (first metric of each),
     so this block only holds the panel's own heading. */
  proof: {
    eyebrow: "Proof, not promises",
    title: ["Accounts we took over,", "in their own numbers."],
    desc: "Every figure comes straight from the client's own Seller Central reports.",
  },

  /* --------------------------------------------------- what's different */
  principles: {
    eyebrow: "Why it works",
    title: ["Not a task list.", "An owner for the account."],
    desc: "A VA works the queue you hand them. We own the outcome, and run every lane of the account towards it.",
    items: [
      {
        icon: "account",
        title: "Full ownership",
        body: "One team accountable for the whole account, so listings, ads and stock decisions stop pulling in different directions.",
      },
      {
        icon: "margin",
        title: "Margin first",
        body: "Growth measured against profit, not impressions. Every campaign answers to a TACoS target, not a spend budget.",
      },
      {
        icon: "report",
        title: "Clear reporting",
        body: "One dashboard and one weekly summary: what moved, what didn't, and what happens next.",
      },
      {
        icon: "growth",
        title: "Compounding growth",
        body: "Catalogue, advertising and reviews feed each other, so this quarter's gains make next quarter cheaper to win.",
      },
    ],
  },

  /* ------------------------------------------------------- what we run
     `marketplace` is the small badge on each card; `deliverables` is the
     list revealed by "See more". */
  platforms: {
    eyebrow: "What we run",
    title: ["Every lane,", "one strategy."],
    desc: "Amazon and Walmart, managed end to end. Open any card for the full scope.",
    items: [
      {
        icon: "listing",
        marketplace: "Amazon",
        title: "Seller Central",
        body: "Catalogue, listings, SEO and the daily operations inside Seller Central, from flat files to suppressed ASINs.",
        deliverables: [
          "Keyword-mapped listings",
          "Backend search terms",
          "Variation & flat-file fixes",
          "Inventory & FBA planning",
          "Account health & cases",
          "Reimbursement claims",
        ],
      },
      {
        icon: "ads",
        marketplace: "Amazon",
        title: "Amazon Advertising",
        body: "Sponsored Products, Brands and Display built around margin, with weekly bid, budget and negative-keyword passes against a TACoS target.",
        deliverables: [
          "Campaign architecture",
          "Bid & budget passes",
          "Negative keyword mining",
          "Placement tuning",
          "Search-term reporting",
        ],
      },
      {
        icon: "reviews",
        marketplace: "Amazon",
        title: "Brand Registry & Retention",
        body: "The Brand Registry tools that lift conversion and repeat purchase: A+ content, storefronts, Subscribe & Save and review monitoring.",
        deliverables: [
          "A+ content & brand story",
          "Brand Store",
          "Subscribe & Save",
          "Review & feedback monitoring",
          "Brand Analytics insights",
        ],
      },
      {
        icon: "store",
        marketplace: "Walmart",
        title: "Walmart Marketplace",
        body: "Item setup, content, pricing and fulfilment on Walmart, run with the same discipline as your Amazon account.",
        deliverables: [
          "Item setup & content",
          "Listing quality score",
          "Pricing & Buy Box",
          "Walmart Fulfillment Services",
          "Seller performance",
        ],
      },
      {
        icon: "ads",
        marketplace: "Walmart",
        title: "Walmart Connect",
        body: "Sponsored Search on Walmart, structured and optimised to the same margin targets as your Amazon advertising.",
        deliverables: [
          "Sponsored Search campaigns",
          "Keyword & bid management",
          "Budget pacing",
          "Performance reporting",
        ],
      },
    ],
  },

  /* ------------------------------------------------------ how engagement runs */
  process: {
    eyebrow: "How it runs",
    title: ["Four steps to", "hands-off growth."],
    steps: [
      {
        id: "01",
        title: "Audit",
        body: "We go through the account line by line, covering listings, campaigns, health and stock, and hand you a prioritised findings doc. Free, and yours regardless.",
      },
      {
        id: "02",
        title: "Plan",
        body: "The findings become a 90-day roadmap with owners, dates and a target metric per lane. You approve it before anyone touches the account.",
      },
      {
        id: "03",
        title: "Run",
        body: "Your account team works inside Seller Central and Walmart Seller Center every day, with role-scoped access. Slack or WhatsApp for anything urgent.",
      },
      {
        id: "04",
        title: "Report",
        body: "One dashboard, one weekly summary: what moved, what didn't, what's next. No invoices padded with activity you can't verify.",
      },
    ],
  },

  /* ------------------------------------------------------- case studies
     Transcribed from the client decks in public/casestudies/. Every figure
     below appears in one of those PDFs — nothing here is estimated or
     rounded up. Order here is the order shown.

     `testimonial` is optional and deliberately absent: the source decks
     contain performance data, not client quotes. Add one to an entry and the
     card renders it automatically.

     `pdf` links the full deck. Those files are served from /public, so the
     link makes them publicly downloadable — remove the field if a deck
     shouldn't be reachable from the site. */
  caseStudies: {
    eyebrow: "Exclusive case studies",
    title: ["Receipts, not", "round numbers."],
    desc: "Four accounts we took over, what was actually broken, and what the numbers looked like afterwards.",
    side: "Every figure comes from the client's own Seller Central Business Reports and Advertising console.",
    items: [
      {
        id: "cs-pearl-linens",
        slug: "pearl-linens",
        tab: "Home & Linens",
        accent: "lime",
        client: "Pearl Linens, private-label home textiles",
        category: "Home & Linens · FBA · US",
        timeline: "24 months",
        scope: ["Listing & conversion", "PPC efficiency", "Subscribe & Save"],
        headline: "From break-even to breakthrough: 12× monthly revenue without buying growth at a loss.",
        challenge:
          "A sub-scale operation doing ~$14.8K a month on 419 units, swinging between $15K and $49K with no reliable trend. Advertising ran hot, quarterly profit sat at −$9.3K on a −2.75% margin, and almost all traffic came from category search, and branded demand was effectively non-existent.",
        approach: [
          "Optimised titles, imagery and A+ content, lifting session-to-purchase conversion from 7.55% to 16.01%.",
          "Tightened campaign structure and bidding, pulling Real ACOS from 18.74% down to 14.60%.",
          "Built Subscribe-and-Save and reorder flows that nearly doubled active subscriptions in a single quarter (70 → 145).",
          "Scaled to 58,416 units ordered with fulfilment reliable enough to sustain the higher velocity.",
          "Grew awareness customers ~2× year on year, widening the funnel beyond category search.",
        ],
        metrics: [
          { value: "12×", label: "Monthly revenue", note: "$14.8K → $178.6K" },
          { value: "$1.78M", label: "Cumulative sales", note: "58,416 units · 24 months" },
          { value: "+14.6", label: "Net margin, points", note: "−2.75% → +11.90%" },
          { value: "2.1×", label: "Conversion rate", note: "7.55% → 16.01%" },
        ],
        tools: ["Seller Central", "Amazon Ads", "Brand Analytics", "Subscribe & Save"],
        pdf: "/casestudies/Pearl%20Linens%20Growth%20Case%20Study.pdf",
      },
      {
        id: "cs-supplements",
        slug: "supplement-brand",
        tab: "Supplements",
        accent: "violet",
        client: "Supplement brand, multi-SKU sports nutrition",
        category: "Health & Household · Amazon Advertising · US",
        timeline: "24 months",
        scope: ["PPC restructure", "TACoS discipline", "Organic rank"],
        headline: "35%+ sustained growth built on TACoS discipline, not bigger budgets.",
        challenge:
          "High-quality products with no structured approach to ad spend. ACoS was the only metric tracked, so real per-SKU profitability was invisible. Campaigns leaked on broad match with no separation between branded, category and competitor targeting, and only hero SKUs got budget, leaving secondary products with no path to growth.",
        approach: [
          "Rebuilt campaign architecture: branded, category and competitor targeting separated, autos reduced to harvesting only.",
          "Scaled spend on top-revenue SKUs and pushed Top-of-Search dominance to lock organic rank through sustained velocity.",
          "Built dedicated campaigns for secondary ASINs, graduating high-CVR products to full investment.",
          "Shifted from ACoS to per-ASIN TACoS as the true-north metric, with every bid and budget decision flowing from margin targets.",
          "As rank improved, eased bid aggression on ranking terms and freed budget for keyword expansion.",
        ],
        metrics: [
          { value: "$9.8M", label: "Revenue", note: "24 months · 329K order items" },
          { value: "357K", label: "Units ordered", note: "avg $29.76 per order" },
          { value: "21.9%", label: "TACoS controlled", note: "with margin guardrails" },
          { value: "75M+", label: "Impressions", note: "all ad formats" },
        ],
        tools: ["Amazon Ads", "Campaign Manager", "Seller Central", "Business Reports"],
        pdf: "/casestudies/Supplement%20Case%20Study.pdf",
      },
      {
        id: "cs-dental",
        slug: "dental-care",
        tab: "Dental Care",
        accent: "lime",
        client: "Dental care brand, nightguards & denture care",
        category: "Health & Household · Amazon PPC · US",
        timeline: "Jan - Jun 2026",
        scope: ["Cannibalisation fix", "Category capture", "ROAS recovery"],
        headline: "From ROAS crisis to category dominance: a brand that was paying to cannibalise itself.",
        challenge:
          "ROAS had fallen below 2.0 and high ACOS was eating product margins. The account bid aggressively on its own brand keywords in broad and phrase match, paying for traffic that would have converted organically, while holding virtually no presence on high-volume category terms like 'dental night guard' and 'denture cleaner'. Competitors owned that space entirely.",
        approach: [
          "Isolated branded terms into exact-match-only campaigns with strict negatives to stop brand bleed, cutting branded spend 60%.",
          "Launched dedicated category campaigns with aggressive Top-of-Search bids, gaining impression share in target dental terms within 30 days.",
          "Paused low-CVR, high-spend ad groups dragging ROAS below 2.0 and set ACOS targets by product margin tier.",
          "Ran competitor ASIN targeting and category remarketing, driving 1,903 New-to-Brand purchases.",
          "Layered Subscribe & Save coupons (10-25%) to lower the perceived price point and build recurring revenue.",
        ],
        metrics: [
          { value: "3.04", label: "ROAS", note: "from sub-2.0 at onboarding" },
          { value: "$679K", label: "Sales, YTD", note: "Jan - 9 Jun 2026" },
          { value: "+121%", label: "Awareness customers", note: "397K in Q1 2026" },
          { value: "+57%", label: "Consideration growth", note: "4.25× category median" },
        ],
        tools: ["Amazon Ads", "Brand Analytics", "Customer Journey Analytics", "Seller Central"],
        pdf: "/casestudies/Dental%20PPC%20-%20Case%20Study%20(2).pdf",
      },
      {
        id: "cs-essential-oils",
        slug: "essential-oils",
        tab: "Essential Oils",
        accent: "violet",
        client: "Essential oils brand, 38 active SKUs",
        category: "Health & Household · Amazon PPC · US",
        timeline: "Jan - Jun 2026",
        scope: ["Account audit", "Campaign rebuild", "Retention"],
        headline: "A 50% revenue slide reversed into $3.76M YTD through structural PPC repair.",
        challenge:
          "Revenue had fallen from a ~$1.35M peak to ~$650K, a 50%+ drop in six months the previous management never addressed. Budget sat in low-intent broad-match placements, product targeting campaigns cannibalised each other, there was no negative keyword strategy, and high-volume, mid-tail and brand terms were mixed into single campaigns. Impressions had collapsed from 12M+ to under 3M.",
        approach: [
          "Harvested high-converting search terms from the search-term report, cut semi-relevant spend and built tiered keyword lists.",
          "Rebuilt campaign structure: branded separated from generic, SKU-level ASIN targeting, top performers isolated into exact campaigns.",
          "Redirected spend to Top-of-Search with dayparting and multiplier bidding per keyword intent tier.",
          "Ran rank-push campaigns on hero ASINs (Rosemary, Lavender, Peppermint) to sub-1000 BSR in Health & Household.",
          "Built a retention engine: 124 tailored promotions, a 204K cart-abandoner pool, and 1,253 Subscribe & Save customers.",
        ],
        metrics: [
          { value: "$3.76M", label: "Sales, YTD", note: "from a declining base" },
          { value: "35%", label: "Conversion rate", note: "vs 18% category average" },
          { value: "1,253", label: "Subscribe & Save", note: "+505% vs median of 75" },
          { value: "1.28M", label: "Awareness reach", note: "+98% vs prior period" },
        ],
        tools: ["Amazon Ads", "Brand Analytics", "Tailored Promotions", "Seller Central"],
        pdf: "/casestudies/Essential%20Oils%20-%20PPC%20Case%20Study%20(1).pdf",
      },
    ],
  },

  /* --------------------------------------------------- two closing cards
     `tone: "bone"` renders the light card; anything else the dark one. */
  closing: [
    {
      tone: "bone",
      eyebrow: "Start here",
      title: "Get a free account audit",
      body: "A line-by-line review of listings, campaigns, account health and stock, delivered as a prioritised findings doc. Free, and yours either way.",
      cta: { label: "Book the audit", href: "/contact" },
    },
    {
      tone: "dark",
      eyebrow: "Still deciding?",
      title: "Read the case studies",
      body: "Four accounts we took over, what was actually broken, and what the numbers looked like afterwards.",
      cta: { label: "See the results", href: "#amazon-case-studies" },
    },
  ],

  /* --------------------------------------------------- home-page teaser
     Rendered by <AmazonTeaser /> on the home page. Keep it short: it exists
     to send the right visitor to the full page. */
  teaser: {
    eyebrow: "Amazon & Walmart growth",
    title: ["Selling on Amazon?", "We grow that too."],
    desc: "A dedicated team that owns and scales your Amazon and Walmart accounts, from listings and advertising to inventory and account health, with case studies and real numbers.",
    bullets: [
      "Listing & SEO rebuilds",
      "Advertising against a TACoS target",
      "Inventory & FBA operations",
      "Walmart Marketplace & Connect",
    ],
    cta: { label: "Explore Amazon Growth", href: AMAZON_PATH },
    // Headline figure pulled forward as social proof.
    highlight: { value: "12×", label: "monthly revenue in 24 months", note: "Pearl Linens case study" },
  },
};
