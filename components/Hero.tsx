
import React, { useState, useEffect } from 'react';
import { LABELS } from '../constants';
import { TimeLeft, UIConfig } from '../types';

interface HeroProps {
  targetDate: string;
  config: UIConfig;
}

const Hero: React.FC<HeroProps> = ({ targetDate, config }) => {
  const [now, setNow] = useState<number>(Date.now());
  const targetTimestamp = new Date(targetDate).getTime();
  
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!config.showCountdown) return null;

  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetTimestamp - now;
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference
    };
  };

  const timeLeft = calculateTimeLeft();
  const formattedTarget = new Date(targetDate).toLocaleString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <section className="relative w-full py-12 md:py-24 flex flex-col items-center justify-center overflow-hidden print:hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/[0.03] blur-[160px] rounded-full -z-10 animate-pulse"></div>
      
      <div className="text-center mb-16 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/5 rounded-full border border-emerald-500/10 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-emerald-500 font-black tracking-[0.3em] uppercase text-[10px] drop-shadow-sm">
            Live Countdown Engine
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          {config.examName} {config.examYear}
        </h1>
        
        <div className="flex items-center justify-center gap-3 text-slate-400 font-bengali text-lg bg-slate-900/40 backdrop-blur-md px-8 py-3 rounded-2xl border border-white/5 shadow-xl">
          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formattedTarget}
        </div>
      </div>

      <div className="w-full max-w-6xl px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          <TimeUnit value={timeLeft.days} label={LABELS.countdown.days} />
          <TimeUnit value={timeLeft.hours} label={LABELS.countdown.hours} />
          <TimeUnit value={timeLeft.minutes} label={LABELS.countdown.minutes} />
          <TimeUnit value={timeLeft.seconds} label={LABELS.countdown.seconds} isHighlight />
        </div>
      </div>
    </section>
  );
};

const TimeUnit: React.FC<{ value: number; label: string; isHighlight?: boolean }> = ({ value, label, isHighlight }) => {
  const displayValue = value.toString().padStart(2, '0');
  
  return (
    <div className={`glass-card group relative p-10 md:p-14 rounded-[2.5rem] md:rounded-[4rem] flex flex-col items-center justify-center border-white/[0.03] shadow-2xl overflow-hidden transition-all duration-500 hover:border-emerald-500/20 hover:bg-white/[0.05] ${isHighlight ? 'timer-glow' : ''}`}>
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none"></div>
      
      {/* Background Accent */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-3xl rounded-full transition-opacity duration-700 ${isHighlight ? 'bg-emerald-500/10 opacity-100' : 'bg-white/5 opacity-0 group-hover:opacity-100'}`}></div>

      <div className="relative z-10 overflow-hidden flex items-center justify-center">
        {/* We use key to trigger animation on value change */}
        <span 
          key={displayValue}
          className="animate-tick text-6xl md:text-8xl lg:text-9xl font-black text-white tabular-nums drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
        >
          {displayValue}
        </span>
      </div>
      
      <div className="relative z-10 mt-6 flex flex-col items-center">
        <span className="text-sm md:text-lg font-bengali text-slate-500 group-hover:text-emerald-400 font-black tracking-[0.2em] transition-colors duration-300">
          {label}
        </span>
        <div className="h-1 w-0 group-hover:w-full bg-emerald-500/40 mt-1 transition-all duration-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Hero;
