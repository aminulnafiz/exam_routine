
import React from 'react';
import { LABELS } from '../constants';

const BrandCard: React.FC = () => {
  return (
    <section className="py-20 px-4 w-full max-w-4xl mx-auto">
      <a 
        href={LABELS.brand.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-emerald-500/20"
      >
        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-0 right-0 p-8">
           <svg className="w-8 h-8 text-slate-600 group-hover:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
           </svg>
        </div>
        
        <div className="p-10 md:p-16 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <span className="text-white text-3xl font-black italic">A</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            {LABELS.brand.title}
          </h2>
          <p className="text-slate-400 text-lg max-w-lg">
            {LABELS.brand.tagline}
          </p>
          <div className="mt-10 inline-flex items-center px-8 py-3 bg-white text-slate-950 font-bold rounded-full transition-transform hover:scale-105 active:scale-95">
            Visit Website
          </div>
        </div>
      </a>
    </section>
  );
};

export default BrandCard;
