
import React, { useState, useEffect } from 'react';
import { LABELS } from '../constants';
import { ExamEntry, UIConfig } from '../types';

interface ProgressTrackerProps {
  routine: ExamEntry[];
  config: UIConfig;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ routine, config }) => {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('arns_dakhil_progress');
    if (saved) {
      try {
        setCompletedIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress data", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('arns_dakhil_progress', JSON.stringify(completedIds));
  }, [completedIds]);

  if (!config.showProgress) return null;

  const toggleSubject = (id: string) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const percentage = routine.length > 0 ? Math.round((completedIds.length / routine.length) * 100) : 0;

  return (
    <section className="py-12 md:py-20 px-4 w-full max-w-6xl mx-auto print:hidden">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-8 rounded-3xl sticky top-24 border-white/5">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
              {LABELS.progress.title}
            </h2>
            
            <div className="relative flex items-center justify-center py-6">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
                <circle
                  cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="10" fill="transparent"
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={2 * Math.PI * 80 * (1 - percentage / 100)}
                  strokeLinecap="round"
                  className="text-emerald-500 transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{percentage}%</span>
                <span className="text-slate-400 text-sm">Completed</span>
              </div>
            </div>
            <div className="mt-8 space-y-4 text-center">
                <p className="text-slate-400 text-sm font-medium">Keep going, you are doing great!</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="glass-card rounded-3xl p-6 md:p-8 border-white/5 h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {routine.map((exam) => {
                const isDone = completedIds.includes(exam.id);
                return (
                  <button
                    key={exam.id}
                    onClick={() => toggleSubject(exam.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left border ${
                      isDone ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800/30 border-white/5 hover:border-slate-700'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                      isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-slate-900 border-slate-700'
                    }`}>
                      {isDone && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold truncate text-sm md:text-base ${isDone ? 'text-emerald-400' : 'text-slate-200'}`}>{exam.subject}</h4>
                      <p className={`text-xs font-bengali mt-1 ${isDone ? 'text-emerald-500/70' : 'text-slate-500'}`}>
                        {isDone ? LABELS.progress.done : LABELS.progress.notDone}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressTracker;
