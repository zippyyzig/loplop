import type { Metadata } from "next"
import LandingHero from "@/components/landing/LandingHero"
import MarketSnapshot from "@/components/landing/MarketSnapshot"
import CorridorCards from "@/components/landing/CorridorCards"
import FAQAccordion from "@/components/landing/FAQAccordion"
import InlineCTA from "@/components/landing/InlineCTA"
import ContentSection from "@/components/landing/ContentSection"
import InfoGrid from "@/components/landing/InfoGrid"
import RelatedPages from "@/components/landing/RelatedPages"

export const metadata: Metadata = {
  title: "New Launch Projects in Gurgaon 2025–26 | RERA Approved Luxury Homes",
  description:
    "Explore the latest new launch projects in Gurgaon — luxury apartments, premium residences, and RERA-approved developments across top corridors. Get expert guidance before you invest.",
  alternates: {
    canonical: "https://countryroof.in/new-launch-projects-gurgaon",
  },
}

const marketStats = [
  { value: "₹7,000+/sqft", label: "New Gurgaon entry pricing" },
  { value: "₹15,000–22,000", label: "Per sqft on GCER" },
  { value: "₹8,000–15,000", label: "Per sqft on Dwarka Expressway" },
  { value: "RERA Registered", label: "All listed projects" },
  { value: "3–5 Years", label: "Typical possession timeline" },
  { value: "DLF, M3M, Sobha+", label: "Active new launch developers" },
  { value: "NRI Demand", label: "Record levels in 2024–25" },
  { value: "End-User Led", label: "Dominant demand driver in 2025" },
]

const corridors = [
  {
    name: "Golf Course Extension Road",
    sectors: "Sectors 57, 58, 65, 66, 67, 69",
    priceRange: "₹15,000 – ₹22,000/sqft",
    highlight:
      "Gurgaon's most aspirational residential corridor. Projects by M3M, Godrej, Emaar, and Sobha have consistently delivered premium product. Configurations from 3 BHK to penthouse. Strong rental yields from senior corporate professionals.",
    rightFor: "Long-term capital appreciation with a live-in quality bias. Golf Course Extension Road remains one of the most compelling corridors for new launches.",
    ctaLabel: "View Projects in Golf Course Extension Road",
    ctaHref: "/properties?location=golf-course-extension-road&status=new-launch",
  },
  {
    name: "Dwarka Expressway",
    sectors: "Sectors 99–113, NH-248BB",
    priceRange: "₹8,000 – ₹15,000/sqft",
    highlight:
      "Expressway now fully operational. Metro connectivity improving. Developers including Signature Global, Central Park, Anant Raj active here. Widest price range — from integrated affordable-premium to genuine luxury projects.",
    rightFor: "Investors focused on near-to-medium-term appreciation. Projects in early-to-mid construction stages where upside remains.",
    ctaLabel: "Explore Dwarka Expressway Projects",
    ctaHref: "/properties?location=dwarka-expressway&status=new-launch",
  },
  {
    name: "Southern Peripheral Road (SPR)",
    sectors: "Sectors 70, 71, 72, 73, 74A",
    priceRange: "₹12,000 – ₹17,000/sqft",
    highlight:
      "Golf Course Extension Road's lifestyle profile at a more accessible entry price. Proximity to Sohna Road, well-planned sector layouts, good social infrastructure. Predominantly amenity-heavy, gated communities.",
    rightFor: "Buyers who want GCER adjacency at a lower price point or BPTP, Silverglades, and boutique developer projects.",
    ctaLabel: "Browse SPR Projects",
    ctaHref: "/properties?location=southern-peripheral-road&status=new-launch",
  },
  {
    name: "New Gurgaon",
    sectors: "Sectors 76–95, Sectors 82–88 hub",
    priceRange: "₹7,000 – ₹13,000/sqft",
    highlight:
      "Highest volume of new launches happening right now. Developers including Elan Group, Vatika, Hero Realty active here. Wider roads, better planning, more open spaces. Social infrastructure still catching up.",
    rightFor: "Buyers comfortable with a 3–5 year horizon for strong appreciation as the sector matures.",
    ctaLabel: "View New Gurgaon Projects",
    ctaHref: "/properties?location=new-gurgaon&status=new-launch",
  },
  {
    name: "Golf Course Road",
    sectors: "Sectors 42, 53, 54, 56, 26A",
    priceRange: "₹20,000+/sqft",
    highlight:
      "New launches on Golf Course Road proper are rare because land is limited and expensive. When they happen, they command significant attention and top-of-market pricing. Most activity is now in secondary resale.",
    rightFor: "Buyers who want Gurgaon's most prestigious address. DLF The Crest, Magnolias, Aralias define the benchmark.",
    ctaLabel: "View Golf Course Road Projects",
    ctaHref: "/properties?location=golf-course-road&status=new-launch",
  },
]

const projectTypes = [
  {
    title: "Luxury High-Rise Apartments",
    body: "The dominant product type in Gurgaon's new launch landscape. High-rise towers of 30 to 50 floors from DLF, M3M, Sobha, and Godrej. Configurations from 2 BHK to 4 BHK and penthouse across key corridors.",
  },
  {
    title: "Premium Low-Rise Floors",
    body: "Builder floors and premium low-rise developments (G+4 to G+9) along Golf Course Extension Road and South Gurgaon. Lower density, more privacy, often direct ground-level or terrace access. Trehan, BPTP, and boutique builders active.",
  },
  {
    title: "Integrated Townships",
    body: "Master-planned communities with residential, retail, school, and healthcare components in New Gurgaon. Large-scale, long-horizon developments that appeal to buyers looking for a complete, self-contained living environment.",
  },
  {
    title: "Plotted Developments",
    body: "Particularly in emerging New Gurgaon sectors and on Sohna-Gurgaon Road. Flexibility of building your own home or simplicity of land as an asset class. DDJAY plots have created a new category of regulated, affordable plotted inventory.",
  },
]

const featuredCategories = [
  {
    title: "Ultra-Luxury New Launches (₹5 Cr+)",
    body: "Led by DLF's ongoing developments on Golf Course Road and GCER, along with select launches from Sobha, Emaar India, and M3M in premium sectors. Buyers prioritise branded amenities, architectural distinction, and address value.",
  },
  {
    title: "Premium New Launches (₹2–5 Cr)",
    body: "The most active segment by volume. Projects from Godrej Properties, Central Park, Signature Global, and Tata Housing. Predominantly 3 BHK and 4 BHK with strong emphasis on club amenities, landscape design, and smart home integration.",
  },
  {
    title: "Growth-Oriented Launches (₹1–2 Cr)",
    body: "Dwarka Expressway, New Gurgaon, and select SPR sectors from credible mid-size developers. Primarily 2 BHK and 3 BHK for buyers who want Gurgaon's growth story without the premium address price tag.",
  },
]

const verificationChecklist = [
  {
    title: "RERA Registration",
    body: "Confirm the project has a valid RERA registration number on the HRERA portal before any payment. A project without RERA is a project without legal protection for your timeline.",
  },
  {
    title: "Developer Track Record",
    body: "Research the developer's past project delivery — have their earlier projects been delivered on time, and were there significant disputes with buyers? RERA complaint records are publicly searchable.",
  },
  {
    title: "Land Title",
    body: "Confirm that the land on which the project is being built is free of encumbrances, litigation, or disputed ownership. Your legal advisor should do this independently.",
  },
  {
    title: "Payment Plan",
    body: "Understand whether the payment plan is construction-linked (safer for buyers) or time-linked. Read the agreement carefully before committing.",
  },
  {
    title: "Builder-Buyer Agreement",
    body: "Do not pay more than the booking amount before receiving and reviewing the full Builder-Buyer Agreement (BBA). The BBA contains your rights and obligations as a buyer.",
  },
  {
    title: "Occupancy Timeline",
    body: "Ask for the RERA-declared possession date and understand the grace period provisions. Factor in realistic delays (12–18 months industry average) when planning your own finances.",
  },
]

const infraItems = [
  {
    title: "Road Connectivity",
    body: "Completion of the Delhi-Mumbai Expressway interchange near Sector 58, operational Dwarka Expressway, widening of NH-48, and improved connectivity on Sohna Road have reduced commute times materially. KMP Expressway opened New Gurgaon to regional connectivity.",
  },
  {
    title: "Metro Connectivity",
    body: "Rapid Metro — integrated with Delhi Metro Yellow Line at HUDA City Centre — runs through Sector 29, 42, MG Road, and parts of the Cyber City corridor. Proposed expansion to New Gurgaon sectors would significantly expand metro-accessible real estate.",
  },
  {
    title: "Airport Access",
    body: "IGI Airport is accessible from most Gurgaon sectors within 30 to 50 minutes. Particularly competitive along NH-48, Dwarka Expressway, and adjoining corridors — a genuine differentiator for frequent flyers, senior professionals, and NRIs.",
  },
  {
    title: "Employment Hubs",
    body: "Cyber City and DLF Cyber Park remain the anchor — home to global MNCs across technology, consulting, BFSI, and professional services. Udyog Vihar, Golf Course Road commercial clusters, and emerging New Gurgaon commercial nodes add further employment depth.",
  },
  {
    title: "Education",
    body: "The Shri Ram School, DPS Gurgaon, Pathways World School, GD Goenka World School, and Scottish High International School are among the top K-12 institutions. Golf Course Extension Road and SPR corridors are particularly well-served.",
  },
  {
    title: "Healthcare",
    body: "Medanta – The Medicity in Sector 38, Artemis Hospital in Sector 51, and Fortis Memorial Research Institute in Sector 44 are among the most respected healthcare facilities in northern India. New launches close to these corridors benefit significantly.",
  },
]

const faqs = [
  {
    question: "What is a new launch project in Gurgaon?",
    answer:
      "A new launch project refers to a residential or mixed-use development recently released for sale by a developer — typically before or early in the construction phase. These projects are often marketed at launch prices, which tend to be lower than prices at completion. In Gurgaon, most credible new launches now come with RERA registration, providing buyers with a regulated framework for their investment.",
  },
  {
    question: "Is it safe to invest in new launch projects in Gurgaon?",
    answer:
      "Safety depends significantly on the developer and the project specifics. New launches from RERA-registered projects backed by developers with a proven track record of delivery carry manageable risk. Projects from lesser-known developers without a delivery history carry higher risk. Verifying RERA registration, checking the developer's past project record, and reviewing the builder-buyer agreement carefully are essential steps before committing.",
  },
  {
    question: "What is the price range for new launch projects in Gurgaon in 2025?",
    answer:
      "New launch prices vary significantly by corridor. In Golf Course Extension Road sectors, new launches are typically priced between ₹15,000 and ₹22,000 per sq ft. Dwarka Expressway projects range from ₹8,000 to ₹15,000 per sq ft. New Gurgaon sectors offer the widest range, from approximately ₹7,000 to ₹13,000 per sq ft. These are broad benchmarks; individual project pricing should be confirmed directly.",
  },
  {
    question: "Which corridors in Gurgaon are best for new launch investment in 2025?",
    answer:
      "Dwarka Expressway, Golf Course Extension Road, and New Gurgaon (Sectors 76–95) are widely considered the most active and opportunity-rich corridors for new launch investment currently. Dwarka Expressway has confirmed infrastructure in place; Golf Course Extension Road offers proven appreciation and luxury-grade product; New Gurgaon offers relative price advantage with a maturing infrastructure story.",
  },
  {
    question: "What is RERA and why does it matter for new launch buyers?",
    answer:
      "RERA stands for Real Estate Regulation and Development Act. In Haryana, the regulatory body is HRERA. All new launch projects must be registered with HRERA before marketing or selling units to buyers. RERA registration means the developer is legally bound to deliver the project by the declared date, maintain construction quality standards, and hold funds in a ring-fenced account for that specific project. For buyers, it is the most important piece of regulatory protection available.",
  },
  {
    question: "What is a construction-linked payment plan?",
    answer:
      "A construction-linked payment plan (CLP) ties your payment schedule to actual construction milestones — for example, 10% at booking, 10% at foundation completion, 15% at first floor slab, and so on through to possession. CLPs are generally considered more buyer-friendly than time-linked plans because you pay as construction progresses, reducing the risk of paying for a project that is not advancing.",
  },
  {
    question: "How long does it take to get possession of a new launch project?",
    answer:
      "Most new launches in Gurgaon quote possession timelines of 3 to 5 years from the date of booking or RERA registration, depending on the project scale. In practice, delays are common — the industry average delay in India has historically been 12 to 18 months beyond the declared date. Buyers should plan their personal finances assuming a possible 12-month delay and look for projects that have a strong construction track record.",
  },
  {
    question: "How do new launches in Gurgaon compare to ready-to-move properties?",
    answer:
      "New launches offer price advantage, choice of unit, and the prospect of appreciation between launch and possession. Ready-to-move properties offer immediate occupancy, what-you-see-is-what-you-get certainty, and no construction risk. From a financial perspective, new launches from credible developers in high-momentum corridors have historically outperformed ready-to-move properties on capital appreciation — but the carrying cost of rent plus EMI during construction can erode this advantage.",
  },
  {
    question: "Can NRIs buy new launch projects in Gurgaon?",
    answer:
      "Yes. Non-resident Indians (NRIs) can purchase residential property in India, including new launch projects in Gurgaon, under FEMA regulations. Payments must be made through NRE, NRO, or FCNR accounts. Most major developers have dedicated NRI service desks, and CountryRoof works with NRI buyers regularly to facilitate site visits, virtual walkthroughs, documentation, and transaction support.",
  },
  {
    question: "How do I shortlist the best new launch project for my budget?",
    answer:
      "Start by defining your budget (all-in, including registration, GST, and maintenance deposits), your timeline flexibility (how long you can wait for possession), your intended use (investment or self-occupancy), and your preferred corridor. Then evaluate shortlisted projects on developer credibility, RERA status, construction progress, amenity provision, and exit liquidity. CountryRoof advisors follow this exact framework in buyer consultations.",
  },
]

export default function NewLaunchProjectsGurgaonPage() {
  return (
    <main>
      <LandingHero
        breadcrumb="New Launch Projects in Gurgaon"
        badge="Buyer's Guide 2025–26"
        h1="New Launch Projects in Gurgaon — What's Worth Your Attention in 2025–26"
        subtitle="Between late 2024 and mid-2025, Gurgaon saw an unusually high volume of premium new launches — projects by established developers, on well-located land, with real construction momentum. This guide helps you evaluate which ones are worth your attention."
        primaryCta={{ label: "Explore New Launch Projects", href: "/properties?status=new-launch" }}
        secondaryCta={{ label: "Get Expert Advice", href: "/contact" }}
      />

      {/* Why new launches now */}
      <ContentSection title="Why New Launch Projects in Gurgaon Are Attracting Serious Buyers Right Now">
        <p>
          Gurgaon has always attracted investment. But the current wave of new launches is different in character from what we saw
          five or six years ago. Post-pandemic demand shifts, a maturing infrastructure pipeline, and a consolidation of developer
          credibility have combined to create a market where new launches from the right developers, in the right locations, are
          actually worth taking seriously.
        </p>
        <ul className="space-y-3 list-none">
          {[
            ["Launch prices still below anticipated completion-stage values", "Particularly on corridors like Dwarka Expressway and Southern Peripheral Road, where infrastructure delivery has been visibly accelerating. Buyers who entered these corridors 18 to 24 months ago are already sitting on meaningful appreciation."],
            ["RERA registration has changed the risk calculus", "Most reputable developers now launch only after RERA approval is secured, which means buyers have a legal framework protecting their timelines and investments."],
            ["End-user demand is now the dominant driver", "The speculative investor who bought and flipped without occupying is less active than before. What's driving absorption today is genuine occupier demand — families relocating from Delhi, senior professionals upgrading, and NRIs returning with capital and intent."],
          ].map(([title, body], i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-[var(--luxury-gold)]/20 flex items-center justify-center text-[var(--luxury-navy)] font-bold text-xs">{i + 1}</span>
              <span><strong className="text-[var(--luxury-navy)]">{title}.</strong> {body}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      {/* Market Snapshot */}
      <MarketSnapshot
        title="Understanding the Gurgaon Real Estate Landscape in 2025"
        description="Gurgaon's residential market can be read through two parallel stories: the luxury story (₹3 Cr+ demand consistently strong, with some micro-markets selling first phases within weeks) and a mid-premium segment gradually thinning out. The entry point for a credible, well-located new launch has shifted upward."
        stats={marketStats}
      />

      <InlineCTA
        heading="Check latest prices and availability across new launch projects"
        body="Verified RERA listings with real pricing, floor plan access, and possession timelines."
        primaryCta={{ label: "Check Latest Prices & Availability", href: "/properties?status=new-launch" }}
        secondaryCta={{ label: "Download Price Sheet", href: "/contact" }}
        variant="light"
      />

      {/* Corridors */}
      <CorridorCards
        title="Top Corridors for New Launch Projects in Gurgaon"
        subtitle="Each corridor has a different price point, infrastructure maturity, and appreciation story. Your investment horizon and risk tolerance determine where to look."
        corridors={corridors}
      />

      {/* Infrastructure */}
      <InfoGrid
        title="Connectivity and Infrastructure: What's Driving Demand"
        subtitle="Gurgaon's road infrastructure has improved materially over the last three years. Commute burdens that were historically one of Gurgaon's most cited pain points have been meaningfully reduced."
        items={infraItems}
        background="cream"
      />

      {/* Project Types */}
      <InfoGrid
        title="Types of New Launch Projects Available in Gurgaon"
        subtitle="Gurgaon's new launch landscape spans several distinct product formats — each with different land footprints, densities, and buyer profiles."
        items={projectTypes}
        background="white"
      />

      {/* Featured Categories */}
      <ContentSection title="Featured Project Categories on CountryRoof" background="cream">
        <p>
          CountryRoof tracks and curates new launch projects across Gurgaon&apos;s premium and luxury segments. Our focus is on
          verified inventory — projects with active RERA registration, credible developer backgrounds, and transparent pricing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {featuredCategories.map((cat, i) => (
            <div key={i} className="bg-white border border-[var(--luxury-border)] rounded-xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--luxury-gold)] mb-2">{cat.title}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{cat.body}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Who Should Invest */}
      <ContentSection title="Who Should Consider Investing in New Launch Projects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[var(--luxury-cream)] border border-[var(--luxury-border)] rounded-xl p-6">
            <h3 className="font-bold text-[var(--luxury-navy)] mb-3">Investor Perspective</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              A new launch makes the most sense for an investor when three factors align: the corridor has genuine
              infrastructure momentum, the developer has a proven track record of delivery, and the pricing at launch leaves room
              for appreciation by possession. In 2025, the strongest cases are in Dwarka Expressway, New Gurgaon, and select SPR
              micro-markets. Budget for a 3 to 5 year holding period minimum.
            </p>
          </div>
          <div className="bg-[var(--luxury-cream)] border border-[var(--luxury-border)] rounded-xl p-6">
            <h3 className="font-bold text-[var(--luxury-navy)] mb-3">End-User Perspective</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For someone buying a home to live in, a new launch offers the ability to choose your floor and facing, fresh
              construction with current building codes, and the psychological satisfaction of being the first occupant. The
              trade-off is the wait — construction timelines typically run 3 to 5 years. End-users who need immediate housing
              should evaluate whether a ready-to-move alternative might suit their situation better.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Verification */}
      <InfoGrid
        title="Key Things to Verify Before Booking a New Launch"
        subtitle="Before signing a booking form or making an advance payment on any new launch project in Gurgaon, verify the following."
        items={verificationChecklist}
        background="cream"
      />

      {/* 2026 Outlook */}
      <ContentSection title="2026 Market Outlook for New Launch Projects">
        <p>
          The broad consensus among serious observers of the Gurgaon market is that new launch activity will remain elevated,
          particularly in the luxury and premium segments. Several large DLF projects are expected to open bookings. M3M, Godrej,
          and Sobha all have announced or pipeline projects in advanced stages.
        </p>
        <p>
          Infrastructure delivery will be a key variable. If the planned metro extensions move closer to execution and New
          Gurgaon sector development continues at its current pace, prices in those corridors could see a step-change upward in
          the second half of 2026.
        </p>
        <p>
          Buyers sitting on the sidelines waiting for a price correction should approach that strategy with caution. In
          Gurgaon&apos;s premium and luxury segments, meaningful price corrections have been rare and short-lived in recent history.
        </p>
      </ContentSection>

      <InlineCTA
        heading="Talk to an Expert Before You Invest"
        body="CountryRoof advisors provide independent project assessments, corridor comparisons, and personalised guidance — no pressure, just clarity."
        primaryCta={{ label: "Talk to an Expert Before You Invest", href: "/contact" }}
        variant="dark"
      />

      {/* FAQ */}
      <FAQAccordion
        title="Frequently Asked Questions About New Launch Projects in Gurgaon"
        faqs={faqs}
      />

      {/* Final CTA */}
      <InlineCTA
        heading="Make a Smarter Property Decision with CountryRoof"
        body="CountryRoof is a Gurgaon-focused luxury real estate advisory. We work exclusively in the premium and luxury segment. Whether you're an investor evaluating corridors, an end-user looking for the right home, or an NRI exploring options remotely, our advisors can help you navigate the new launch market with clarity."
        primaryCta={{ label: "Connect with a CountryRoof Advisor", href: "/contact" }}
        secondaryCta={{ label: "Browse Verified Projects", href: "/properties?status=new-launch" }}
        variant="light"
      />

      {/* Related Pages */}
      <RelatedPages
        items={[
          { label: "3 BHK Apartments in Gurgaon", href: "/3-bhk-apartments-gurgaon" },
          { label: "Luxury Flats in Gurgaon", href: "/luxury-apartments-gurgaon" },
          { label: "Golf Course Extension Road", href: "/properties?location=golf-course-extension-road" },
          { label: "Dwarka Expressway Projects", href: "/properties?location=dwarka-expressway" },
          { label: "New Gurgaon Real Estate", href: "/properties?location=new-gurgaon" },
          { label: "Under Construction Projects", href: "/properties?status=under-construction" },
          { label: "Ready to Move Apartments", href: "/properties?status=ready-to-move" },
          { label: "RERA Approved Projects", href: "/properties?rera=true" },
        ]}
      />
    </main>
  )
}
