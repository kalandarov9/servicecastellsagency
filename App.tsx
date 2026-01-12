
import React, { useState, useEffect } from 'react';
import { Stage, ProjectData } from './types';
import { DEFAULT_PROJECT, generateProjectData } from './services/geminiService';
import { SitemapView } from './components/SitemapView';
import { WireframeView } from './components/WireframeView';
import { StyleGuideView } from './components/StyleGuideView';
import { ProgressView } from './components/ProgressView';
import { LoginView } from './components/LoginView';
import { 
  Layout, 
  PenTool, 
  Palette, 
  ArrowLeft, 
  Sparkles, 
  BarChart3,
  Bot,
  ExternalLink
} from 'lucide-react';

const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('is_auth') === 'true';
  });
  const [loginError, setLoginError] = useState<string | undefined>();

  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const [projectData, setProjectData] = useState<ProjectData>(DEFAULT_PROJECT);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleLogin = (user: string, pass: string) => {
    // Updated credentials as requested
    if (user === 'aleksinbiz@gmail.com' && pass === 'xD41qT') {
      setIsAuthenticated(true);
      sessionStorage.setItem('is_auth', 'true');
      setLoginError(undefined);
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('is_auth');
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const generated = await generateProjectData(prompt);
      setProjectData(prev => ({
        ...prev,
        ...generated,
        wireframes: generated.wireframes || prev.wireframes, 
        description: prompt
      }));
      setIsAiModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("Something went wrong generating the content.");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case Stage.SITEMAP:
        return <SitemapView data={projectData.sitemap} />;
      case Stage.WIREFRAME:
        return <WireframeView sections={[]} pages={projectData.wireframes} />;
      case Stage.STYLE_GUIDE:
        return <StyleGuideView designSystem={projectData.designSystem} />;
      case Stage.PROGRESS:
        return <ProgressView />;
      default:
        return null;
    }
  };

  const NavItem = ({ stage, icon: Icon, label }: { stage: Stage; icon: any; label: string }) => (
    <button
      onClick={() => setCurrentStage(stage)}
      className={`
        flex items-center gap-2 px-5 py-2 rounded-lg transition-all duration-300 text-sm tracking-wide font-medium
        ${currentStage === stage 
          ? 'bg-[#111111] text-white shadow-md' 
          : 'bg-transparent text-gray-500 hover:bg-white hover:text-[#111111]'}
      `}
    >
      <Icon size={16} />
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="min-h-screen bg-[#F3F3F1] text-[#111111] font-sans selection:bg-[#E5E5E0]">
      
      {/* Top Navigation Bar */}
      {currentStage && (
        <nav className="sticky top-0 z-50 bg-[#F3F3F1]/90 backdrop-blur-md border-b border-[#E5E5E0] px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Left: Back & Title */}
            <div className="flex items-center gap-4 shrink-0">
              <button 
                onClick={() => setCurrentStage(null)}
                className="p-2 hover:bg-white rounded-xl transition-colors text-[#111111] border border-transparent hover:border-[#E5E5E0]"
                title="Back to Dashboard"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-[#111111] font-serif tracking-tight">{projectData.name}</h1>
              </div>
            </div>
            
            {/* Center: Tabs */}
            <div className="flex bg-[#E5E5E0] p-1 rounded-xl overflow-x-auto">
               <NavItem stage={Stage.SITEMAP} icon={Layout} label="Plan" />
               <NavItem stage={Stage.WIREFRAME} icon={PenTool} label="Structure" />
               <NavItem stage={Stage.STYLE_GUIDE} icon={Palette} label="Design" />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0">
               <button 
                onClick={handleLogout}
                className="px-3 py-1.5 text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
               >
                 Logout
               </button>
               <div className="w-2 md:w-8"></div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className={`transition-opacity duration-300 ease-in-out ${currentStage ? 'p-4 md:p-8' : 'p-4'}`}>
        
        {currentStage ? (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            {renderStageContent()}
          </div>
        ) : (
          /* Dashboard View (Landing) */
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[85vh] py-12 relative">
            
            {/* Minimal Logout for Dashboard */}
            <button 
              onClick={handleLogout}
              className="absolute top-0 right-4 px-3 py-1 text-[10px] font-bold text-gray-300 hover:text-red-500 transition-colors uppercase tracking-widest"
            >
              Logout
            </button>

            <div className="text-center mb-16 space-y-4 max-w-3xl px-4">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-[#E5E5E0] mb-4 shadow-sm">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#111111]"></div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Client Portal</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-[#111111] font-serif leading-tight">
                {projectData.name}
              </h1>
              <p className="text-lg text-gray-500 max-w-xl mx-auto font-light">
                Digital strategy, visual identity, and technical roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
              
              {/* Card 1: Sitemap */}
              <div 
                onClick={() => setCurrentStage(Stage.SITEMAP)}
                className="group cursor-pointer bg-white p-8 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#E5E5E0] rounded-2xl flex flex-col h-64 justify-between shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-[#F3F3F1] text-[#111111] rounded-xl group-hover:bg-[#111111] group-hover:text-white transition-colors">
                        <Layout size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">01</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-[#111111] font-serif mb-2">Sitemaps</h2>
                    <p className="text-gray-500 text-sm">Visualize hierarchy and content flow.</p>
                </div>
              </div>

               {/* Card 2: Wireframes */}
               <div 
                 onClick={() => setCurrentStage(Stage.WIREFRAME)}
                 className="group cursor-pointer bg-white p-8 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#E5E5E0] rounded-2xl flex flex-col h-64 justify-between shadow-sm hover:shadow-md"
               >
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-[#F3F3F1] text-[#111111] rounded-xl group-hover:bg-[#111111] group-hover:text-white transition-colors">
                        <PenTool size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">02</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-[#111111] font-serif mb-2">Wireframes</h2>
                    <p className="text-gray-500 text-sm">Review layout skeletons & strategy.</p>
                </div>
              </div>

               {/* Card 3: Style Guide */}
               <div 
                 onClick={() => setCurrentStage(Stage.STYLE_GUIDE)}
                 className="group cursor-pointer bg-white p-8 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#E5E5E0] rounded-2xl flex flex-col h-64 justify-between shadow-sm hover:shadow-md"
               >
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-[#F3F3F1] text-[#111111] rounded-xl group-hover:bg-[#111111] group-hover:text-white transition-colors">
                        <Palette size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">03</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-[#111111] font-serif mb-2">Design System</h2>
                    <p className="text-gray-500 text-sm">Colors, typography & components.</p>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* AI Modal (Available for dev but hidden trigger) */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-[#F3F3F1]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white p-8 max-w-lg w-full shadow-2xl scale-100 transform transition-all border border-[#E5E5E0] rounded-2xl">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-[#111111] font-serif">
                        Project Generator
                    </h3>
                    <button onClick={() => setIsAiModalOpen(false)} className="text-gray-400 hover:text-[#111111] transition-colors">
                        ✕
                    </button>
                </div>
                <textarea 
                    className="w-full p-4 bg-[#F3F3F1] border-none focus:ring-1 focus:ring-[#111111] outline-none transition-all resize-none h-40 text-[#111111] placeholder-gray-400 font-sans mb-6 rounded-xl"
                    placeholder="Describe the client business..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="flex justify-between items-center">
                    <button 
                        onClick={() => setIsAiModalOpen(false)}
                        className="text-gray-500 hover:text-[#111111] text-sm font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="px-8 py-3 bg-[#111111] text-white font-medium hover:bg-black transition-all active:scale-95 disabled:opacity-50 text-sm tracking-wide rounded-xl"
                    >
                        {isGenerating ? 'Processing...' : 'Generate'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
