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
  title: "Luxury Apartments in Gurgaon 2026 | Premium Flats, Top Projects & Prices",
  description:
    "Explore luxury apartments in Gurgaon — premium flats, ultra-luxury homes, new launches & ready-to-move projects on Golf Course Road, GCER & Dwarka Expressway: verified listings, real prices, expert guidance on CountryRoof.",
  alternates: {
    canonical: "https://countryroof.in/luxury-apartments-gurgaon",
  },
}

const marketStats = [
  { value: "₹3 Cr – ₹40 Cr+", label: "Price Range" },
  { value: "3, 4, 4.5 BHK", label: "Configurations" },
  { value: "5 Key Corridors", label: "Golf Course Rd, GCER, Dwarka Exp, Sohna Rd, New Gurgaon" },
  { value: "All RERA", label: "Registered with HRERA" },
  { value: "2.5% – 4%", label: "Annual Rental Yield" },
  { value: "DLF, Sobha, M3M+", label: "Leading Developers" },
  { value: "New, UC, RTM", label: "Project Status Options" },
  { value: "NRI Active", label: "Most active NRI buyer decade" },
]

const corridors = [
  {
    name: "Golf Course Road",
    sectors: "Sectors 42, 53, 54, 56, 26A",
    priceRange: "₹15,000 – ₹25,000+/sqft",
    highlight:
      "Gurgaon's apex luxury address. Mature trees, Aravalli backdrop, 18-hole DLF Golf & Country Club. DLF Magnolias, Camellias, Crest, Aralias define the benchmark. Deepest secondary market liquidity in NCR.",
    rightFor: "Cyber City professionals wanting to eliminate commute time; buyers wanting Gurgaon's most recognised address.",
    ctaLabel: "View Golf Course Road Projects",
    ctaHref: "/properties?location=golf-course-road",
  },
  {
    name: "Golf Course Extension Road",
    sectors: "Sectors 57–66, SPR junction",
    priceRange: "₹12,000 – ₹18,000/sqft",
    highlight:
      "Gurgaon's most active luxury corridor. Newer, architecturally ambitious product from M3M, Godrej, Sobha, Elan, Anant Raj. Strong senior executive rental demand in the ₹1–3 lakh/month range.",
    rightFor: "Buyers wanting brand-new construction with modern specs; investors targeting the senior executive rental market.",
    ctaLabel: "Browse GCER Projects",
    ctaHref: "/properties?location=golf-course-extension-road",
  },
  {
    name: "Dwarka Expressway",
    sectors: "Sectors 99–115, NH-248BB",
    priceRange: "₹9,000 – ₹14,000/sqft",
    highlight:
      "Gurgaon's strongest investment corridor in 2026. Expressway fully operational since March 2024. Airport under 15 minutes. Buyers who entered in 2022–23 have seen 35–50% appreciation already.",
    rightFor: "4–7 year investment horizon; frequent travellers who value airport proximity; maximum specs per rupee.",
    ctaLabel: "View Dwarka Expressway Projects",
    ctaHref: "/properties?location=dwarka-expressway",
  },
  {
    name: "Sohna Road",
    sectors: "Sectors 47–50, Rajiv Chowk",
    priceRange: "₹8,000 – ₹13,000/sqft",
    highlight:
      "Premium quality at comparative value. Vatika, Tata Housing, Bestech, and Emaar have delivered some of Gurgaon's most thoughtfully designed communities. Lower per-sqft than Golf Course corridors.",
    rightFor: "Buyers wanting premium quality, mature neighbourhood with schools and hospitals, and better value per sqft.",
    ctaLabel: "Explore Sohna Road Projects",
    ctaHref: "/properties?location=sohna-road",
  },
  {
    name: "New Gurgaon",
    sectors: "Sectors 76–95, KMP Expressway",
    priceRange: "₹7,000 – ₹12,000/sqft",
    highlight:
      "Gurgaon's long-term frontier. Adani Realty, M3M, Central Park executing township-scale projects with large land parcels. Entry pricing the most accessible of any premium corridor.",
    rightFor: "7–10 year investment horizon; buyers with patience and risk appetite for the Global City story.",
    ctaLabel: "View New Gurgaon Projects",
    ctaHref: "/properties?location=new-gurgaon",
  },
]

const infrastructureItems = [
  {
    title: "Road Connectivity",
    body: "NH-48 remains India's best-maintained arterial highway. Dwarka Expressway fully operational since 2024. Southern Peripheral Road and KMP Expressway complete Gurgaon's internal and regional connectivity.",
  },
  {
    title: "Metro Connectivity",
    body: "Delhi Metro Yellow Line at HUDA City Centre. Rapid Metro runs through Cyber City and Golf Course Road. Extension lines to GCER and Dwarka Expressway sectors in advanced planning.",
  },
  {
    title: "Airport Access",
    body: "IGI Airport 15–25 minutes from most Gurgaon premium addresses. 15 minutes from Dwarka Expressway corridor; under 25 minutes from Golf Course Road. Unmatched in NCR.",
  },
  {
    title: "Employment Hubs",
    body: "DLF Cyber City and Cyber Park house Google, Amazon, Microsoft, Goldman Sachs. Udyog Vihar, Golf Course Road offices, and Manesar IMT add further depth across multiple employment nodes.",
  },
  {
    title: "Education",
    body: "Shri Ram School, GD Goenka, Pathways World School, Scottish High, DPS, Amity. IB, Cambridge, and CBSE options. The breadth is particularly significant for NRI and expat families.",
  },
  {
    title: "Healthcare",
    body: "Medanta The Medicity (Sector 38), Fortis Memorial Research (Sector 44), Artemis Hospital (Sector 51), Max Hospital (Sector 56). Tertiary care of international calibre.",
  },
]

const developerHighlights = [
  {
    title: "DLF Limited",
    body: "Built Gurgaon's luxury residential identity. The only developer who manages their own facility management company post-delivery — why their projects from 15 years ago still look and function like premium buildings.",
  },
  {
    title: "Sobha Developer",
    body: "Backward-integrated model — controls concrete, steel, and finishing in-house. Measurably more consistent build quality. Strong demand from buyers who have lived in Sobha projects in Bangalore.",
  },
  {
    title: "Godrej Properties",
    body: "125+ years of group reputation. RERA compliance, escrow discipline, and construction transparency consistently among the best in the industry. Strongest institutional governance in Gurgaon.",
  },
  {
    title: "M3M India",
    body: "Gurgaon's most prolific active luxury developer. Portfolio spans GCER, Dwarka Expressway, and Golf Course Road. Large amenity clusters, integrated retail, consistent sales absorption.",
  },
  {
    title: "Emaar India",
    body: "Dubai heritage brings international luxury residential standards to Gurgaon. Golf Course Road projects — The Views, Palm Drive — remain well-regarded in the secondary market. Strong NRI brand recognition.",
  },
  {
    title: "Tata Housing",
    body: "Tata Group's institutional credibility in the premium residential segment. Gurgaon projects on Sohna Road are the most credible institutional choice at the premium price point.",
  },
]

const verificationChecklist = [
  {
    title: "HRERA Registration",
    body: "Mandatory before any payment — token or otherwise. Search the project on the HRERA portal, confirm registration number, review escrow account details, and check disclosed completion timeline.",
  },
  {
    title: "Developer Delivery Record",
    body: "Ask for references from buyers in completed Gurgaon projects from the same developer. Visit those projects in person. A developer's track record in other cities is far less relevant.",
  },
  {
    title: "Carpet Area Calculation",
    body: "Always calculate cost per sqft on carpet area. In Gurgaon's luxury segment, loading factors run 1.25 to 1.45. A 3,000 sqft super built-up is delivering 2,000–2,400 sqft of actual living space.",
  },
  {
    title: "OC and CC Status",
    body: "For ready units, the Occupancy Certificate and Completion Certificate from GMDA confirm legal approval for habitation. Do not make final payment without confirmed OC receipt.",
  },
  {
    title: "Total Acquisition Cost",
    body: "Stamp duty 7% (male) or 5% (female), registration charges, GST 5% on under-construction, club membership ₹5–25 lakh, 24-month maintenance deposit, fit-out costs. Total additions: 12–20% above advertised price.",
  },
  {
    title: "Title Verification",
    body: "Gurgaon has complex land title history. Legal verification of title and encumbrance status is essential. A fixed cost that is trivial relative to the transaction size — non-negotiable.",
  },
]

const faqs = [
  {
    question: "What is the price range for luxury apartments in Gurgaon in 2026?",
    answer:
      "Luxury apartments in Gurgaon span ₹3 crore to well above ₹40 crore depending on corridor, configuration, and developer. Premium apartments start from ₹3 crore for 3 BHK units. Mid-luxury 3 and 4 BHK homes range from ₹6 crore to ₹12 crore. Ultra luxury — sky villas, duplex penthouses, landmark DLF and Sobha projects — start at ₹12 crore and reach ₹40 crore and above.",
  },
  {
    question: "Which location is best for luxury apartments in Gurgaon?",
    answer:
      "The best location depends on your priorities. Golf Course Road offers the most established luxury address, shortest Cyber City commute, and deepest secondary market liquidity — at the highest price points. GCER offers modern construction and strong rental demand at lower per-sqft cost. Dwarka Expressway is the best investment entry in 2026 with operational infrastructure. Sohna Road offers premium value in a mature neighbourhood. New Gurgaon offers the longest-horizon appreciation story.",
  },
  {
    question: "Which developers build the best luxury apartments in Gurgaon?",
    answer:
      "DLF leads by delivery track record, product quality, and post-delivery facility management. Sobha is the most technically rigorous for construction quality through their backward-integrated model. Godrej Properties offers the strongest institutional governance and RERA compliance. M3M has the broadest active luxury portfolio. Emaar India brings international specifications particularly relevant to NRI buyers. Tata Housing is the most credible institutional choice at the premium tier.",
  },
  {
    question: "Are luxury apartments in Gurgaon RERA registered?",
    answer:
      "All legitimate luxury projects from established developers in Gurgaon are registered with HRERA — Haryana Real Estate Regulatory Authority. RERA registration requires developers to maintain a dedicated project escrow account, disclose approved plans and construction timelines, and obtain buyer consent before material changes. Buyers can verify any project's registration status on the HRERA portal. Do not make any payment toward any project without confirmed HRERA registration.",
  },
  {
    question: "What is the rental income potential for luxury apartments in Gurgaon?",
    answer:
      "Luxury apartments generate monthly rentals from ₹75,000 to ₹1.5 lakh for premium 3 BHK units, ₹1.5 lakh to ₹3 lakh for mid-luxury homes in Golf Course Road and GCER projects, and ₹3 lakh to ₹7 lakh and above for ultra luxury configurations. Rental yields on current market values range from 2.5 to 4 percent. Vacancy periods in well-located, well-managed projects are short.",
  },
  {
    question: "What is the difference between carpet area and super built-up area?",
    answer:
      "Carpet area is the actual internal usable space within your apartment measured wall to wall. Super built-up area adds a proportional share of common areas including corridors, lobbies, lift shafts, and external walls. In Gurgaon's luxury segment, loading factors typically range from 1.25 to 1.45. A project quoting 3,000 sqft super built-up is delivering approximately 2,000 to 2,400 sqft of actual carpet area. RERA mandates disclosure of carpet area — always compare projects on carpet area.",
  },
  {
    question: "What stamp duty is payable on luxury apartments in Gurgaon?",
    answer:
      "Stamp duty in Haryana is 7 percent for male buyers and 5 percent for female buyers. Registration charges add approximately 0.5 to 1 percent. On a ₹5 crore luxury apartment, stamp duty and registration together add ₹35–40 lakh for a male buyer. Transactions above ₹1 crore also require TDS at 1 percent of the consideration.",
  },
  {
    question: "What should NRI buyers know before purchasing luxury apartments in Gurgaon?",
    answer:
      "NRI buyers can purchase residential property in India under FEMA without RBI approval, with the exception of agricultural land, plantation property, and farmhouses. Payment must be made through NRE or NRO accounts or inward remittance in foreign currency. Rental income and sale proceeds are repatriable subject to applicable taxes and FEMA conditions. Power of attorney allows NRI buyers to execute documentation through a representative without physical presence. Engage a FEMA-aware chartered accountant and a qualified property lawyer before executing any purchase agreement.",
  },
]

export default function LuxuryApartmentsGurgaonPage() {
  return (
    <main>
      <LandingHero
        breadcrumb="Luxury Apartments in Gurgaon"
        badge="Buyer's Guide 2026"
        h1="Luxury Apartments in Gurgaon: Premium Flats, Top Projects & Complete Buyer's Guide 2026"
        subtitle="Explore premium flats, ultra-luxury homes, new launches and ready-to-move projects across Golf Course Road, GCER and Dwarka Expressway. Verified listings, real prices, expert guidance."
        primaryCta={{ label: "View Luxury Projects", href: "/properties" }}
        secondaryCta={{ label: "Get Expert Recommendations", href: "/contact" }}
      />

      {/* Why Gurgaon */}
      <ContentSection title="Why Buyers Are Choosing Gurgaon for Luxury Living Right Now">
        <p>
          Gurgaon is not a market that needs to be sold. Anyone evaluating luxury apartments in this city already knows what it
          offers — India&apos;s deepest corporate employment base, world-class social infrastructure, airport proximity unmatched by
          any other NCR location, and a residential product pipeline that is genuinely competitive with the best of Mumbai and
          Bangalore.
        </p>
        <p>
          Gurgaon&apos;s luxury residential market has absorbed three consecutive years of strong demand without a correction. New
          launch projects from credible developers in established corridors are selling 60 to 80 percent of inventory within
          months. Ready to move luxury apartments are transacting at all-time high prices in the secondary market. The NRI buyer
          cohort is the most active it has been in a decade. Domestic HNI demand — driven by equity market wealth creation,
          business exits, and senior professional income — shows no signs of softening.
        </p>
        <p>
          The opportunity is real. So is the risk of buying the wrong project from the wrong developer in the wrong location.
          This guide helps you tell the difference.
        </p>
      </ContentSection>

      {/* Market Snapshot */}
      <MarketSnapshot
        title="Luxury Apartments in Gurgaon — Market Snapshot 2026"
        stats={marketStats}
      />

      <InlineCTA
        heading="Find the right project for your budget and corridor"
        body="Filter verified luxury listings by budget, configuration, location, and project status."
        primaryCta={{ label: "See Projects by Budget", href: "/properties" }}
        variant="light"
      />

      {/* What Defines Luxury */}
      <ContentSection title="What Defines a True Luxury Apartment in Gurgaon" background="cream">
        <p>
          The word luxury is applied to every third project in Gurgaon&apos;s residential market. A genuine luxury apartment is
          defined by six characteristics working together — not one or two in isolation.
        </p>
        <ul className="space-y-3 list-none">
          {[
            ["Low project density", "Fewer than 500 units on a large land parcel, which translates to actual open space, manageable traffic, and maintenance ratios that support professional facility management over decades."],
            ["Carpet area that reflects the price point", "Luxury starts at approximately 1,500 sq ft carpet area for a 3 BHK and increases to 3,500 sq ft and above for large 4 BHK and duplex configurations."],
            ["Construction quality", "In this market, the builder matters more than the brochure. Projects from DLF, Sobha, Godrej Properties, and Tata Housing deliver what they show in their marketing."],
            ["Genuinely usable amenity stack", "A 200-unit project with a 40,000 sq ft clubhouse, a 25-metre pool, full-service fitness centre, and landscaped open areas covering 70% of the land is luxury. A 500-unit project with a 5,000 sq ft clubhouse is not."],
            ["Established or demonstrably improving micro-market", "Not a project on the frontier of a sector without schools, hospitals, or retail — a project where those things already exist or where infrastructure investment is already committed."],
            ["Professional post-delivery management", "A luxury apartment that deteriorates into a poorly maintained society within five years of possession is not a luxury investment. Developer-managed facilities hold their value in a way that self-managed RWAs rarely match."],
          ].map(([title, body], i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-[var(--luxury-gold)]/20 flex items-center justify-center text-[var(--luxury-navy)] font-bold text-xs">{i + 1}</span>
              <span><strong className="text-[var(--luxury-navy)]">{title}.</strong> {body}</span>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            ["Premium", "₹3 Cr – ₹6 Cr", "Large 3 BHK from credible developers in well-located sectors. Entry point to quality residential living."],
            ["Luxury", "₹6 Cr – ₹12 Cr", "Low-density projects with full amenity infrastructure along Golf Course Road, GCER, or central Sohna Road. Most active segment."],
            ["Ultra Luxury", "₹12 Cr+", "Address-defining projects — sky villas, duplex penthouses, limited-inventory towers from DLF, Sobha, Emaar, M3M."],
          ].map(([tier, price, desc]) => (
            <div key={tier} className="bg-white border border-[var(--luxury-border)] rounded-xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--luxury-gold)] mb-1">{tier}</p>
              <p className="text-lg font-bold text-[var(--luxury-navy)] mb-2">{price}</p>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <InlineCTA
        heading="Get personalised project recommendations"
        body="Tell us your budget, use case, and preferred corridor. Our advisors will shortlist the right projects."
        primaryCta={{ label: "Get Personalised Recommendations", href: "/contact" }}
        variant="dark"
      />

      {/* Corridors */}
      <CorridorCards
        title="Top Locations for Luxury Apartments in Gurgaon"
        subtitle="Five distinct corridors, each with a different value proposition. Your workplace, budget, and investment horizon determine which is right for you."
        corridors={corridors}
      />

      {/* Infrastructure */}
      <InfoGrid
        title="Connectivity and Infrastructure That Supports Premium Living"
        subtitle="Gurgaon's infrastructure has improved materially. Road, metro, and airport connectivity together support a daily lifestyle that no other NCR market can match at comparable residential quality."
        items={infrastructureItems}
        background="cream"
      />

      {/* Developers */}
      <InfoGrid
        title="Developer Highlights — Who Builds the Best Luxury Apartments in Gurgaon"
        subtitle="For any purchase above ₹3 crore, restrict your evaluation to developers with verifiable, completed project references in Gurgaon specifically."
        items={developerHighlights}
        background="white"
      />

      {/* Market Overview */}
      <ContentSection title="Current Real Estate Market Overview for Luxury Apartments in Gurgaon" background="cream">
        <p>
          New launch prices in Gurgaon&apos;s luxury segment have increased 25 to 45 percent from 2021 levels. Golf Course Road
          secondary market transactions are consistently above ₹15,000 per sq ft for quality projects, with DLF&apos;s ultra luxury
          portfolio transacting well above ₹25,000. GCER new launches are now pricing between ₹12,000 and ₹18,000 per sq ft.
          Dwarka Expressway remains the most attractively priced premium corridor at ₹9,000 to ₹14,000 per sq ft.
        </p>
        <p>
          Three buyer segments drive structural demand: senior corporate professionals who work in Gurgaon&apos;s business districts,
          NRI and returning expat buyers who want a quality residential base in India meeting international lifestyle benchmarks, and
          domestic HNI investors who see Gurgaon luxury real estate as a store of wealth with consistent rental income.
        </p>
        <p>
          For investors evaluating corridors: Dwarka Expressway offers the strongest near-to-medium term appreciation story. GCER
          offers the best combination of rental yield and appreciation in the active luxury band. Golf Course Road offers the most
          stable, lower-volatility return profile with the strongest secondary market depth.
        </p>
      </ContentSection>

      <InlineCTA
        heading="Download the 2026 Gurgaon Luxury Market Report"
        body="Price trends, corridor analysis, developer comparisons, and investment outlook — in one document."
        primaryCta={{ label: "Download Market Report", href: "/contact" }}
        secondaryCta={{ label: "Get Price List & Floor Plans", href: "/contact" }}
        variant="light"
      />

      {/* Verification Checklist */}
      <InfoGrid
        title="Things Buyers Must Verify Before Purchasing"
        subtitle="Non-negotiable due diligence before any token payment or agreement execution."
        items={verificationChecklist}
        background="cream"
      />

      {/* 2026 Outlook */}
      <ContentSection title="2026 Market Outlook for Luxury Apartments in Gurgaon">
        <p>
          Gurgaon&apos;s luxury residential market enters 2026 with better fundamentals than at any prior point in the city&apos;s history.
          Demand is structural rather than speculative. Supply from credible developers is being absorbed faster than it is being
          launched. Infrastructure investments continue to expand the city&apos;s attractive geography.
        </p>
        <p>
          The primary caution is corridor and developer concentration risk. Projects from less credible developers in peripheral
          locations are not sharing in the premium segment&apos;s strong performance. The flight to quality is real and ongoing —
          established developers in established or demonstrably improving corridors are performing well.
        </p>
        <p>
          The five-year outlook is positive and grounded in structural factors. The buyers who will perform best are those who buy
          the right product from the right developer in the right corridor — not those who buy the most accessible option or the
          one with the most impressive marketing.
        </p>
      </ContentSection>

      <InlineCTA
        heading="Browse Verified Luxury Projects Across Gurgaon"
        body="Compare RERA-registered luxury listings by location, developer, configuration, and price. Schedule a site visit with a CountryRoof advisor."
        primaryCta={{ label: "Browse Verified Projects", href: "/properties" }}
        secondaryCta={{ label: "Schedule Site Visit", href: "/contact" }}
        variant="dark"
      />

      {/* FAQ */}
      <FAQAccordion
        title="Frequently Asked Questions About Luxury Apartments in Gurgaon"
        faqs={faqs}
      />

      {/* Related Pages */}
      <RelatedPages
        items={[
          { label: "New Launch Projects in Gurgaon", href: "/new-launch-projects-gurgaon" },
          { label: "3 BHK Apartments in Gurgaon", href: "/3-bhk-apartments-gurgaon" },
          { label: "Golf Course Road Properties", href: "/properties?location=golf-course-road" },
          { label: "Dwarka Expressway Projects", href: "/properties?location=dwarka-expressway" },
          { label: "GCER Projects", href: "/properties?location=golf-course-extension-road" },
          { label: "Ready to Move Apartments", href: "/properties?status=ready-to-move" },
          { label: "Under Construction Projects", href: "/properties?status=under-construction" },
          { label: "RERA Approved Projects", href: "/properties?rera=true" },
        ]}
      />
    </main>
  )
}
