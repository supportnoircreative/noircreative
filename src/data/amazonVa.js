/* ==========================================================================
   Amazon VA — single source of content for the /amazon-va page and its home
   teaser. Everything rendered on that page is defined here; the components
   only lay it out. Swap this file's values for your own and nothing else
   needs to change.

   Editing rules of thumb
   ----------------------
   • `icon` fields accept only the keys listed in AMAZON_ICON_KEYS below
     (they map to lucide-react icons inside the components).
   • Arrays are rendered in order, and every list is length-agnostic — add or
     remove entries freely. The layouts read best at:
       pillars 3 or 6 · painPoints 4 · process 4 or 5 · caseStudies 2–5
       metrics 3 or 4 per case study · proofBar 3 or 4
   • `accent` on a case study tints its metric rail: "lime" | "violet".
   • Keep metric `value` short (≤7 chars) — it renders at display size.
   ========================================================================== */

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
];

export const amazonVa = {
  /* ---------------------------------------------------------------- hero */
  hero: {
    eyebrow: "Amazon seller support",
    title: [
      "Your Amazon account,",
      "run like it's ours.",
    ],
    // One clear promise. Keep it under ~30 words — it sits directly under an
    // oversized headline and competes with it if it runs long.
    description:
      "Dedicated Amazon virtual assistants who own the unglamorous work: listings, PPC, cases and inventory, so you get your week back and your catalogue stops leaking margin.",
    primaryCta: { label: "Get a free account audit", href: "/contact" },
    secondaryCta: { label: "See the case studies", href: "#amazon-case-studies" },
    // Small trust line beneath the buttons.
    footnote: "No retainer to see the audit. You keep the findings either way.",
    // Floating marketplace chips in the hero (label + tone).
    chips: [
      { label: "Seller Central", tone: "lime" },
      { label: "Vendor Central", tone: "plain" },
      { label: "FBA + FBM", tone: "plain" },
      { label: "Brand Registry", tone: "violet" },
    ],
  },

  /* --------------------------------------------- the problem we mirror back
     This is the "they get it" section. Write these as the sentences a seller
     would actually say out loud, not as service descriptions. */
  painPoints: {
    eyebrow: "Sound familiar?",
    title: ["Most sellers aren't", "short on product."],
    desc: "They're short on hours. Here's what we hear on almost every first call, and what changes once someone owns it full-time.",
    items: [
      {
        icon: "clock",
        quote: "I'm spending my evenings in Seller Central instead of on the business.",
        shift: "A VA takes the daily queue of cases, pricing and stock alerts, and reports once a week.",
      },
      {
        icon: "ads",
        quote: "Ad spend keeps climbing and I can't tell which campaigns actually pay.",
        shift: "Search-term level pruning and a TACoS target you can actually hold us to.",
      },
      {
        icon: "listing",
        quote: "My listings rank for the wrong things and convert worse than they should.",
        shift: "Keyword-mapped titles, bullets and backend terms rebuilt around real search volume.",
      },
      {
        icon: "inventory",
        quote: "I've gone out of stock on my best ASIN more than once.",
        shift: "Reorder points tied to velocity and lead time, reviewed weekly, not guessed.",
      },
    ],
  },

  /* ------------------------------------------------------- what we cover */
  pillars: {
    eyebrow: "Scope of work",
    title: ["Everything inside", "Seller Central."],
    desc: "Pick the lanes you need. Most clients start with two and expand once the reporting proves out.",
    items: [
      {
        icon: "listing",
        title: "Listing & Catalogue",
        body: "Titles, bullets, A+ content, variations, flat files and error-free bulk uploads. Copy written for the algorithm and the human scrolling past it.",
        deliverables: ["Keyword-mapped copy", "A+ / brand story", "Variation clean-up", "Flat-file fixes"],
      },
      {
        icon: "search",
        title: "SEO & Keyword Research",
        body: "Helium 10 and Cerebro-driven research turned into an indexing plan, with front-end, backend and PPC sharing one keyword universe.",
        deliverables: ["Relevancy map", "Backend terms", "Index audits", "Competitor gap"],
      },
      {
        icon: "ads",
        title: "PPC Management",
        body: "Sponsored Products, Brands and Display built around margin, not impressions. Weekly bid and negative-keyword passes against a fixed TACoS target.",
        deliverables: ["Campaign builds", "Bid & budget passes", "Negative mining", "Placement tuning"],
      },
      {
        icon: "inventory",
        title: "Inventory & FBA Ops",
        body: "Shipment plans, reorder points, removal orders, stranded and aged inventory: the stuff that quietly costs you the Buy Box.",
        deliverables: ["Reorder planning", "Shipment creation", "Stranded recovery", "IPI health"],
      },
      {
        icon: "account",
        title: "Account Health & Cases",
        body: "Suppressed listings, policy flags, IP complaints and reimbursement claims, chased through Seller Support until they actually close.",
        deliverables: ["Case management", "Suppression fixes", "Reimbursements", "Policy appeals"],
      },
      {
        icon: "reviews",
        title: "Reviews & Customer Care",
        body: "Buyer messages answered inside SLA, review and feedback monitoring, and compliant follow-up sequences that lift your rating over time.",
        deliverables: ["Message handling", "Review monitoring", "Feedback removal", "Q&A upkeep"],
      },
    ],
  },

  /* ------------------------------------------------------ how engagement runs */
  process: {
    eyebrow: "How it runs",
    title: "Four weeks to hands-off.",
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
        body: "Your VA works the queue daily inside your Seller Central with role-scoped access. Slack or WhatsApp for anything urgent.",
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

  /* ------------------------------------------------- risk reversal / offer
     The close. Keep the guarantees to things you will genuinely honour. */
  offer: {
    eyebrow: "Why sellers stay",
    title: ["Low risk to start.", "Hard to leave."],
    desc: "We'd rather earn the retainer every month than lock you into one.",
    guarantees: [
      {
        icon: "shield",
        title: "No long-term contract",
        body: "Month to month after the first 30 days. Cancel with two weeks' notice and we hand over every doc and dashboard.",
      },
      {
        icon: "report",
        title: "Metrics agreed up front",
        body: "Each lane gets a target: TACoS, index count, IPI, response time. If we miss it two months running, you stop paying for that lane.",
      },
      {
        icon: "account",
        title: "Least-privilege access",
        body: "Role-scoped Seller Central users only. No password sharing, no admin rights, full audit trail of who changed what.",
      },
      {
        icon: "growth",
        title: "Your account stays yours",
        body: "Every campaign, SOP and keyword file is built in your accounts under your ownership. Nothing is hostage to the retainer.",
      },
    ],
    // Small stat strip above the closing CTA.
    proofBar: [
      { value: "24h", label: "Case response SLA" },
      { value: "6", label: "Marketplaces supported" },
      { value: "100%", label: "Client retention, 12mo" },
    ],
    cta: { label: "Book the free audit", href: "/contact" },
  },

  /* --------------------------------------------------- home-page teaser
     Rendered by <AmazonTeaser /> on the home page. Keep it short — it exists
     to send the right visitor to the full page. */
  teaser: {
    eyebrow: "New service",
    title: ["Selling on Amazon?", "We run that too."],
    desc: "Dedicated Amazon VAs for listings, PPC, inventory and account health, with case studies and real numbers, not promises.",
    bullets: [
      "Listing & SEO rebuilds",
      "PPC against a TACoS target",
      "Inventory & FBA operations",
      "Account health & reimbursements",
    ],
    cta: { label: "Explore Amazon VA", href: "/amazon-va" },
    // Headline figure pulled forward as social proof.
    highlight: { value: "12×", label: "monthly revenue in 24 months", note: "Pearl Linens case study" },
  },
};
