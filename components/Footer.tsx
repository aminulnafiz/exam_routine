
import React from 'react';
import { UIConfig } from '../types';

interface FooterProps {
  onAdminClick: () => void;
  config: UIConfig;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, config }) => {
  return (
    <footer className="w-full py-16 px-4 border-t border-white/5 bg-slate-950/80 print:hidden mt-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-lg font-black text-white italic shadow-lg shadow-emerald-500/20">A</div>
           <span className="text-white font-black tracking-tight text-xl uppercase">{config.appTitle}</span>
        </div>
        
        <div className="space-y-3 mb-12">
          <p className="text-slate-400 font-medium text-base">
            Powered by <span className="text-emerald-500 font-bold">ARNS STUDY ZONE</span>
          </p>
          <p className="text-slate-600 text-sm font-medium">
            © {new Date().getFullYear()} All Rights Reserved. Providing quality education for Dakhil students.
          </p>
        </div>
        
        {config.showAdminIcon && (
          <button 
            onClick={onAdminClick}
            className="group flex items-center gap-3 px-8 py-3 rounded-full bg-slate-900 border border-white/5 text-slate-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-all duration-300 shadow-xl"
          >
            <div className="p-1.5 bg-slate-800 rounded-lg group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">System Administration</span>
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
