import React from 'react';
import { DesignSystem } from '../types';
import { Shuffle, Lock, Type, Sun, Moon, MoreHorizontal } from 'lucide-react';

interface StyleGuideViewProps {
  designSystem: DesignSystem;
}

export const StyleGuideView: React.FC<StyleGuideViewProps> = ({ designSystem }) => {
  const { colors, typography, brand } = designSystem;

  return (
    <div className="w-full h-full flex flex-col xl:flex-row gap-6 animate-in fade-in zoom-in-95 duration-500">
      
      {/* LEFT PANEL: Design Controls */}
      <div className="flex-1 flex flex-col gap-8 min-w-[320px]">
        
        {/* Header / Tools */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E5E0] rounded-xl shadow-sm">
                <span className="text-xs font-bold text-[#111111]">Concept 2</span>
                <MoreHorizontal size={14} className="text-gray-400" />
            </div>
            <div className="flex gap-2">
                <div className="flex items-center bg-white border border-[#E5E5E0] rounded-xl p-1">
                    <button className="p-1.5 hover:bg-[#F3F3F1] rounded-lg text-[#111111]"><Sun size={14} /></button>
                    <button className="p-1.5 hover:bg-[#F3F3F1] rounded-lg text-gray-400"><Moon size={14} /></button>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E5E0] rounded-xl text-xs font-bold text-[#111111] hover:bg-[#F3F3F1] transition-colors">
                    <Shuffle size={14} /> Shuffle
                </button>
            </div>
        </div>

        {/* COLORS SECTION */}
        <section>
            <h3 className="text-lg font-bold font-serif text-[#111111] mb-4">Colors</h3>
            <div className="flex flex-wrap gap-4">
                
                {/* Neutrals Card (Vertical Stack) */}
                <div className="w-24 h-48 bg-white border border-[#E5E5E0] rounded-xl overflow-hidden flex flex-col shadow-sm relative group">
                    <div className="absolute top-2 right-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"><Lock size={12} /></div>
                    <div className="p-2 border-b border-[#E5E5E0]">
                        <span className="text-[10px] font-bold text-[#111111]">Neutrals</span>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 bg-white"></div>
                        <div className="flex-1 bg-gray-50"></div>
                        <div className="flex-1 bg-gray-100"></div>
                        <div className="flex-1 bg-gray-200"></div>
                        <div className="flex-1 bg-gray-300"></div>
                        <div className="flex-1 bg-gray-800"></div>
                        <div className="flex-1 bg-[#111111]"></div>
                    </div>
                </div>

                {/* Primary Color */}
                <div className="flex-1 min-w-[140px] h-48 rounded-xl p-4 flex flex-col justify-between shadow-sm relative group transition-transform hover:scale-[1.02]" style={{ backgroundColor: colors.primary }}>
                     <div className="flex justify-between items-start">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur rounded-lg text-[10px] font-bold text-white">Primary</span>
                        <Lock size={14} className="text-white/50" />
                     </div>
                     <div>
                        <span className="text-white font-serif text-2xl font-bold block mb-1">Aa</span>
                        <span className="text-white/80 text-xs font-mono uppercase">{colors.primary}</span>
                     </div>
                </div>

                {/* Secondary Color */}
                <div className="flex-1 min-w-[140px] h-48 rounded-xl p-4 flex flex-col justify-between shadow-sm relative group transition-transform hover:scale-[1.02]" style={{ backgroundColor: colors.secondary }}>
                     <div className="flex justify-between items-start">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur rounded-lg text-[10px] font-bold text-white">Accent</span>
                        <Lock size={14} className="text-white/50" />
                     </div>
                     <div>
                        <span className="text-white font-serif text-2xl font-bold block mb-1">Aa</span>
                        <span className="text-white/80 text-xs font-mono uppercase">{colors.secondary}</span>
                     </div>
                </div>

                {/* Semantic/Surface (Small Stack) */}
                <div className="w-24 h-48 flex flex-col gap-2">
                     <div className="flex-1 rounded-xl bg-white border border-[#E5E5E0] flex items-center justify-center text-[#111111] text-xs font-bold shadow-sm hover:border-[#111111] transition-colors cursor-pointer">+</div>
                     <div className="h-12 rounded-xl" style={{ backgroundColor: colors.semantic.success }}></div>
                     <div className="h-12 rounded-xl" style={{ backgroundColor: colors.semantic.error }}></div>
                </div>

            </div>
        </section>

        {/* TYPOGRAPHY SECTION */}
        <section>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-serif text-[#111111]">Typography</h3>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-2 py-1 bg-white border border-[#E5E5E0] rounded-lg text-[10px] font-bold text-[#111111]">
                        <Type size={12} /> Regular
                    </button>
                    <button className="flex items-center gap-1.5 px-2 py-1 bg-white border border-[#E5E5E0] rounded-lg text-[10px] font-bold text-[#111111]">
                        <Shuffle size={12} /> Shuffle
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Headings Card */}
                <div className="bg-white border border-[#E5E5E0] rounded-xl p-5 shadow-sm hover:border-[#111111] transition-colors">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Headings</span>
                    <p className="text-3xl text-[#111111] mb-1 font-serif">{typography.fontHeading}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400">Serif • 24 styles</span>
                    </div>
                </div>

                {/* Body Card */}
                <div className="bg-white border border-[#E5E5E0] rounded-xl p-5 shadow-sm hover:border-[#111111] transition-colors">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Body</span>
                    <p className="text-3xl text-[#111111] mb-1 font-sans">{typography.fontBody}</p>
                    <div className="flex items-center gap-2">
                         <span className="text-[10px] text-gray-400">Sans Serif • 16 styles</span>
                    </div>
                </div>
            </div>
        </section>

        {/* UI STYLING SECTION */}
        <section>
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-serif text-[#111111]">UI Styling</h3>
                <button className="flex items-center gap-1.5 px-2 py-1 bg-white border border-[#E5E5E0] rounded-lg text-[10px] font-bold text-[#111111]">
                    <Shuffle size={12} /> Shuffle
                </button>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                {/* Buttons & Forms */}
                <div className="bg-white border border-[#E5E5E0] rounded-xl p-5 shadow-sm space-y-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Buttons</span>
                    <button className="w-full py-2.5 rounded-xl text-white text-xs font-bold shadow-sm transition-transform active:scale-95" style={{ backgroundColor: colors.primary }}>
                        Primary Button
                    </button>
                    <button className="w-full py-2.5 rounded-xl border bg-transparent text-xs font-bold transition-colors hover:bg-gray-50" style={{ borderColor: '#E5E5E0', color: '#111111' }}>
                        Secondary
                    </button>
                </div>

                {/* Cards & Images */}
                <div className="bg-white border border-[#E5E5E0] rounded-xl p-5 shadow-sm space-y-3">
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Inputs</span>
                     <div className="space-y-2">
                        <div className="h-8 w-full bg-[#F3F3F1] rounded-lg border border-transparent px-3 flex items-center text-xs text-gray-400 font-sans">
                            Name...
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-md border border-[#E5E5E0] flex items-center justify-center bg-[#111111] text-white">
                                <span className="text-[8px]">✓</span>
                            </div>
                            <span className="text-xs text-[#111111]">Checkbox</span>
                        </div>
                     </div>
                </div>
             </div>
        </section>

      </div>

      {/* RIGHT PANEL: LIVE PREVIEW (The "Website") */}
      <div className="flex-[1.2] bg-[#111111] rounded-3xl overflow-hidden shadow-2xl border border-[#333] relative flex flex-col">
        {/* Browser Header */}
        <div className="bg-[#222] px-4 py-3 flex items-center justify-between border-b border-[#333]">
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            <div className="px-3 py-1 bg-[#111111] rounded-md text-[10px] text-gray-500 font-mono flex items-center gap-2">
                <Lock size={8} /> pioneerservice.com
            </div>
            <div className="w-4"></div>
        </div>

        {/* Website Content (Scaled) */}
        <div className="flex-1 overflow-y-auto bg-white relative scrollbar-hide font-sans">
            
            {/* Nav */}
            <nav className="sticky top-0 bg-white/90 backdrop-blur z-10 border-b px-6 py-4 flex justify-between items-center" style={{ borderColor: '#E5E5E0' }}>
                 <div className="font-serif font-bold text-lg" style={{ color: colors.primary }}>{brand.name}</div>
                 <div className="hidden md:flex gap-4 text-xs font-bold text-gray-600">
                    <span>Services</span>
                    <span>About</span>
                    <span>Contact</span>
                 </div>
                 <button className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ backgroundColor: colors.secondary }}>
                    Book Now
                 </button>
            </nav>

            {/* Hero */}
            <header className="px-6 py-16 flex flex-col items-center text-center" style={{ backgroundColor: colors.surface }}>
                 <span className="px-3 py-1 rounded-md bg-white border text-[10px] font-bold uppercase tracking-widest mb-6" style={{ borderColor: '#E5E5E0', color: colors.secondary }}>
                    Trusted by 500+ Homes
                 </span>
                 <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-lg leading-tight font-serif" style={{ color: colors.text.primary }}>
                    Reliable & Caring Home Service
                 </h1>
                 <p className="text-sm md:text-base mb-8 max-w-md" style={{ color: colors.text.secondary }}>
                    Expert HVAC installation, repair & appliance services. Honest. Fast. Professional.
                 </p>
                 <div className="flex gap-3">
                    <button className="px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg shadow-orange-500/20" style={{ backgroundColor: colors.secondary }}>
                        Get Started
                    </button>
                    <button className="px-6 py-3 rounded-xl font-bold text-sm bg-white border border-gray-200" style={{ color: colors.text.primary }}>
                        View Plans
                    </button>
                 </div>
            </header>

            {/* Features Grid */}
            <section className="px-6 py-16 bg-white">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-2xl font-bold font-serif mb-2" style={{ color: colors.text.primary }}>Services We Dominate</h2>
                        <p className="text-xs text-gray-500">Specialized capabilities in high-ticket markets.</p>
                    </div>
                    <button className="text-xs font-bold underline decoration-2 underline-offset-4" style={{ color: colors.primary }}>View All</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     {['AC Repair', 'Heating', 'Appliances', 'Electrical'].map((item, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group bg-[#FAFAFA]">
                             <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-4 text-gray-400 group-hover:text-white transition-colors" style={{  }}>
                                 <div className="w-4 h-4 rounded-md" style={{ backgroundColor: i % 2 === 0 ? colors.primary : colors.secondary }}></div>
                             </div>
                             <h3 className="font-bold text-sm mb-1 font-serif" style={{ color: colors.text.primary }}>{item}</h3>
                             <p className="text-[10px] text-gray-500">Professional {item.toLowerCase()} services.</p>
                        </div>
                     ))}
                </div>
            </section>

             {/* Footer */}
             <footer className="bg-[#111111] text-white px-6 py-12 text-center">
                <div className="font-serif font-bold text-xl mb-4">{brand.name}</div>
                <p className="text-xs text-gray-500">© 2024 Pioneer Service. All rights reserved.</p>
             </footer>
        </div>

        {/* Floating Tag */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-[#FFD700] text-[#111111] text-[10px] font-bold rounded-lg shadow-lg transform rotate-[-2deg]">
            Jason
        </div>
      </div>

    </div>
  );
};