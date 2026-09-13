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
      "Dedicated Amazon virtual assistants who own the unglamorous work — listings, PPC, cases, inventory — so you get your week back and your catalogue stops leaking margin.",
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
    desc: "They're short on hours. Here's what we hear on almost every first call — and what changes once someone owns it full-time.",
    items: [
      {
        icon: "clock",
        quote: "I'm spending my evenings in Seller Central instead of on the business.",
        shift: "A VA takes the daily queue — cases, pricing, stock alerts — and reports once a week.",
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
        shift: "Reorder points tied to velocity and lead time, reviewed weekly — not guessed.",
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
        body: "Helium 10 and Cerebro-driven research turned into an indexing plan — front-end, backend and PPC sharing one keyword universe.",
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
        body: "Shipment plans, reorder points, removal orders, stranded and aged inventory — the stuff that quietly costs you the Buy Box.",
        deliverables: ["Reorder planning", "Shipment creation", "Stranded recovery", "IPI health"],
      },
      {
        icon: "account",
        title: "Account Health & Cases",
        body: "Suppressed listings, policy flags, IP complaints and reimbursement claims — chased through Seller Support until they actually close.",
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
        body: "We go through the account line by line — listings, campaigns, health, stock — and hand you a prioritised findings doc. Free, and yours regardless.",
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
     Each entry is fully self-contained. Replace the placeholder numbers with
     your own — they render exactly as typed, so keep units in the string
     ("+184%", "2.4x", "$61k"). Order here is the order shown. */
  caseStudies: {
    eyebrow: "Exclusive case studies",
    title: ["Receipts, not", "round numbers."],
    desc: "Three accounts we took over, what was actually broken, and what the numbers looked like ninety days later.",
    side: "Every figure below comes from the client's own Business Reports and Advertising console.",
    items: [
      {
        id: "cs-01",
        // Short label for the selector rail.
        tab: "Home & Kitchen",
        accent: "lime",
        client: "Private-label kitchenware brand",
        // Use a descriptive stand-in if the client is under NDA.
        category: "Home & Kitchen · FBA · US",
        timeline: "90 days",
        scope: ["Listing rebuild", "PPC restructure", "Review recovery"],
        // The one-line story. This is what shows in the collapsed card.
        headline: "A best-seller stuck on page three, rebuilt to own its category term.",
        challenge:
          "Eleven ASINs sharing one badly-built variation family, a title stuffed with terms the listing never indexed for, and 61% of ad spend running against a single broad campaign nobody had touched in eight months. Organic rank for the primary keyword sat at #34.",
        approach: [
          "Split the variation family into two parents so the hero ASIN stopped inheriting a 2.9-star sibling's reviews.",
          "Rebuilt titles and bullets off a Cerebro relevancy map, moving 40 unindexed terms into backend fields.",
          "Broke the broad campaign into exact / phrase / broad tiers with a negative list mined from 6 months of search-term data.",
          "Set a 14% TACoS ceiling and ran weekly bid passes against it instead of monthly.",
        ],
        metrics: [
          { value: "+184%", label: "Organic sessions", note: "90 days vs. prior 90" },
          { value: "#3", label: "Rank, primary keyword", note: "from #34" },
          { value: "-38%", label: "TACoS", note: "22.6% → 14.0%" },
          { value: "4.6★", label: "Average rating", note: "from 3.9★" },
        ],
        tools: ["Helium 10", "Seller Central", "Amazon Ads", "DataDive"],
        testimonial: {
          quote:
            "They found things our last agency had been billing us to maintain. First month paid for itself in reimbursements alone.",
          author: "Founder",
          role: "Kitchenware brand · 8-figure seller",
        },
      },
      {
        id: "cs-02",
        tab: "Supplements",
        accent: "violet",
        client: "Sports nutrition seller",
        category: "Health & Household · FBA · US + CA",
        timeline: "6 months",
        scope: ["Account health", "Reimbursements", "Inventory planning"],
        headline: "Suppressed listings and a 4.1 IPI turned into a clean, in-stock account.",
        challenge:
          "Three top-revenue ASINs suppressed for compliance documentation, an IPI score of 4.1 threatening storage limits ahead of Q4, and 14 months of unclaimed FBA discrepancies sitting untouched in the reports.",
        approach: [
          "Assembled and filed compliance documentation, clearing all three suppressions within 19 days.",
          "Audited 14 months of inventory adjustments and filed 47 reimbursement claims with shipment-level evidence.",
          "Removed aged inventory and rebuilt reorder points off 30/60/90-day velocity plus supplier lead time.",
          "Set up stock-out and IPI alerting so nothing depends on someone remembering to check.",
        ],
        metrics: [
          { value: "$61k", label: "Reimbursements recovered", note: "47 claims filed" },
          { value: "712", label: "IPI score", note: "from 411" },
          { value: "19", label: "Days to clear suppressions", note: "3 top ASINs" },
          { value: "0", label: "Stock-outs since", note: "6 months running" },
        ],
        tools: ["Seller Central", "Sellerboard", "Google Sheets", "Slack"],
        testimonial: {
          quote:
            "We'd written that money off. Having someone who actually chases Seller Support to a close is the whole value.",
          author: "Operations Lead",
          role: "Sports nutrition · DTC + Amazon",
        },
      },
      {
        id: "cs-03",
        tab: "Pet Supplies",
        accent: "lime",
        client: "Pet accessories startup",
        category: "Pet Supplies · FBM → FBA · US",
        timeline: "120 days",
        scope: ["Launch strategy", "PPC build", "Brand Registry"],
        headline: "A cold launch to $48k monthly revenue without discounting to zero margin.",
        challenge:
          "New brand, no review velocity, no Brand Registry, and a category dominated by three sellers with 4,000+ reviews each. Previous attempt burned $9k on auto campaigns at 71% ACoS.",
        approach: [
          "Filed Brand Registry and built A+ content plus a storefront before spending a dollar on ads.",
          "Launched into three long-tail sub-niches instead of the head term, where CPCs ran 60% cheaper.",
          "Ran Vine plus compliant follow-up to 24 reviews before scaling budget past $40/day.",
          "Moved to FBA once velocity justified it, then reinvested the Prime conversion lift into exact-match scaling.",
        ],
        metrics: [
          { value: "$48k", label: "Monthly revenue", note: "month 4, from $0" },
          { value: "19%", label: "ACoS at scale", note: "from 71%" },
          { value: "2.4x", label: "Conversion rate", note: "vs. category median" },
          { value: "24", label: "Reviews before scale", note: "Vine + follow-up" },
        ],
        tools: ["Brand Registry", "Amazon Ads", "Helium 10", "Canva"],
        testimonial: {
          quote:
            "They talked us out of the head keyword and they were right. We'd have spent our whole budget losing to incumbents.",
          author: "Co-founder",
          role: "Pet accessories · first-time seller",
        },
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
        body: "Each lane gets a target — TACoS, index count, IPI, response time. If we miss it two months running, you stop paying for that lane.",
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
    desc: "Dedicated Amazon VAs for listings, PPC, inventory and account health — with case studies and real numbers, not promises.",
    bullets: [
      "Listing & SEO rebuilds",
      "PPC against a TACoS target",
      "Inventory & FBA operations",
      "Account health & reimbursements",
    ],
    cta: { label: "Explore Amazon VA", href: "/amazon-va" },
    // Headline figure pulled forward as social proof.
    highlight: { value: "+184%", label: "organic sessions in 90 days", note: "Home & Kitchen case study" },
  },
};
