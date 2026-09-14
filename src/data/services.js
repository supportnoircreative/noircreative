/* The six disciplines.
   ------------------------------------------------------------------
   `short` and `full` feed the cards on /services and the home teaser.
   Everything below `slug` feeds that service's own page at
   /services/<slug>, which exists so each discipline can rank for its own
   terms instead of six topics competing on one URL.

   A service page is only worth having if it says something: thin pages get
   crawled and dropped. Keep `intro`, `deliverables` and `approach` filled in
   for every entry, and add a `slug` to create the page. */
export const services = [
  {
    id: "01",
    slug: "graphic-design",
    icon: "palette",
    title: "Graphic Design",
    short: "Make your brand stand out with identity systems, print and packaging built to hold up at any size.",
    full: "Identity systems, print, and packaging: brand marks built to hold up at billboard size and favicon size alike.",

    intro:
      "A logo is not an identity. What you actually need is a system: a mark that survives being shrunk to a favicon, a palette that works on screen and in print, and rules clear enough that someone else can apply them without asking you first. That is what we build.",
    bestFor:
      "Businesses launching, rebranding, or tired of recreating the same assets from scratch every time they need something.",
    deliverables: [
      {
        title: "Identity system",
        body: "Primary mark, secondary marks, and the clear-space and minimum-size rules that keep them legible everywhere.",
      },
      {
        title: "Colour and type",
        body: "A palette specified for screen and print, with type pairings and a scale that holds up across every layout.",
      },
      {
        title: "Print and packaging",
        body: "Business cards, signage, packaging and collateral, supplied print-ready with bleed and colour profiles correct.",
      },
      {
        title: "Brand guidelines",
        body: "A document your team and future vendors can follow, so the brand stays consistent after we hand it over.",
      },
    ],
    approach: [
      {
        title: "Audit what exists",
        body: "We look at what you already have and what is actually failing, before proposing anything new.",
      },
      {
        title: "Design in context",
        body: "Marks get tested at real sizes on real surfaces, not presented at 2000px on a white slide.",
      },
      {
        title: "Hand over properly",
        body: "Every file format you will need, organised, plus the rules for using them.",
      },
    ],
  },
  {
    id: "02",
    slug: "web-development",
    icon: "monitor",
    title: "Web Development",
    short: "Modern, functional, responsive websites engineered for growth, not just for launch day.",
    full: "Modern, functional, responsive websites engineered for growth, built on foundations that won't need a rewrite in a year.",

    intro:
      "Most websites are built to look finished on launch day and become a liability six months later. We build on modern, maintainable foundations so the site can grow with the business: new pages, new sections, new integrations, without a rebuild.",
    bestFor:
      "Businesses that need a site to do a job, whether that is booking work, selling, or making a case convincingly enough to get the call.",
    deliverables: [
      {
        title: "Responsive build",
        body: "Designed and tested from phone to desktop, because most of your traffic is arriving on a phone.",
      },
      {
        title: "Performance and SEO",
        body: "Fast loads, clean markup, correct metadata, sitemaps and structured data, set up at build time rather than bolted on.",
      },
      {
        title: "Content you control",
        body: "Structured so your team can update copy and add pages without opening a code editor.",
      },
      {
        title: "Integrations",
        body: "Forms, email delivery, analytics, booking and payment flows wired in and verified end to end.",
      },
    ],
    approach: [
      {
        title: "Scope against outcomes",
        body: "We agree what the site has to achieve before deciding what it contains.",
      },
      {
        title: "Build in the open",
        body: "You see working previews as we go, not a reveal at the end.",
      },
      {
        title: "Launch and support",
        body: "Deployed, measured, and supported afterwards, with a clear line back to us.",
      },
    ],
  },
  {
    id: "03",
    slug: "digital-marketing",
    icon: "chart",
    title: "Digital Marketing",
    short: "Grow through data-driven campaigns: SEO, paid, and content strategy tied to real revenue.",
    full: "SEO, paid, and content strategy tied to real revenue, grown through data-driven campaigns, not vanity metrics.",

    intro:
      "Impressions and follower counts are easy to grow and easy to mistake for progress. We work backwards from revenue instead: which channels bring people who buy, what they cost, and which spend to cut. If a campaign cannot be tied to a number that matters, it does not run.",
    bestFor:
      "Businesses already getting some traffic who cannot tell which parts of it are worth paying for.",
    deliverables: [
      {
        title: "Search visibility",
        body: "Technical SEO, keyword targeting and content built around what your buyers actually search for.",
      },
      {
        title: "Paid campaigns",
        body: "Search and social campaigns structured by intent, with budget shifted toward what converts.",
      },
      {
        title: "Content strategy",
        body: "A publishing plan tied to the terms you want to win, not posting for the sake of it.",
      },
      {
        title: "Reporting that means something",
        body: "One dashboard showing spend, leads and cost per lead. No padded activity reports.",
      },
    ],
    approach: [
      {
        title: "Measure first",
        body: "Analytics and conversion tracking get fixed before spend goes anywhere, or the data is fiction.",
      },
      {
        title: "Test small",
        body: "Budget proves a channel before it scales into one.",
      },
      {
        title: "Cut and reinvest",
        body: "Underperforming spend gets pulled and moved to what is working, on a regular review.",
      },
    ],
  },
  {
    id: "04",
    slug: "brand-strategy",
    icon: "target",
    title: "Brand Strategy",
    short: "Positioning, naming, and messaging that give your brand something worth saying, and a reason to say it.",
    full: "Positioning, naming, and messaging work that gives your brand something worth saying, and a clear reason to say it before anyone touches a pixel.",

    intro:
      "Design cannot fix a business that has not decided what it is. Strategy comes first: who you are for, what you do better than the alternatives, and how you say it in language a customer recognises. Everything visual gets easier once that is settled.",
    bestFor:
      "Businesses that sound like their competitors, or that struggle to explain what they do without a long preamble.",
    deliverables: [
      {
        title: "Positioning",
        body: "A clear statement of who you serve, what you offer, and why it beats the alternative they are considering.",
      },
      {
        title: "Messaging framework",
        body: "Your core message plus the supporting proof points, written so the whole team says the same thing.",
      },
      {
        title: "Naming",
        body: "Names for the business, products or services, screened for availability before you fall in love with one.",
      },
      {
        title: "Voice and tone",
        body: "How the brand sounds in writing, with examples that make it usable rather than theoretical.",
      },
    ],
    approach: [
      {
        title: "Understand the market",
        body: "Your customers, your competitors, and the gap that is actually open.",
      },
      {
        title: "Decide, then write",
        body: "Positioning gets agreed before copy gets written, so the words have something to carry.",
      },
      {
        title: "Make it usable",
        body: "Delivered as something your team can apply, not a deck that gets filed and forgotten.",
      },
    ],
  },
  {
    id: "05",
    slug: "ui-ux-design",
    icon: "layout",
    title: "UI/UX Design",
    short: "Interfaces and product flows designed around how people actually use them, not just how they look.",
    full: "Interfaces and product flows designed around how people actually use them, wireframed, prototyped, and tested before a line of code ships.",

    intro:
      "A beautiful interface that people cannot navigate is a failed interface. We design the flow before the surface: what someone is trying to do, the shortest path to doing it, and where they currently give up. Then we make it look like your brand.",
    bestFor:
      "Products and sites where people drop off somewhere between arriving and converting, and nobody is sure where.",
    deliverables: [
      {
        title: "User flows",
        body: "The routes through your product mapped end to end, so gaps are visible before they get built.",
      },
      {
        title: "Wireframes",
        body: "Structure and hierarchy resolved in low fidelity, where changes cost minutes instead of days.",
      },
      {
        title: "Interface design",
        body: "High-fidelity screens on a consistent design system, responsive from phone to desktop.",
      },
      {
        title: "Prototypes",
        body: "Clickable versions you can put in front of real users before committing to a build.",
      },
    ],
    approach: [
      {
        title: "Find the drop-off",
        body: "Analytics and session data show where people actually leave, rather than where we assume they do.",
      },
      {
        title: "Prototype and test",
        body: "Ideas get validated with real users while they are still cheap to change.",
      },
      {
        title: "Hand off build-ready",
        body: "Specs, states and assets organised so development does not have to guess.",
      },
    ],
  },
  {
    id: "06",
    slug: "video-editing",
    icon: "video",
    title: "Video Editing",
    short: "Polished, engaging edits for social, ads, and brand content that hold attention past the hook.",
    full: "Polished, engaging edits for social, ads, and brand content that hold attention long past the hook.",

    intro:
      "Most video loses people in the first three seconds, and the rest of the edit never gets watched. We cut for retention: a hook that earns the next moment, pacing that does not sag, and captions built for the majority who watch on mute.",
    bestFor:
      "Businesses sitting on footage they have not turned into anything, or running ads that stop being watched early.",
    deliverables: [
      {
        title: "Social edits",
        body: "Vertical cuts sized for Reels, TikTok and Shorts, with captions burned in for sound-off viewing.",
      },
      {
        title: "Ad creative",
        body: "Multiple hook variants from the same footage, so you can test what holds attention.",
      },
      {
        title: "Brand films",
        body: "Longer-form pieces for your site and pitches, colour graded and properly mixed.",
      },
      {
        title: "Motion and titles",
        body: "Lower thirds, captions and animated elements built on your brand's type and palette.",
      },
    ],
    approach: [
      {
        title: "Cut for the platform",
        body: "A YouTube edit and a Reel are different edits, not the same file exported twice.",
      },
      {
        title: "Earn the first three seconds",
        body: "The hook gets built first, because nothing after it matters if that fails.",
      },
      {
        title: "Deliver every size",
        body: "Vertical, square and wide, exported to each platform's spec.",
      },
    ],
  },
];
