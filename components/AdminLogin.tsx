
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'aminulnafiz90@gmail.com' && password === '@Ainafiz90') {
      onLogin();
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="glass-card w-full max-w-lg p-8 md:p-12 rounded-t-[2.5rem] md:rounded-[3rem] border-white/10 shadow-2xl relative animate-in slide-in-from-bottom md:slide-in-from-top duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 text-slate-500 hover:text-white transition-colors p-2"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/20 transform rotate-6">
            <span className="text-white text-3xl font-black italic">A</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Admin Gateway</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Restricted to authorized personnel only.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 pb-8 md:pb-0">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-base"
              placeholder="Enter admin email"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Security Key</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all text-base"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-xs text-center font-bold tracking-wide uppercase">{error}</div>}

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-5 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all transform active:scale-95 text-sm uppercase tracking-widest mt-4"
          >
            Confirm Identity
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
