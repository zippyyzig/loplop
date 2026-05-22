"use client"

import React, { useRef, useState, FormEvent } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { 
  ShieldCheck, Info, Maximize, IndianRupee, Flag, Waves, Building2, 
  GlassWater, ChevronLeft, ChevronRight, MapPin, Ship, TrainTrack, 
  Route, Navigation, Tag, Building, Loader2, Check, AlertCircle, X 
} from "lucide-react"

export default function SunteckBeachResidencesPage() {
  const lifestyleSliderRef = useRef<HTMLDivElement>(null)
  const estateSliderRef = useRef<HTMLDivElement>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalState, setModalState] = useState({ isOpen: false, isSuccess: true, title: "", message: "" })

  const scrollSlider = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const slideWidth = ref.current.firstElementChild?.clientWidth || 300
      const scrollAmount = direction === "left" ? -slideWidth - 16 : slideWidth + 16
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleEOISubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Gather form data securely
    const formData = new FormData(e.currentTarget)
    const payload = {
      user_name: formData.get("user_name"),
      user_phone: formData.get("user_phone"),
      user_email: formData.get("user_email"),
      configuration: formData.get("configuration"),
    }

    try {
      // Call the backend API route we created
      const response = await fetch("/api/send-eoi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setModalState({
          isOpen: true,
          isSuccess: true,
          title: "EOI Registered Successfully",
          message: "Thank you for your interest in Sunteck Beach Residences. Our luxury consultant will contact you shortly regarding the ₹2 Lakh refundable EOI process."
        })
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error(data.error || "Failed to submit")
      }
    } catch (error) {
      console.error("Submission error:", error)
      setModalState({
        isOpen: true,
        isSuccess: false,
        title: "Submission Failed",
        message: "We encountered an issue processing your request. Please try again later or contact us directly."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => setModalState(prev => ({ ...prev, isOpen: false }))

  return (
    <div className="bg-[#fcfbf9] text-gray-800 antialiased overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
        <style dangerouslySetInnerHTML={{__html: `
             @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;500;600;700&display=swap');
             .font-heading { font-family: 'Montserrat', sans-serif; }
             .text-gold-gradient { background: linear-gradient(135deg, #e0c38c 0%, #b49a5b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
             .hide-scrollbar::-webkit-scrollbar { display: none; }
             .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
         `}} />

      <nav className="fixed w-full z-50 bg-[#0f172a]/95 backdrop-blur border-b border-[#b49a5b]/20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="font-heading text-xl font-semibold tracking-wider text-[#c5a365]">SBR</span>
              <span className="text-xs uppercase tracking-[0.2em] border-l border-gray-600 pl-2 text-gray-300 hidden sm:block">Oceanopolis</span>
            </div>
            <div className="hidden md:flex space-x-6 text-sm font-medium tracking-wide">
              <a href="#overview" className="hover:text-[#c5a365] transition">Overview</a>
              <a href="#pricing" className="hover:text-[#c5a365] transition">Pricing</a>
              <a href="#amenities" className="hover:text-[#c5a365] transition">Lifestyle</a>
              <a href="#location" className="hover:text-[#c5a365] transition">Location</a>
            </div>
            <div>
              <a href="#contact" className="bg-[#b49a5b] hover:bg-[#917943] text-white text-xs font-semibold py-2 px-4 uppercase tracking-wider transition rounded-sm">
                Submit EOI
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section id="overview" className="relative h-[85vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="/img/img385.jpg" alt="Luxury Beachfront" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/70 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start mt-12">
          <span className="text-[#c5a365] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Sunteck Beach Residences</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 max-w-2xl">
            Mumbai's Luxury <br/>Beachfront Living.
          </h1>
          <p className="text-gray-200 text-sm md:text-base mb-6 max-w-xl leading-relaxed border-l-2 border-[#b49a5b] pl-4">
            The most exclusive phase of a 50-acre private estate. Uninterrupted sea views, a 9-acre golf course, and elite coastal living just 500 meters from Suruchi Beach, Vasai (W).
          </p>
          
          <div className="bg-[#0f172a]/80 backdrop-blur-md border border-[#b49a5b]/30 p-5 rounded-sm inline-block w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Priority Allotment</p>
                <p className="text-lg font-heading font-semibold text-white">Refundable EOI: ₹2 Lakhs</p>
              </div>
              <ShieldCheck className="text-[#c5a365] w-6 h-6" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-300">
              <div className="border border-white/10 p-2 rounded-sm bg-white/5">
                <span className="block text-[#c5a365] font-semibold mb-1">2 BHK Premium</span>
                From ₹ 1.08 Cr*
              </div>
              <div className="border border-white/10 p-2 rounded-sm bg-white/5">
                <span className="block text-[#c5a365] font-semibold mb-1">3 BHK Luxury</span>
                From ₹ 1.86 Cr*
              </div>
            </div>
            <a href="#contact" className="block w-full text-center bg-white text-[#0f172a] hover:bg-[#b49a5b] hover:text-white transition text-xs font-bold py-3 uppercase tracking-wider rounded-sm">
              Express Interest
            </a>
          </div>
        </div>
      </section>

      <div className="bg-[#0f172a] border-y border-[#b49a5b]/30 text-white py-4 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-gray-700">
            <div className="px-2">
              <p className="text-[#c5a365] text-sm font-heading font-semibold mb-1">500 Mtrs</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400">From Suruchi Beach</p>
            </div>
            <div className="px-2">
              <p className="text-[#c5a365] text-sm font-heading font-semibold mb-1">50 Acres</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400">Private Coastal Estate</p>
            </div>
            <div className="px-2">
              <p className="text-[#c5a365] text-sm font-heading font-semibold mb-1">9 Acres</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400">Sea-Facing Golf Course</p>
            </div>
            <div className="px-2">
              <p className="text-[#c5a365] text-sm font-heading font-semibold mb-1">23 Acres</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400">Lush Open Greenery</p>
            </div>
          </div>
        </div>
      </div>

      <section id="pricing" className="py-10 bg-[#f9f8f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-300 pb-4">
            <div className="max-w-2xl">
              <h2 className="text-xs text-[#917943] font-bold uppercase tracking-[0.2em] mb-2">Curated Residences</h2>
              <h3 className="font-heading text-3xl font-semibold text-[#0f172a]">Exclusive Pricing & Configurations</h3>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-500 flex items-center">
              <Info className="w-4 h-4 mr-1 mb-0.5 inline" /> Uniform Pricing: ₹15,500 per sq.ft.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#b49a5b]/30 rounded-sm shadow-sm hover:shadow-md transition group overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-2/5 bg-gray-100 relative h-48 sm:h-auto overflow-hidden">
                <img src="/img/img232.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="2 BHK Premium" />
                <div className="absolute inset-0 bg-[#0f172a]/10"></div>
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                <h4 className="font-heading text-xl font-semibold text-[#0f172a] mb-1">2 BHK Premium</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Oceanopolis Phase</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-xs text-gray-500 flex items-center"><Maximize className="w-3 h-3 mr-2 text-[#b49a5b]" /> Carpet Area</span>
                    <span className="text-sm font-medium text-gray-800">700 - 850 sq.ft.</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-xs text-gray-500 flex items-center"><IndianRupee className="w-3 h-3 mr-2 text-[#b49a5b]" /> Rate</span>
                    <span className="text-sm font-medium text-gray-800">₹ 15,500 psf</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Starting From</p>
                    <p className="font-heading text-xl text-[#917943] font-semibold">₹ 1.08 Cr*</p>
                  </div>
                  <a href="#contact" className="border border-[#0f172a] text-[#0f172a] hover:bg-[#0f172a] hover:text-white text-xs px-4 py-2 transition rounded-sm uppercase tracking-wider font-medium">Book EOI</a>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#b49a5b]/30 rounded-sm shadow-sm hover:shadow-md transition group overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-2/5 bg-gray-100 relative h-48 sm:h-auto overflow-hidden">
                <img src="/img/img215.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="3 BHK Luxury" />
                <div className="absolute inset-0 bg-[#0f172a]/10"></div>
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                <h4 className="font-heading text-xl font-semibold text-[#0f172a] mb-1">3 BHK Luxury</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Oceanopolis Phase</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-xs text-gray-500 flex items-center"><Maximize className="w-3 h-3 mr-2 text-[#b49a5b]" /> Carpet Area</span>
                    <span className="text-sm font-medium text-gray-800">1200 - 1400 sq.ft.</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-xs text-gray-500 flex items-center"><IndianRupee className="w-3 h-3 mr-2 text-[#b49a5b]" /> Rate</span>
                    <span className="text-sm font-medium text-gray-800">₹ 15,500 psf</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Starting From</p>
                    <p className="font-heading text-xl text-[#917943] font-semibold">₹ 1.86 Cr*</p>
                  </div>
                  <a href="#contact" className="border border-[#0f172a] text-[#0f172a] hover:bg-[#0f172a] hover:text-white text-xs px-4 py-2 transition rounded-sm uppercase tracking-wider font-medium">Book EOI</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="amenities" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-xs text-[#917943] font-bold uppercase tracking-[0.2em] mb-2">The Estate</h2>
            <h3 className="font-heading font-semibold text-3xl text-[#0f172a] mb-4">A Realm of the Truly Extraordinary</h3>
            <p className="text-sm text-gray-600">Built to perform long after others peak. Crafted with enduring design, robust construction, and timeless appeal, reserved for the exceptional few.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative group h-64 overflow-hidden rounded-sm">
              <img src="/img/img400.jpg" className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Golf Course" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <Flag className="text-[#c5a365] w-5 h-5 mb-2" />
                <h4 className="font-heading font-semibold text-white text-lg">9-Acre Golf Course</h4>
                <p className="text-[10px] text-gray-300 uppercase tracking-wide">Sweeping Sea Views</p>
              </div>
            </div>
            
            <div className="relative group h-64 overflow-hidden rounded-sm">
              <img src="/img/img291.jpg" className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Beachfront Lifestyle" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <Waves className="text-[#c5a365] w-5 h-5 mb-2" />
                <h4 className="font-heading font-semibold text-white text-lg">Beachfront Lifestyle</h4>
                <p className="text-[10px] text-gray-300 uppercase tracking-wide">Exclusive Coastal Shacks</p>
              </div>
            </div>

            <div className="relative group h-64 overflow-hidden rounded-sm">
              <img src="/img/img238.jpg" className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Grand Atriums" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <Building2 className="text-[#c5a365] w-5 h-5 mb-2" />
                <h4 className="font-heading font-semibold text-white text-lg">Grand Atriums</h4>
                <p className="text-[10px] text-gray-300 uppercase tracking-wide">Magnificent Architecture</p>
              </div>
            </div>

            <div className="relative group h-64 overflow-hidden rounded-sm">
              <img src="/img/img241.jpg" className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Infinity Pool" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <GlassWater className="text-[#c5a365] w-5 h-5 mb-2" />
                <h4 className="font-heading font-semibold text-white text-lg">Luxury Club</h4>
                <p className="text-[10px] text-gray-300 uppercase tracking-wide">Infinity Pool & Spa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-10 bg-[#fcfbf9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 border-b border-gray-300 pb-4">
            <div>
              <h2 className="text-xs text-[#917943] font-bold uppercase tracking-[0.2em] mb-2">The Coastal Life</h2>
              <h3 className="font-heading font-semibold text-3xl text-[#0f172a]">Everyday by the Ocean</h3>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => scrollSlider(lifestyleSliderRef, 'left')} className="w-10 h-10 border border-[#b49a5b] flex items-center justify-center text-[#917943] hover:bg-[#b49a5b] hover:text-white transition rounded-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scrollSlider(lifestyleSliderRef, 'right')} className="w-10 h-10 border border-[#b49a5b] flex items-center justify-center text-[#917943] hover:bg-[#b49a5b] hover:text-white transition rounded-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div ref={lifestyleSliderRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-4">
            {[
              { src: "/img/img869.jpg", title: "Private Ocean Vistas", sub: "A Signature in the Sky" },
              { src: "/img/img817.jpg", title: "Sunset Dining", sub: "Curated Culinary Experiences" },
              { src: "/img/img609.jpg", title: "Coastal Wellness", sub: "A Seaside Pause for Peace" },
              { src: "/img/img677.jpg", title: "Adventure & Sports", sub: "Dive into the Blue" },
              { src: "/img/img541.jpg", title: "Energizing Mornings", sub: "Active Beachfront Lifestyle" },
              { src: "/img/img747.jpg", title: "Family Moments", sub: "Cherished Memories Everyday" },
            ].map((slide, i) => (
              <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[50vw] lg:w-[30vw] h-[400px] relative rounded-sm overflow-hidden group">
                <img src={slide.src} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={slide.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="font-heading font-semibold text-white text-xl">{slide.title}</h4>
                  <p className="text-[10px] text-gray-300 uppercase tracking-widest mt-1">{slide.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="project-gallery" className="py-10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 border-b border-gray-300 pb-4">
            <div>
              <h2 className="text-xs text-[#917943] font-bold uppercase tracking-[0.2em] mb-2">Masterplan & Architecture</h2>
              <h3 className="font-heading font-semibold text-3xl text-[#0f172a]">The Oceanopolis Estate</h3>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => scrollSlider(estateSliderRef, 'left')} className="w-10 h-10 border border-[#b49a5b] flex items-center justify-center text-[#917943] hover:bg-[#b49a5b] hover:text-white transition rounded-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scrollSlider(estateSliderRef, 'right')} className="w-10 h-10 border border-[#b49a5b] flex items-center justify-center text-[#917943] hover:bg-[#b49a5b] hover:text-white transition rounded-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div ref={estateSliderRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-4">
             {[
              { src: "/img/img513.jpg", title: "The Coastal Legacy", sub: "A Master-planned Beachfront Township" },
              { src: "/img/img492.jpg", title: "Grand Courtyards & Club", sub: "Immersive Green Architecture" },
              { src: "/img/img483.jpg", title: "Elevated Infinity Pool", sub: "A Seamless Blend of Water and Sky" },
              { src: "/img/img501.jpg", title: "Sunset Dining Lounge", sub: "Gourmet Experiences by the Water" },
              { src: "/img/img504.jpg", title: "Sunteck Beach Drive", sub: "The Next International High Street" },
              { src: "/img/img498.jpg", title: "International Benchmarks", sub: "Inspired by Miami, Dubai, & Beverly Hills" },
              { src: "/img/img507.jpg", title: "Elegant Interiors", sub: "Curated Spaces for Social Indulgence" },
              { src: "/img/img482.jpg", title: "Podium Gardens", sub: "Lush Landscapes Uniting All Towers" },
              { src: "/img/img444.jpg", title: "Central Parks", sub: "A 23-Acre Haven of Open Spaces" },
              { src: "/img/img443.jpg", title: "Serene Walkways", sub: "Discover Tranquility at Every Step" },
            ].map((slide, i) => (
              <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[350px] sm:h-[450px] relative rounded-sm overflow-hidden group">
                <img src={slide.src} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={slide.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="font-heading font-semibold text-white text-xl">{slide.title}</h4>
                  <p className="text-[10px] text-gray-300 uppercase tracking-widest mt-1">{slide.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="py-10 bg-[#0f172a] text-white border-t border-[#b49a5b]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-xs text-[#c5a365] font-bold uppercase tracking-[0.2em] mb-2">Location</h2>
              <h3 className="font-heading font-semibold text-3xl mb-4">When World-Class Connectivity Arrives, City Limits Disappear.</h3>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Strategically located at Vasai (W), a hub of proximities and a haven of calm. As the Coastal Road approaches SBR, it presents an unprecedented investment opportunity with high appreciation potential.
              </p>
              
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start">
                  <MapPin className="text-[#c5a365] w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>500 Meters</strong> to pristine Suruchi Beach.</span>
                </li>
                <li className="flex items-start">
                  <Ship className="text-[#c5a365] w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Daily 16 RoRo</strong> ferry services between Bhayandar and Vasai.</span>
                </li>
                <li className="flex items-start">
                  <TrainTrack className="text-[#c5a365] w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Vasai-Diva-Roha Line</strong> links Western, Central, and Harbour lines.</span>
                </li>
                <li className="flex items-start">
                  <Route className="text-[#c5a365] w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                  <span><strong>Coastal Road Edge:</strong> 25 mins from Versova, 40 mins from Airport.</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[350px] lg:h-[450px] border border-[#b49a5b]/30 p-2 rounded-sm bg-[#1a2332]">
              <img src="/img/img491.jpg" className="w-full h-full object-cover rounded-sm filter brightness-90" alt="Connectivity Map" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#0f172a]/90 backdrop-blur border border-[#b49a5b] text-center p-4 rounded-sm shadow-2xl">
                  <Navigation className="w-6 h-6 text-[#c5a365] mx-auto mb-1" />
                  <p className="font-heading font-semibold text-lg text-white">Vasai West</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Mumbai's Coastal Frontier</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-10 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl border border-[#b49a5b]/30 flex flex-col md:flex-row overflow-hidden rounded-sm">
            
            <div className="md:w-5/12 bg-[#0f172a] p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#b49a5b] rounded-bl-full opacity-10"></div>
              <div className="relative z-10">
                <h3 className="font-heading font-semibold text-2xl mb-2 text-[#c5a365]">Secure Your Legacy</h3>
                <p className="text-sm text-gray-300 mb-6">Submit your Expression of Interest (EOI) today to guarantee priority allotment at lowest pre-launch pricing.</p>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border border-[#b49a5b]/50 flex items-center justify-center mr-3">
                      <Tag className="w-4 h-4 text-[#c5a365]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">EOI Amount</p>
                      <p className="font-medium">₹ 2,000,000 (Fully Refundable)</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border border-[#b49a5b]/50 flex items-center justify-center mr-3">
                      <Building className="w-4 h-4 text-[#c5a365]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Developer</p>
                      <p className="font-medium">Sunteck Realty (Zero Net Debt)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 relative z-10">
                <img src="/img/img228.jpg" className="h-24 w-full object-cover rounded-sm opacity-80" alt="Sunteck Realty" />
              </div>
            </div>

            <div className="md:w-7/12 p-8">
              <h4 className="font-heading font-semibold text-xl text-[#0f172a] mb-4">Register Interest</h4>
              
              <form id="eoi-form" className="space-y-4" onSubmit={handleEOISubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name *</label>
                    <input type="text" name="user_name" required className="w-full border-b border-gray-300 py-2 text-sm bg-transparent focus:outline-none focus:border-[#b49a5b] transition placeholder-gray-400" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Phone Number *</label>
                    <input type="tel" name="user_phone" required className="w-full border-b border-gray-300 py-2 text-sm bg-transparent focus:outline-none focus:border-[#b49a5b] transition placeholder-gray-400" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email Address *</label>
                  <input type="email" name="user_email" required className="w-full border-b border-gray-300 py-2 text-sm bg-transparent focus:outline-none focus:border-[#b49a5b] transition placeholder-gray-400" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Interested Configuration</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-sm cursor-pointer">
                      <input type="radio" name="configuration" value="2BHK" className="mr-2 text-[#b49a5b] focus:ring-[#b49a5b] border-gray-300" defaultChecked />
                      2 BHK Premium
                    </label>
                    <label className="flex items-center text-sm cursor-pointer">
                      <input type="radio" name="configuration" value="3BHK" className="mr-2 text-[#b49a5b] focus:ring-[#b49a5b] border-gray-300" />
                      3 BHK Luxury
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#0f172a] hover:bg-[#b49a5b] text-white font-semibold py-3 text-sm uppercase tracking-widest transition flex justify-center items-center rounded-sm disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</>
                    ) : (
                      "Submit EOI Application"
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 text-center mt-2">By submitting this form, you agree to be contacted by Sunteck authorized representatives.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Luxury Message Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white border border-[#b49a5b]/50 p-8 max-w-sm w-full rounded-sm shadow-2xl transform transition-transform duration-300 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-[#0f172a] transition">
              <X className="w-5 h-5" />
            </button>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${modalState.isSuccess ? 'bg-amber-50' : 'bg-red-50'}`}>
              {modalState.isSuccess ? (
                <Check className="w-6 h-6 text-[#917943]" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
            <h3 className="font-heading font-semibold text-xl text-[#0f172a] mb-2">{modalState.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">{modalState.message}</p>
            <button onClick={closeModal} className="w-full bg-[#0f172a] text-white text-xs uppercase tracking-wider py-2 font-medium hover:bg-[#b49a5b] transition rounded-sm">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}