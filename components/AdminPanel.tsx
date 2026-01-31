
import React, { useState } from 'react';
import { ExamEntry, UIConfig } from '../types';

interface AdminPanelProps {
  routine: ExamEntry[];
  targetDate: string;
  config: UIConfig;
  onUpdate: (data: { routine?: ExamEntry[], targetDate?: string, config?: UIConfig }) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ routine, targetDate, config, onUpdate, onLogout }) => {
  const [localRoutine, setLocalRoutine] = useState<ExamEntry[]>(routine);
  const [localTarget, setLocalTarget] = useState(targetDate);
  const [localConfig, setLocalConfig] = useState<UIConfig>(config);

  const handleAddSubject = () => {
    const newEntry: ExamEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: 'নতুন তারিখ',
      day: 'বার',
      subject: 'নতুন বিষয়',
      subjectCode: '000',
      time: '10:00 AM',
      timestamp: Date.now()
    };
    setLocalRoutine([...localRoutine, newEntry]);
  };

  const handleUpdateRoutine = (id: string, field: keyof ExamEntry, value: string) => {
    setLocalRoutine(localRoutine.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const toggleSetting = (key: keyof UIConfig) => {
    setLocalConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleConfigChange = (key: keyof UIConfig, value: string) => {
    setLocalConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onUpdate({ routine: localRoutine, targetDate: localTarget, config: localConfig });
    alert('Full System Update Successful! Changes are now live.');
  };

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8 pt-24 pb-32">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Advanced System Control Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 transform -rotate-3">
              <svg className="w-8 h-8 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">Advanced Control Center</h1>
              <p className="text-slate-400 mt-1 font-medium">Full manual override for all dashboard modules.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={onLogout} className="px-6 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all text-sm">
              Sign Out
            </button>
            <button onClick={handleSave} className="px-8 py-3 rounded-xl bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 hover:scale-[1.03] active:scale-95 transition-all text-sm uppercase tracking-wider">
              Apply Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Branding Management */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                 <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                 <h2 className="text-sm font-black text-white uppercase tracking-widest">Exam Branding & Identity</h2>
              </div>
              <div className="glass-card p-8 rounded-[2rem] border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                   <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Exam Name</label>
                   <input type="text" value={localConfig.examName} onChange={(e) => handleConfigChange('examName', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-emerald-500/50 outline-none transition-all" />
                 </div>
                 <div className="space-y-3">
                   <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Exam Year</label>
                   <input type="text" value={localConfig.examYear} onChange={(e) => handleConfigChange('examYear', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-emerald-500/50 outline-none transition-all" />
                 </div>
                 <div className="space-y-3">
                   <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Dashboard Main Title</label>
                   <input type="text" value={localConfig.appTitle} onChange={(e) => handleConfigChange('appTitle', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-emerald-500/50 outline-none transition-all" />
                 </div>
                 <div className="space-y-3">
                   <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Subtitle / Tagline</label>
                   <input type="text" value={localConfig.appSubtitle} onChange={(e) => handleConfigChange('appSubtitle', e.target.value)} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-emerald-500/50 outline-none transition-all" />
                 </div>
              </div>
            </section>

            {/* Routine Builder */}
            <section className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                   <h2 className="text-sm font-black text-white uppercase tracking-widest">Routine Content</h2>
                </div>
                <button onClick={handleAddSubject} className="px-5 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-xs uppercase tracking-widest hover:bg-emerald-500/20 transition-all">
                  + Add Subject
                </button>
              </div>
              <div className="glass-card rounded-[2rem] border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-900 border-b border-white/5">
                        <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timing (Bangla)</th>
                        <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Academic Details</th>
                        <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Ops</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {localRoutine.map((exam) => (
                        <tr key={exam.id} className="hover:bg-white/[0.02]">
                          <td className="p-5 space-y-2">
                            <input className="bg-slate-950/50 border border-white/5 rounded-lg px-3 py-2 text-white w-full font-bengali text-sm outline-none focus:border-emerald-500/30" value={exam.date} onChange={(e) => handleUpdateRoutine(exam.id, 'date', e.target.value)} placeholder="Date" />
                            <input className="bg-slate-950/50 border border-white/5 rounded-lg px-3 py-2 text-slate-400 w-full text-xs outline-none focus:border-emerald-500/30" value={exam.time} onChange={(e) => handleUpdateRoutine(exam.id, 'time', e.target.value)} placeholder="Time" />
                          </td>
                          <td className="p-5 space-y-2">
                            <input className="bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-emerald-400 font-bold w-full text-sm outline-none focus:border-emerald-500/30" value={exam.subject} onChange={(e) => handleUpdateRoutine(exam.id, 'subject', e.target.value)} placeholder="Subject" />
                            <div className="grid grid-cols-2 gap-2">
                               <input className="bg-slate-950/50 border border-white/5 rounded-lg px-3 py-2 text-slate-300 w-full text-xs outline-none focus:border-emerald-500/30" value={exam.day} onChange={(e) => handleUpdateRoutine(exam.id, 'day', e.target.value)} placeholder="Day" />
                               <input className="bg-slate-950/50 border border-white/5 rounded-lg px-3 py-2 text-slate-300 w-full text-xs outline-none focus:border-emerald-500/30" value={exam.subjectCode} onChange={(e) => handleUpdateRoutine(exam.id, 'subjectCode', e.target.value)} placeholder="Code" />
                            </div>
                          </td>
                          <td className="p-5 text-right">
                             <button onClick={() => setLocalRoutine(localRoutine.filter(e => e.id !== exam.id))} className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Visibility Toggles */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                 <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                 <h2 className="text-sm font-black text-white uppercase tracking-widest">Module Visibility</h2>
              </div>
              <div className="glass-card p-6 rounded-[2rem] border-white/5 space-y-4">
                <FeatureToggle label="Countdown Timer" active={localConfig.showCountdown} onToggle={() => toggleSetting('showCountdown')} />
                <FeatureToggle label="Routine Section" active={localConfig.showRoutine} onToggle={() => toggleSetting('showRoutine')} />
                <FeatureToggle label="Progress Tracker" active={localConfig.showProgress} onToggle={() => toggleSetting('showProgress')} />
                <FeatureToggle label="Exam Reminders" active={localConfig.showReminders} onToggle={() => toggleSetting('showReminders')} />
                <FeatureToggle label="Alarm Sound" active={localConfig.notificationSound} onToggle={() => toggleSetting('notificationSound')} />
                <FeatureToggle label="Print Function" active={localConfig.showPrint} onToggle={() => toggleSetting('showPrint')} />
                <FeatureToggle label="Download CSV" active={localConfig.showDownload} onToggle={() => toggleSetting('showDownload')} />
                <FeatureToggle label="Admin Entrance" active={localConfig.showAdminIcon} onToggle={() => toggleSetting('showAdminIcon')} />
                <FeatureToggle label="Telegram Button" active={localConfig.telegramEnabled} onToggle={() => toggleSetting('telegramEnabled')} />
              </div>
            </section>

            {/* Timer Management */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                 <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                 <h2 className="text-sm font-black text-white uppercase tracking-widest">Global Timer</h2>
              </div>
              <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                 <div className="space-y-3">
                   <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Countdown Target (ISO)</label>
                   <input type="text" value={localTarget} onChange={(e) => setLocalTarget(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xs outline-none focus:border-amber-500/30" />
                   <p className="text-[9px] text-slate-600">YYYY-MM-DDTHH:MM:SS+06:00</p>
                 </div>
                 <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                   <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Active Target</p>
                   <p className="text-white text-base mt-1 font-medium">{new Date(localTarget).toLocaleString('bn-BD', { dateStyle: 'full', timeStyle: 'short' })}</p>
                 </div>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
};

const FeatureToggle: React.FC<{ label: string; active: boolean; onToggle: () => void }> = ({ label, active, onToggle }) => (
  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5 group">
    <span className="text-slate-300 font-bold text-xs tracking-wide group-hover:text-white transition-colors">{label}</span>
    <button onClick={onToggle} className={`w-11 h-6 rounded-full transition-all relative outline-none ring-emerald-500/20 focus:ring-4 ${active ? 'bg-emerald-500' : 'bg-slate-800'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md ${active ? 'left-6' : 'left-1'}`}></div>
    </button>
  </div>
);

export default AdminPanel;
