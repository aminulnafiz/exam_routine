
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import RoutineTable from './components/RoutineTable';
import ProgressTracker from './components/ProgressTracker';
import BrandCard from './components/BrandCard';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import NotificationSystem from './components/NotificationSystem';
import { DEFAULT_EXAM_ROUTINE, DEFAULT_TARGET_DATE_BST, STORAGE_KEYS, DEFAULT_UI_CONFIG } from './constants';
import { ExamEntry, UIConfig } from './types';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [routine, setRoutine] = useState<ExamEntry[]>(DEFAULT_EXAM_ROUTINE);
  const [targetDate, setTargetDate] = useState(DEFAULT_TARGET_DATE_BST);
  const [uiConfig, setUiConfig] = useState<UIConfig>(DEFAULT_UI_CONFIG);

  // Sync with Supabase on load - strictly manual triggers only
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch routine from Supabase
        const { data: routineData, error: routineError } = await supabase
          .from('routine')
          .select('*')
          .order('id', { ascending: true });
        
        if (routineData && routineData.length > 0) {
          // Map DB snake_case to frontend camelCase if necessary
          const mappedRoutine = routineData.map((item: any) => ({
            id: item.id,
            date: item.date,
            day: item.day,
            subject: item.subject,
            subjectCode: item.subject_code || item.subjectCode,
            time: item.time,
            timestamp: item.timestamp
          }));
          setRoutine(mappedRoutine);
        }

        // Fetch configs
        const { data: configData, error: configError } = await supabase
          .from('configs')
          .select('*');

        if (configData) {
          const target = configData.find((c: any) => c.key === 'targetDate');
          const ui = configData.find((c: any) => c.key === 'uiConfig');
          if (target) setTargetDate(typeof target.value === 'string' ? target.value : JSON.stringify(target.value));
          if (ui) setUiConfig(ui.value);
        }
      } catch (err) {
        console.error("Error fetching from Supabase:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateSettings = async (data: { routine?: ExamEntry[], targetDate?: string, config?: UIConfig }) => {
    // Optimistic Update
    if (data.routine) setRoutine(data.routine);
    if (data.targetDate) setTargetDate(data.targetDate);
    if (data.config) setUiConfig(data.config);

    // Persist to Supabase
    try {
      if (data.routine) {
        // Prepare data for DB (mapping camelCase to snake_case)
        const dbRoutine = data.routine.map(item => ({
          id: item.id,
          date: item.date,
          day: item.day,
          subject: item.subject,
          subject_code: item.subjectCode,
          time: item.time,
          timestamp: item.timestamp
        }));
        
        // Use a simple delete-all and re-insert for routine consistency
        await supabase.from('routine').delete().neq('id', 'temp_id_non_existent');
        await supabase.from('routine').insert(dbRoutine);
      }
      
      if (data.targetDate) {
        await supabase.from('configs').upsert({ key: 'targetDate', value: data.targetDate });
      }

      if (data.config) {
        await supabase.from('configs').upsert({ key: 'uiConfig', value: data.config });
      }
      
      localStorage.setItem(STORAGE_KEYS.ROUTINE, JSON.stringify(data.routine || routine));
      localStorage.setItem(STORAGE_KEYS.TARGET_DATE, data.targetDate || targetDate);
      localStorage.setItem(STORAGE_KEYS.UI_CONFIG, JSON.stringify(data.config || uiConfig));

    } catch (err) {
      console.error("Failed to sync with Supabase:", err);
    }
  };

  // Only triggered by Footer click
  const openAdminPortal = () => {
    setIsAdminMode(true);
  };

  if (isLoggedIn && isAdminMode) {
    return (
      <AdminPanel 
        routine={routine} 
        targetDate={targetDate}
        config={uiConfig}
        onUpdate={handleUpdateSettings}
        onLogout={() => { setIsLoggedIn(false); setIsAdminMode(false); }}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-emerald-500/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-emerald-500 font-black tracking-[0.3em] text-xs uppercase animate-pulse">Syncing Engine</p>
            <p className="text-slate-600 text-[10px] mt-2 font-medium">ARNS STUDY ZONE • DAKHIL 2026</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen selection:bg-emerald-500/30 selection:text-emerald-400">
      <NotificationSystem routine={routine} config={uiConfig} />
      
      <header className="sticky top-0 z-50 w-full glass-card border-b border-white/5 print:hidden">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-xs font-black text-white italic shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">A</div>
            <div className="flex flex-col">
              <span className="text-white font-black text-sm tracking-tight leading-none uppercase">{uiConfig.appTitle}</span>
              <span className="text-slate-500 text-[9px] font-bold tracking-[0.2em] mt-1">{uiConfig.appSubtitle}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {uiConfig.telegramEnabled && (
              <a 
                href="https://t.me/arns_study_zone" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-all shadow-lg shadow-emerald-500/5"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                <span className="hidden sm:inline">Telegram</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="space-y-4">
        <Hero targetDate={targetDate} config={uiConfig} />
        <RoutineTable routine={routine} config={uiConfig} />
        <ProgressTracker routine={routine} config={uiConfig} />
        <BrandCard />
      </div>

      <Footer onAdminClick={openAdminPortal} config={uiConfig} />

      {isAdminMode && !isLoggedIn && (
        <AdminLogin 
          onLogin={() => setIsLoggedIn(true)} 
          onClose={() => setIsAdminMode(false)} 
        />
      )}

      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden print:hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#020617]"></div>
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-emerald-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-indigo-500/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
      </div>
    </main>
  );
};

export default App;
