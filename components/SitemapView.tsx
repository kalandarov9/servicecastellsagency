import React, { useState, useRef, useEffect } from 'react';
import { SitemapNode } from '../types';
import { ZoomIn, ZoomOut, GripHorizontal, FileText, Layout, MoreHorizontal } from 'lucide-react';

interface SitemapViewProps {
  data: SitemapNode;
}

const TreeNode: React.FC<{ node: SitemapNode; isRoot?: boolean }> = ({ node, isRoot = false }) => {
  const hasChildren = node.children && node.children.length > 0;
  const Icon = isRoot ? Layout : FileText;

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div 
        onMouseDown={(e) => e.stopPropagation()} 
        className={`
          relative z-10 flex flex-col 
          group transition-all duration-200
          ${isRoot ? 'mb-12' : ''}
        `}
      >
        <div className={`
            w-64 bg-white p-4 border border-[#E5E5E0] shadow-sm rounded-2xl
            hover:shadow-md hover:border-gray-300 transition-all
            ${isRoot ? 'border-[#111111] shadow-md' : ''}
        `}>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isRoot ? 'bg-[#111111] text-white' : 'bg-[#F3F3F1] text-[#111111]'}`}>
                        <Icon size={14} strokeWidth={2} />
                    </div>
                    <span className={`text-sm text-[#111111] truncate max-w-[140px] ${isRoot ? 'font-serif font-bold text-lg' : 'font-medium font-sans'}`}>
                        {node.label}
                    </span>
                </div>
                <button className="text-gray-300 hover:text-[#111111] transition-colors">
                    <MoreHorizontal size={16} />
                </button>
            </div>

            {/* List Items */}
            <div className="space-y-2">
                {!isRoot && hasChildren ? (
                    node.children!.map(child => (
                        <div key={child.id} className="flex items-center gap-3 py-1 px-2 border-l-2 border-transparent hover:border-[#111111] transition-all cursor-default group/item">
                            <span className="text-xs text-gray-500 group-hover/item:text-[#111111] font-sans">{child.label}</span>
                        </div>
                    ))
                ) : null}

                {/* Root Placeholder */}
                {isRoot && (
                    <div className="space-y-2">
                         <div className="h-1 w-full bg-[#F3F3F1] rounded-full"></div>
                         <div className="h-1 w-2/3 bg-[#F3F3F1] rounded-full"></div>
                         <div className="mt-4 flex gap-2">
                            <span className="px-2 py-0.5 border border-[#111111] text-[#111111] text-[10px] font-bold uppercase rounded-md">Index</span>
                         </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Connectors */}
      {isRoot && hasChildren && (
        <div className="flex flex-col items-center">
          <div className="w-px h-12 bg-[#E5E5E0]"></div>
          <div className="flex items-start">
             {node.children!.map((child, index) => {
                const isFirst = index === 0;
                const isLast = index === node.children!.length - 1;
                const isOnly = node.children!.length === 1;

                return (
                  <div key={child.id} className="flex flex-col items-center relative px-6">
                     {!isOnly && (
                        <>
                           <div className={`absolute top-0 right-1/2 h-px bg-[#E5E5E0] ${isFirst ? 'hidden' : 'w-1/2'}`}></div>
                           <div className={`absolute top-0 left-1/2 h-px bg-[#E5E5E0] ${isLast ? 'hidden' : 'w-1/2'}`}></div>
                        </>
                     )}
                     <div className="w-px h-8 bg-[#E5E5E0]"></div>
                     <TreeNode node={child} />
                  </div>
                );
             })}
          </div>
        </div>
      )}
    </div>
  );
};

export const SitemapView: React.FC<SitemapViewProps> = ({ data }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setPosition(p => ({ ...p, x: width / 2 }));
    }
  }, []);

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
    const delta = -e.deltaY * 0.001;
    const newScale = Math.min(Math.max(0.2, scale + delta), 2);
    setScale(newScale);
  };

  const resetView = () => {
    if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setPosition({ x: width / 2, y: 100 });
        setScale(1);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-140px)] bg-[#F3F3F1] relative overflow-hidden border border-[#E5E5E0] select-none rounded-3xl shadow-inner">
       {/* Background Grid */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.2]" 
            style={{ 
                backgroundImage: 'linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
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
          <GripHorizontal size={14} /> Interactive Canvas
       </div>

       {/* Canvas */}
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
            className="absolute origin-top transition-transform duration-100 ease-out will-change-transform"
            style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) translateX(-50%)`,
            }}
         >
            <div className="flex flex-col items-center pb-40">
                 <TreeNode node={data} isRoot={true} />
            </div>
         </div>
       </div>
    </div>
  );
};