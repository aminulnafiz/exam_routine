
import React, { useState, useEffect } from 'react';
import { LABELS, STORAGE_KEYS } from '../constants';
import { ExamEntry, UIConfig } from '../types';

interface RoutineTableProps {
  routine: ExamEntry[];
  config: UIConfig;
}

interface Reminder {
  examId: string;
  type: '1day' | '1hour';
  notified: boolean;
}

const OFFICIAL_ROUTINE_URL = "https://drive.google.com/file/d/1567eFEjRMycohdECQkcr_DIHDjRbqQYP/view?usp=sharing";

const RoutineTable: React.FC<RoutineTableProps> = ({ routine, config }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  if (!config.showRoutine) return null;

  const toggleReminder = (examId: string, type: '1day' | '1hour') => {
    let newReminders = [...reminders];
    const index = newReminders.findIndex(r => r.examId === examId && r.type === type);

    if (index > -1) {
      newReminders.splice(index, 1);
    } else {
      newReminders.push({ examId, type, notified: false });
    }

    setReminders(newReminders);
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(newReminders));
    setActiveMenu(null);
  };

  const isReminded = (examId: string, type: '1day' | '1hour') => {
    return reminders.some(r => r.examId === examId && r.type === type);
  };

  const handleExternalRedirect = () => {
    window.open(OFFICIAL_ROUTINE_URL, '_blank');
  };

  return (
    <section className="py-8 md:py-20 px-4 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10 print:mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20"></div>
          <h2 className="text-2xl md:text-4xl font-black font-bengali text-white">
            {LABELS.routine.title}
          </h2>
        </div>
        
        <div className="flex items-center gap-2 print:hidden">
          {config.showPrint && (
            <button 
              onClick={handleExternalRedirect}
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center gap-2 group"
              title="Print Official Routine"
            >
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">Print</span>
            </button>
          )}
          {config.showDownload && (
            <button 
              onClick={handleExternalRedirect}
              className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-2 group"
              title="Download Official Routine"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">Download</span>
            </button>
          )}
        </div>
      </div>

      {/* PC VIEW: TABLE */}
      <div className="hidden md:block glass-card rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/40">
                {LABELS.routine.columns.map((col, idx) => (
                  <th key={idx} className="p-6 text-sm font-bold font-bengali text-slate-400 uppercase tracking-widest border-b border-white/5">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {routine.map((exam) => (
                <tr key={exam.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 font-bengali text-slate-200">{exam.date}</td>
                  <td className="p-6 font-bengali text-slate-400">{exam.day}</td>
                  <td className="p-6 font-bengali text-emerald-400 font-bold text-lg">{exam.subject}</td>
                  <td className="p-6 font-bengali text-slate-500 tabular-nums">{exam.subjectCode}</td>
                  <td className="p-6 font-bengali text-slate-200">{exam.time}</td>
                  <td className="p-6 relative">
                    {config.showReminders && (
                       <ReminderToggle 
                         examId={exam.id} 
                         active={isReminded(exam.id, '1day') || isReminded(exam.id, '1hour')}
                         isReminded={isReminded}
                         onToggle={toggleReminder}
                       />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE VIEW: CARDS */}
      <div className="md:hidden space-y-4">
        {routine.map((exam) => (
          <div key={exam.id} className="glass-card p-5 rounded-2xl border-white/5 space-y-3 relative overflow-hidden">
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-bengali">{exam.date} • {exam.day}</p>
                 <h3 className="text-lg font-black text-emerald-400 font-bengali">{exam.subject}</h3>
               </div>
               {config.showReminders && (
                  <ReminderToggle 
                    examId={exam.id} 
                    active={isReminded(exam.id, '1day') || isReminded(exam.id, '1hour')}
                    isReminded={isReminded}
                    onToggle={toggleReminder}
                  />
               )}
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-white/5">
               <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Code:</span>
                  <span className="text-xs text-slate-300 tabular-nums">{exam.subjectCode}</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Time:</span>
                  <span className="text-xs text-slate-300">{exam.time}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 md:p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-center">
        <p className="text-[10px] md:text-sm text-slate-400 font-bengali leading-relaxed">
          সকল পরীক্ষা সকাল ১০:০০ ঘটিকা হইতে শুরু হইবে। পরীক্ষার্থীদের ৩০ মিনিট পূর্বে উপস্থিতি কাম্য।
        </p>
      </div>
    </section>
  );
};

const ReminderToggle: React.FC<{ examId: string, active: boolean, isReminded: any, onToggle: any }> = ({ examId, active, isReminded, onToggle }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className={`p-2 rounded-lg transition-all border ${active ? 'bg-emerald-500 text-slate-950 border-emerald-500' : 'bg-white/5 text-slate-400 border-white/5'}`}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setOpen(false)}></div>
          <div className="absolute right-0 bottom-full mb-2 z-[70] glass-card p-1.5 rounded-xl border-white/10 shadow-2xl min-w-[140px] animate-in slide-in-from-bottom-2">
            <button onClick={() => { onToggle(examId, '1day'); setOpen(false); }} className={`w-full text-left p-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${isReminded(examId, '1day') ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-white/5'}`}>1 Day Before</button>
            <button onClick={() => { onToggle(examId, '1hour'); setOpen(false); }} className={`w-full text-left p-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest mt-1 ${isReminded(examId, '1hour') ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-white/5'}`}>1 Hour Before</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoutineTable;
