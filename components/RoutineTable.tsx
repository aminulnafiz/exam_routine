
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const csvRows = [
      ['Date', 'Day', 'Subject', 'Code', 'Time'],
      ...routine.map(e => [e.date, e.day, e.subject, e.subjectCode, e.time])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${config.examName}_Routine.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 md:py-20 px-4 w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 print:mb-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1.5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
          <h2 className="text-3xl md:text-4xl font-black font-bengali text-white tracking-tight">
            {LABELS.routine.title}
          </h2>
        </div>
        
        <div className="flex items-center gap-3 print:hidden">
          {config.showPrint && (
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm hover:bg-white/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print Routine
            </button>
          )}
          {config.showDownload && (
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-slate-950 border border-emerald-500 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download
            </button>
          )}
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl print:shadow-none print:border-slate-200 print:bg-white print:text-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/40 print:bg-slate-100">
                {LABELS.routine.columns.map((col, idx) => {
                  if (col === 'Reminders' && (!config.showReminders || typeof window !== 'undefined' && window.matchMedia('print').matches)) return null;
                  return (
                    <th key={idx} className="p-6 text-sm md:text-base font-bold font-bengali text-slate-300 print:text-slate-700 border-b border-white/5 print:border-slate-200 tracking-wide">
                      {col}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 print:divide-slate-200">
              {routine.map((exam) => (
                <tr key={exam.id} className="hover:bg-white/[0.03] transition-colors group print:hover:bg-transparent">
                  <td className="p-6 font-bengali text-slate-200 print:text-slate-800 text-sm md:text-base whitespace-nowrap">{exam.date}</td>
                  <td className="p-6 font-bengali text-slate-200 print:text-slate-800 text-sm md:text-base">{exam.day}</td>
                  <td className="p-6 font-bengali text-emerald-400 print:text-emerald-700 font-bold text-sm md:text-lg">{exam.subject}</td>
                  <td className="p-6 font-bengali text-slate-300 print:text-slate-600 tabular-nums text-sm md:text-base">{exam.subjectCode}</td>
                  <td className="p-6 font-bengali text-slate-200 print:text-slate-800 text-sm md:text-base whitespace-nowrap">{exam.time}</td>
                  {config.showReminders && (
                    <td className="p-6 relative print:hidden">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === exam.id ? null : exam.id)}
                        className={`p-2 rounded-lg transition-all border ${isReminded(exam.id, '1day') || isReminded(exam.id, '1hour') ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-400 hover:text-emerald-400 border-white/5 hover:bg-white/10'}`}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </button>
                      {activeMenu === exam.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)}></div>
                          <div className="absolute right-0 bottom-full mb-2 z-50 glass-card p-2 rounded-2xl border-white/10 shadow-2xl min-w-[160px] animate-in fade-in slide-in-from-bottom-2">
                            <button 
                              onClick={() => toggleReminder(exam.id, '1day')}
                              className={`w-full text-left p-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between ${isReminded(exam.id, '1day') ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-300 hover:bg-white/5'}`}
                            >
                              1 Day Before
                              {isReminded(exam.id, '1day') && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </button>
                            <button 
                              onClick={() => toggleReminder(exam.id, '1hour')}
                              className={`w-full text-left p-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between mt-1 ${isReminded(exam.id, '1hour') ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-300 hover:bg-white/5'}`}
                            >
                              1 Hour Before
                              {isReminded(exam.id, '1hour') && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-10 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-center print:border-slate-300 print:text-slate-600 print:mt-4">
        <p className="text-sm text-slate-400 font-bengali leading-relaxed print:text-slate-700">
          সকল পরীক্ষা সকাল ১০:০০ ঘটিকা হইতে শুরু হইবে। পরীক্ষার্থীদের পরীক্ষার ৩০ মিনিট পূর্বে কেন্দ্রে উপস্থিত থাকার পরামর্শ দেওয়া হইলো।
        </p>
      </div>
    </section>
  );
};

export default RoutineTable;
