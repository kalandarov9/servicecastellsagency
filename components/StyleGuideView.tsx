
import React, { useState } from 'react';
import { DesignSystem } from '../types';
import { Shuffle, Lock, Type, Sun, Moon, Check } from 'lucide-react';

interface StyleGuideViewProps {
  designSystem: DesignSystem;
}

type ConceptType = 'Concept 1' | 'Concept 2';

const FONT_PAIRS = [
  { heading: 'Playfair Display', body: 'Satoshi' },
  { heading: 'Lora', body: 'Montserrat' },
  { heading: 'Fraunces', body: 'Jost' }
];

export const StyleGuideView: React.FC<StyleGuideViewProps> = ({ designSystem }) => {
  const [activeConcept, setActiveConcept] = useState<ConceptType>('Concept 1');
  const [accentColor, setAccentColor] = useState(designSystem.colors.secondary);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [typographyIndex, setTypographyIndex] = useState(0);

  const activeFonts = FONT_PAIRS[typographyIndex];

  // Hardcoded styles for demonstration
  const concepts = {
    'Concept 1': {
      primary: '#0F4C81',
      surface: '#F8FAFC',
      label: 'Modern Professional',
      defaultAccent: '#FF7A59'
    },
    'Concept 2': {
      primary: '#1A1A1A',
      surface: '#FDFDFB',
      label: 'Premium / Luxury',
      defaultAccent: '#C5A059'
    }
  };

  const currentTheme = concepts[activeConcept];

  const handleShuffle = () => {
    const randomColors = activeConcept === 'Concept 1' 
      ? ['#FF7A59', '#38BDF8', '#818CF8', '#F472B6'] 
      : ['#C5A059', '#8B7355', '#D4AF37', '#738291'];
    const nextColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    setAccentColor(nextColor);
  };

  const selectConcept = (concept: ConceptType) => {
    setActiveConcept(concept);
    setAccentColor(concepts[concept].defaultAccent);
  };

  const cycleFonts = () => {
    setTypographyIndex((prev) => (prev + 1) % FONT_PAIRS.length);
  };

  // Live Preview Theme Colors
  const previewStyles = {
    bg: isDarkMode ? '#111111' : currentTheme.surface,
    text: isDarkMode ? '#F8FAFC' : '#111111',
    card: isDarkMode ? '#1A1A1A' : '#FFFFFF',
    border: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F1F1F1',
    subtext: isDarkMode ? '#94A3B8' : '#64748B'
  };

  return (
    <div className="w-full h-full flex flex-col xl:flex-row gap-6 animate-in fade-in zoom-in-95 duration-500">
      
      {/* LEFT PANEL: Design Controls */}
      <div className="flex-1 flex flex-col gap-8 min-w-[320px]">
        
        {/* Concept Segmented Control */}
        <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Visual Concept Selector</span>
            <div className="flex p-1 bg-white border border-[#E5E5E0] rounded-2xl shadow-sm">
                {(['Concept 1', 'Concept 2'] as ConceptType[]).map((c) => (
                    <button
                        key={c}
                        onClick={() => selectConcept(c)}
                        className={`
                            flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300
                            ${activeConcept === c 
                                ? 'bg-[#111111] text-white shadow-lg' 
                                : 'text-gray-400 hover:text-[#111111] hover:bg-gray-50'}
                        `}
                    >
                        {c}
                        <span className={`block text-[8px] opacity-60 font-normal mt-0.5 ${activeConcept === c ? 'text-white' : 'text-gray-400'}`}>
                            {concepts[c].label}
                        </span>
                    </button>
                ))}
            </div>
        </div>

        {/* Header Actions (Theme Toggle / Refresh) */}
        <div className="flex items-center justify-between">
            <div className="flex items-center bg-white border border-[#E5E5E0] rounded-xl p-1 shadow-sm">
                <button 
                  onClick={() => setIsDarkMode(false)}
                  className={`p-1.5 rounded-lg transition-colors ${!isDarkMode ? 'bg-[#111111] text-white shadow-sm' : 'text-gray-400 hover:bg-[#F3F3F1]'}`}
                  title="Light Mode"
                >
                  <Sun size={14} />
                </button>
                <button 
                  onClick={() => setIsDarkMode(true)}
                  className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'bg-[#111111] text-white shadow-sm' : 'text-gray-400 hover:bg-[#F3F3F1]'}`}
                  title="Dark Mode"
                >
                  <Moon size={14} />
                </button>
            </div>
            
            <button 
                onClick={handleShuffle}
                className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-[#111111] rounded-xl text-xs font-bold text-white hover:bg-black transition-all shadow-lg shadow-[#111111]/10 active:scale-95"
            >
                <Shuffle size={14} /> Refresh Accent
            </button>
        </div>

        {/* COLORS SECTION */}
        <section>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-serif text-[#111111]">Color Palette</h3>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{currentTheme.label}</span>
            </div>
            <div className="flex flex-wrap gap-4">
                
                {/* Neutrals Card */}
                <div className="w-24 h-48 bg-white border border-[#E5E5E0] rounded-xl overflow-hidden flex flex-col shadow-sm relative group">
                    <div className="absolute top-2 right-2 text-gray-400"><Lock size={10} /></div>
                    <div className="p-2 border-b border-[#E5E5E0]">
                        <span className="text-[10px] font-bold text-[#111111]">Surface</span>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 bg-white"></div>
                        <div className="flex-1 bg-gray-50"></div>
                        <div className="flex-1 bg-gray-100"></div>
                        <div className="flex-1 bg-gray-200"></div>
                        <div className="flex-1 bg-[#111111]"></div>
                    </div>
                </div>

                {/* Primary Color */}
                <div 
                    className="flex-1 min-w-[140px] h-48 rounded-xl p-5 flex flex-col justify-between shadow-sm relative transition-all duration-500" 
                    style={{ backgroundColor: currentTheme.primary }}
                >
                     <div className="flex justify-between items-start">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[9px] font-bold text-white uppercase tracking-wider">Main</span>
                        <Lock size={12} className="text-white/40" />
                     </div>
                     <div>
                        <span className="text-white text-3xl font-bold block mb-1 leading-none" style={{ fontFamily: activeFonts.heading }}>Aa</span>
                        <span className="text-white/60 text-[10px] font-mono uppercase tracking-widest">{currentTheme.primary}</span>
                     </div>
                </div>

                {/* Accent Color (Dynamic) */}
                <div 
                    className="flex-1 min-w-[140px] h-48 rounded-xl p-5 flex flex-col justify-between shadow-sm relative transition-all duration-500" 
                    style={{ backgroundColor: accentColor }}
                >
                     <div className="flex justify-between items-start">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[9px] font-bold text-white uppercase tracking-wider">Accent</span>
                        <button onClick={handleShuffle} className="p-1 hover:bg-white/20 rounded-md transition-colors">
                            <Shuffle size={12} className="text-white" />
                        </button>
                     </div>
                     <div>
                        <span className="text-white text-3xl font-bold block mb-1 leading-none" style={{ fontFamily: activeFonts.heading }}>Aa</span>
                        <span className="text-white/60 text-[10px] font-mono uppercase tracking-widest">{accentColor}</span>
                     </div>
                </div>

            </div>
        </section>

        {/* TYPOGRAPHY SECTION */}
        <section>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-serif text-[#111111]">Typography</h3>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={cycleFonts}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] border border-[#111111] rounded-xl text-[10px] font-bold text-white shadow-lg active:scale-95 transition-all"
                    >
                        <Type size={12} /> Cycle Fonts
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 shadow-sm hover:border-[#111111] transition-all group">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">Heading Font</span>
                    <p className="text-4xl text-[#111111] mb-1 group-hover:scale-105 transition-transform origin-left truncate" style={{ fontFamily: activeFonts.heading }}>
                        {activeFonts.heading}
                    </p>
                    <span className="text-[10px] text-gray-400">Google Font • Professional</span>
                </div>

                <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 shadow-sm hover:border-[#111111] transition-all group">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">Body Font</span>
                    <p className="text-4xl text-[#111111] mb-1 group-hover:scale-105 transition-transform origin-left truncate" style={{ fontFamily: activeFonts.body }}>
                        {activeFonts.body}
                    </p>
                    <span className="text-[10px] text-gray-400">Google Font • Optimized</span>
                </div>
            </div>
        </section>

        {/* UI COMPONENTS SECTION */}
        <section>
             <h3 className="text-lg font-bold font-serif text-[#111111] mb-4">UI Elements</h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                    <button 
                        className="w-full py-3 rounded-xl text-white text-xs font-bold transition-all transform active:scale-95 shadow-md" 
                        style={{ backgroundColor: currentTheme.primary }}
                    >
                        Primary Action
                    </button>
                    <button 
                        className="w-full py-3 rounded-xl border-2 text-xs font-bold transition-all" 
                        style={{ borderColor: accentColor, color: accentColor }}
                    >
                        Secondary CTA
                    </button>
                </div>
                <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
                                <Check size={12} strokeWidth={3} />
                            </div>
                            <span className="text-xs font-medium text-[#111111]">Enabled State</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 rounded-full" style={{ backgroundColor: currentTheme.primary }}></div>
                        </div>
                    </div>
                </div>
             </div>
        </section>

      </div>

      {/* RIGHT PANEL: LIVE PREVIEW */}
      <div className="flex-[1.2] bg-[#111111] rounded-[32px] overflow-hidden shadow-2xl border border-[#333] relative flex flex-col min-h-[600px]">
        {/* Browser Header */}
        <div className="bg-[#1a1a1a] px-5 py-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
            <div className="px-4 py-1 bg-black rounded-full text-[9px] text-gray-500 font-mono flex items-center gap-2 border border-white/5">
                <Lock size={8} /> pioneerservice.com
            </div>
            <div className="w-4"></div>
        </div>

        {/* Website Content (Scaled) */}
        <div 
          className="flex-1 overflow-y-auto relative scrollbar-hide transition-all duration-700"
          style={{ backgroundColor: previewStyles.bg, fontFamily: activeFonts.body }}
        >
            
            {/* Nav */}
            <nav 
              className="sticky top-0 z-10 border-b px-8 py-5 flex justify-between items-center transition-colors duration-500 backdrop-blur-md"
              style={{ backgroundColor: isDarkMode ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)', borderColor: previewStyles.border }}
            >
                 <div className="text-xl font-bold tracking-tight transition-all duration-500" style={{ color: isDarkMode ? '#FFFFFF' : currentTheme.primary, fontFamily: activeFonts.heading }}>
                    Pioneer
                 </div>
                 <div className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest" style={{ color: previewStyles.subtext }}>
                    <span>HVAC</span>
                    <span>Appliances</span>
                    <span>About</span>
                 </div>
                 <button 
                    className="px-5 py-2.5 rounded-xl text-[10px] font-bold text-white transition-all duration-500 shadow-lg" 
                    style={{ backgroundColor: accentColor, boxShadow: `0 10px 15px -3px ${accentColor}44` }}
                 >
                    BOOK ONLINE
                 </button>
            </nav>

            {/* Hero */}
            <header className="px-8 py-20 flex flex-col items-center text-center transition-all duration-500">
                 <div 
                    className="px-4 py-1 rounded-full border text-[9px] font-bold uppercase tracking-[0.2em] mb-8 transition-all duration-500" 
                    style={{ borderColor: accentColor + '44', color: accentColor, backgroundColor: accentColor + '08' }}
                 >
                    Elite Service in Orange County
                 </div>
                 <h1 className="text-4xl md:text-6xl font-bold mb-8 max-w-2xl leading-[1.1] transition-all duration-500" style={{ color: previewStyles.text, fontFamily: activeFonts.heading }}>
                    Reliable & Caring <br/><span style={{ color: currentTheme.primary }}>Home Service.</span>
                 </h1>
                 <p className="text-sm md:text-base mb-10 max-w-lg font-light leading-relaxed transition-colors duration-500" style={{ color: previewStyles.subtext }}>
                    Expert HVAC installation, repair and white-glove appliance services for luxury residential properties.
                 </p>
                 <div className="flex gap-4">
                    <button 
                        className="px-8 py-4 rounded-2xl font-bold text-xs text-white shadow-xl transition-all duration-500 active:scale-95" 
                        style={{ backgroundColor: currentTheme.primary }}
                    >
                        Schedule Service
                    </button>
                    <button 
                        className="px-8 py-4 rounded-2xl font-bold text-xs border transition-all duration-500"
                        style={{ backgroundColor: isDarkMode ? 'transparent' : '#FFFFFF', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E5E0', color: previewStyles.text }}
                    >
                        Our Process
                    </button>
                 </div>
            </header>

            {/* Content Section */}
            <section className="px-8 py-20 transition-colors duration-500" style={{ backgroundColor: isDarkMode ? '#151515' : '#FFFFFF' }}>
                <div className="grid grid-cols-2 gap-6">
                     {[1, 2].map((i) => (
                        <div 
                          key={i} 
                          className="group p-8 rounded-[2rem] border transition-all duration-500 hover:shadow-2xl hover:shadow-black/20"
                          style={{ 
                            backgroundColor: previewStyles.card, 
                            borderColor: previewStyles.border 
                          }}
                        >
                             <div 
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-md" 
                                style={{ backgroundColor: i === 1 ? currentTheme.primary : accentColor }}
                             >
                                 <div className="w-5 h-5 border-2 border-white/30 rounded-full"></div>
                             </div>
                             <h3 className="font-bold text-lg mb-2 transition-all duration-500" style={{ color: previewStyles.text, fontFamily: activeFonts.heading }}>
                                {i === 1 ? 'Emergency HVAC' : 'Appliance Repair'}
                             </h3>
                             <p className="text-xs leading-relaxed mb-6 transition-colors duration-500" style={{ color: previewStyles.subtext }}>
                                Same-day dispatch for all high-priority service requests in Irvine.
                             </p>
                             <div className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: i === 1 ? currentTheme.primary : accentColor }}>
                                Learn More <span>→</span>
                             </div>
                        </div>
                     ))}
                </div>
            </section>

             {/* Footer */}
             <footer className="px-8 py-16 text-center transition-colors duration-500" style={{ backgroundColor: isDarkMode ? '#0A0A0A' : '#111111' }}>
                <div className="font-bold text-2xl mb-2 text-white" style={{ fontFamily: activeFonts.heading }}>Pioneer</div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Premium Service Group</p>
             </footer>
        </div>

        {/* Concept Badge */}
        <div className="absolute top-24 right-8 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold rounded-full shadow-2xl pointer-events-none uppercase tracking-widest">
            {activeConcept} {isDarkMode ? 'Dark' : 'Light'}
        </div>
      </div>

    </div>
  );
};
