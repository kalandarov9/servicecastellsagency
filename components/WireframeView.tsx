
import React, { useState, useRef } from 'react';
import { WireframePage, WireframeSection } from '../types';
import { ZoomIn, ZoomOut, GripHorizontal, Layout, Type, Image as ImageIcon, Menu, Star } from 'lucide-react';

interface WireframeViewProps {
  sections: any; 
  pages?: WireframePage[];
}

const SectionSkeleton: React.FC<{ section: WireframeSection }> = ({ section }) => {
  const content = section.content;
  const contentLC = section.content.toLowerCase();
  const details = section.details || '';
  const detailsLC = details.toLowerCase();

  // Helper for Section Label
  const Label = () => (
    <span className="absolute top-2 left-2 text-[8px] font-bold text-gray-300 uppercase tracking-widest pointer-events-none select-none">
      {section.type}
    </span>
  );

  // 1. NAVBAR
  if (section.type === 'navbar') {
    return (
      <div className="h-12 border-b border-[#E5E5E0] flex items-center justify-between px-4 bg-white rounded-t-xl mb-2 relative">
        <span className="font-serif font-bold text-sm text-[#111111] tracking-tight">Pioneer</span>
        <div className="flex items-center gap-3">
           <div className="hidden sm:flex gap-3 text-[9px] font-medium text-gray-500 uppercase tracking-wide">
               <span>Services</span>
               <span>About</span>
               <span>Contact</span>
           </div>
           <div className="px-3 py-1.5 bg-[#111111] text-white text-[9px] font-bold rounded-lg shadow-sm">
               Book Now
           </div>
        </div>
      </div>
    );
  }

  // 2. HERO
  if (section.type === 'hero') {
    return (
      <div className="bg-[#F3F3F1] p-6 mb-2 flex flex-col items-center text-center gap-3 rounded-xl border border-[#E5E5E0] relative group">
         <Label />
         <div className="mt-2 space-y-2 w-full flex flex-col items-center">
            <h1 className="font-serif text-xl font-bold text-[#111111] leading-tight max-w-[260px]">
                {content}
            </h1>
            <p className="text-[10px] text-gray-500 max-w-[200px] leading-relaxed font-sans">
                {details || "Expert HVAC installation, repair & appliance services. Honest. Fast. Professional."}
            </p>
         </div>
         <div className="flex gap-2 mt-2">
            <div className="px-4 py-2 bg-[#111111] text-white text-[10px] font-bold rounded-lg shadow-md">Get Started</div>
            <div className="px-4 py-2 bg-white border border-[#E5E5E0] text-[#111111] text-[10px] font-bold rounded-lg">Call Now</div>
         </div>
         <div className="w-full h-32 bg-white border border-dashed border-gray-300 rounded-xl mt-3 flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
                <ImageIcon className="text-gray-300 mx-auto mb-1" size={20} />
                <span className="text-[9px] text-gray-400 font-medium">Hero Image (Technician)</span>
            </div>
            <div className="absolute inset-0 bg-gray-50 opacity-50 diagonal-stripes"></div>
         </div>
      </div>
    );
  }

  // 3. PRICING / PLANS
  if (contentLC.includes('plan') || contentLC.includes('pricing') || detailsLC.includes('pricing')) {
    return (
      <div className="mb-2 p-4 bg-white border border-[#E5E5E0] rounded-xl relative">
        <Label />
        <h3 className="font-serif text-sm font-bold text-[#111111] text-center mb-1 mt-1">{content}</h3>
        <p className="text-[9px] text-gray-400 text-center mb-4">Choose the plan that fits your needs</p>
        
        <div className="grid grid-cols-3 gap-2">
            {['Silver', 'Gold', 'Platinum'].map((tier, i) => (
                <div key={i} className={`border ${i===1 ? 'border-[#111111] bg-[#111111] text-white ring-2 ring-[#111111]/10' : 'border-[#E5E5E0] bg-white text-[#111111]'} p-2 rounded-lg flex flex-col gap-1 items-center shadow-sm`}>
                    <span className="text-[8px] font-bold uppercase tracking-wider opacity-70">{tier}</span>
                    <span className="text-xs font-serif font-bold">${149 + (i*100)}</span>
                    <div className={`w-full h-px my-1 ${i===1 ? 'bg-white/20' : 'bg-gray-100'}`}></div>
                    <div className="space-y-1 w-full">
                        <div className={`w-full h-1 rounded-full ${i===1 ? 'bg-white/30' : 'bg-gray-100'}`}></div>
                        <div className={`w-2/3 h-1 rounded-full ${i===1 ? 'bg-white/30' : 'bg-gray-100'}`}></div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

  // 4. TESTIMONIALS
  if (contentLC.includes('testimonial') || contentLC.includes('review') || detailsLC.includes('customer')) {
    return (
      <div className="mb-2 p-4 bg-[#FAFAFA] border border-[#E5E5E0] rounded-xl relative">
         <Label />
         <h3 className="font-serif text-sm font-bold text-[#111111] text-center mb-4 mt-1">{content}</h3>
         <div className="grid grid-cols-1 gap-2">
            {[1, 2].map(i => (
                <div key={i} className="bg-white p-3 border border-[#E5E5E0] rounded-lg flex gap-3 shadow-sm">
                    <div className="w-8 h-8 bg-gray-100 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-gray-400">
                        User
                    </div>
                    <div className="space-y-1 w-full">
                        <div className="flex gap-0.5 mb-1 text-orange-400">
                            {[1,2,3,4,5].map(s => <Star key={s} size={6} fill="currentColor" />)}
                        </div>
                        <p className="text-[8px] text-gray-500 leading-tight">"Outstanding service! Fixed my AC during a heatwave in just 2 hours."</p>
                    </div>
                </div>
            ))}
         </div>
      </div>
    );
  }

  // 5. GRID / SERVICES
  if (detailsLC.includes('grid') || contentLC.includes('services') || contentLC.includes('repair')) {
    return (
      <div className="mb-2 p-4 bg-white border border-[#E5E5E0] rounded-xl relative">
        <Label />
        <h3 className="font-serif text-sm font-bold text-[#111111] mb-3 mt-1 text-center">{content}</h3>
        <div className="grid grid-cols-2 gap-2">
            {['Repair', 'Install', 'Maintenance', 'Commercial'].map((item, i) => (
                <div key={i} className="bg-[#F8FAFC] border border-[#E5E5E0] p-3 flex flex-col items-center gap-2 rounded-lg hover:border-gray-300 transition-colors">
                    <div className="w-6 h-6 bg-white border border-[#E5E5E0] rounded-md flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#111111] rounded-sm opacity-10"></div>
                    </div>
                    <span className="text-[9px] font-bold text-[#111111]">{item}</span>
                </div>
            ))}
        </div>
      </div>
    );
  }

  // 6. CONTENT / TEXT WITH IMAGE
  if (section.type === 'content' || contentLC.includes('story') || contentLC.includes('about')) {
    return (
        <div className="mb-2 p-4 bg-white border border-[#E5E5E0] rounded-xl flex gap-3 items-center relative">
            <Label />
            <div className="flex-1 space-y-2 mt-2">
                <h3 className="font-serif text-xs font-bold text-[#111111]">{content}</h3>
                <p className="text-[9px] text-gray-500 leading-relaxed line-clamp-3">
                    {details || "Since 2005, we've been the trusted name in HVAC and appliance services across Los Angeles. We start with honesty."}
                </p>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-lg border border-[#E5E5E0] flex items-center justify-center mt-2">
                <ImageIcon size={16} className="text-gray-300" />
            </div>
        </div>
    );
  }

  // 7. FORM
  if (section.type === 'form' || detailsLC.includes('form') || contentLC.includes('contact')) {
      return (
        <div className="bg-[#111111] p-4 mb-2 rounded-xl text-white relative">
            <div className="absolute top-2 left-2 text-[8px] font-bold text-white/30 uppercase tracking-widest pointer-events-none">Form</div>
            <h3 className="font-serif text-sm font-bold text-white text-center mb-4 mt-1">{content}</h3>
            <div className="space-y-2 bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="flex gap-2">
                    <div className="w-full h-7 bg-white/10 rounded-md border border-white/10 px-2 flex items-center text-[9px] text-white/30">Name</div>
                    <div className="w-full h-7 bg-white/10 rounded-md border border-white/10 px-2 flex items-center text-[9px] text-white/30">Phone</div>
                </div>
                <div className="w-full h-7 bg-white/10 rounded-md border border-white/10 px-2 flex items-center text-[9px] text-white/30">Email</div>
                <div className="w-full h-12 bg-white/10 rounded-md border border-white/10 p-2 text-[9px] text-white/30">Message...</div>
                <div className="w-full h-8 bg-white text-[#111111] font-bold text-[10px] rounded-md mt-2 flex items-center justify-center shadow-lg">Submit Request</div>
            </div>
        </div>
      );
  }

  // 8. FOOTER
  if (section.type === 'footer') {
        return (
            <div className="bg-[#111111] h-auto mt-auto p-4 flex gap-4 rounded-b-xl items-start relative">
                <div className="font-serif font-bold text-xs text-white mt-1">Pioneer</div>
                <div className="flex-1 grid grid-cols-3 gap-2 text-[8px] text-gray-400">
                    <div className="space-y-1">
                        <span className="font-bold text-white block mb-1">Company</span>
                        <div>About</div>
                        <div>Careers</div>
                    </div>
                    <div className="space-y-1">
                        <span className="font-bold text-white block mb-1">Services</span>
                        <div>HVAC</div>
                        <div>Plumbing</div>
                    </div>
                    <div className="space-y-1">
                        <span className="font-bold text-white block mb-1">Legal</span>
                        <div>Privacy</div>
                        <div>Terms</div>
                    </div>
                </div>
            </div>
        );
  }

  // DEFAULT FALLBACK
  return (
    <div className="mb-2 p-3 bg-white border border-[#E5E5E0] flex flex-col gap-2 rounded-xl relative">
        <Label />
        <h3 className="font-serif text-xs font-bold text-[#111111] mt-2">{content}</h3>
        <p className="text-[9px] text-gray-400">{details}</p>
        <div className="w-full h-1 bg-gray-100 rounded-full mt-1"></div>
    </div>
  );
};

export const WireframeView: React.FC<WireframeViewProps> = ({ sections, pages }) => {
  const wireframePages: WireframePage[] = pages || (Array.isArray(sections) && sections[0]?.sections ? sections : [{ id: 'home', title: 'Homepage', sections: sections }]);

  const [scale, setScale] = useState(0.8);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
        const delta = -e.deltaY * 0.001;
        const newScale = Math.min(Math.max(0.2, scale + delta), 2);
        setScale(newScale);
    } else {
        setPosition(p => ({ ...p, x: p.x - e.deltaX, y: p.y - e.deltaY }));
    }
  };

  const resetView = () => {
    setPosition({ x: 50, y: 50 });
    setScale(0.8);
  };

  return (
    <div className="w-full h-[calc(100vh-140px)] bg-[#F3F3F1] relative overflow-hidden border border-[#E5E5E0] select-none rounded-3xl shadow-inner font-sans">
       {/* Dot Background */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.2]" 
            style={{ 
                backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)', 
                backgroundSize: '24px 24px' 
            }}>
       </div>

       {/* Controls */}
       <div className="absolute bottom-6 left-6 z-50 flex gap-2 bg-white/90 backdrop-blur shadow-sm p-2 border border-[#E5E5E0] rounded-xl">
          <button onClick={() => setScale(s => Math.min(s + 0.1, 2))} className="p-2 hover:bg-[#F3F3F1] text-[#111111] transition-colors rounded-lg"><ZoomIn size={18} /></button>
          <div className="w-px bg-[#E5E5E0] my-1"></div>
          <button onClick={() => setScale(s => Math.max(s - 0.1, 0.3))} className="p-2 hover:bg-[#F3F3F1] text-[#111111] transition-colors rounded-lg"><ZoomOut size={18} /></button>
          <div className="w-px bg-[#E5E5E0] my-1"></div>
          <button onClick={resetView} className="p-2 hover:bg-[#F3F3F1] text-[#111111] transition-colors text-xs font-serif uppercase tracking-widest rounded-lg">Reset</button>
       </div>
       
       <div className="absolute top-6 left-6 z-50 bg-white/80 backdrop-blur px-3 py-1.5 text-xs font-medium text-gray-400 border border-[#E5E5E0] flex items-center gap-2 pointer-events-none uppercase tracking-widest rounded-lg">
          <GripHorizontal size={14} /> Board View
       </div>

       <div 
         ref={containerRef}
         className={`w-full h-full cursor-grab active:cursor-grabbing ${isDragging ? 'cursor-grabbing' : ''}`}
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseUp}
         onWheel={handleWheel}
       >
         <div 
            className="absolute origin-top-left transition-transform duration-75 ease-out"
            style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
         >
            <div className="flex gap-20 px-20 py-20">
                {wireframePages.map((page, index) => (
                    <div key={page.id} className="flex flex-col gap-6">
                        <div className="flex items-center gap-3 border-b border-[#111111] pb-2 w-fit">
                            <span className="text-xs font-bold text-[#111111]">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="font-serif text-lg text-[#111111]">{page.title}</span>
                        </div>

                        <div 
                            className="w-[375px] bg-white shadow-xl shadow-[#111111]/5 border border-[#E5E5E0] flex flex-col group hover:shadow-2xl hover:shadow-[#111111]/10 transition-all rounded-3xl overflow-hidden"
                            style={{ minHeight: '667px' }}
                        >
                            {/* Browser Bar */}
                            <div className="h-8 border-b border-[#E5E5E0] flex items-center gap-2 px-4 bg-[#FAFAFA]">
                                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-4 space-y-4 relative bg-white">
                                {page.sections.map((section, sIdx) => (
                                    <div key={sIdx} className="group/section relative">
                                        <SectionSkeleton section={section} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         </div>
       </div>
    </div>
  );
};
