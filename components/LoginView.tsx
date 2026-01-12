
import React, { useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: string, pass: string) => void;
  error?: string;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-[#F3F3F1] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
        
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white border border-[#E5E5E0] rounded-2xl shadow-sm mb-6">
            <Lock className="text-[#111111]" size={28} />
          </div>
          <h1 className="text-3xl font-bold font-serif text-[#111111] mb-2">Client Portal</h1>
          <p className="text-sm text-gray-400 uppercase tracking-[0.2em]">Secure Access Required</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-3xl border border-[#E5E5E0] shadow-xl shadow-[#111111]/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#F3F3F1] border-none focus:ring-1 focus:ring-[#111111] outline-none p-4 rounded-xl text-[#111111] transition-all"
                placeholder="Enter login"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F3F3F1] border-none focus:ring-1 focus:ring-[#111111] outline-none p-4 rounded-xl text-[#111111] transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-medium text-center bg-red-50 py-2 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1">
                {error}
              </p>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-[#111111] text-white font-bold rounded-xl hover:bg-black transition-all active:scale-[0.98] shadow-lg shadow-[#111111]/10 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={18} />
              Login to Project
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-gray-400 text-[10px] uppercase tracking-widest">
          Castells Studio • Private Environment
        </p>
      </div>
    </div>
  );
};
