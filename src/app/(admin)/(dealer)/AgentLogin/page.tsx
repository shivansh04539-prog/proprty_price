"use client"
import React, { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';

const DealerLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Here you will eventually call your login API or NextAuth
    // Example: await signIn("credentials", { email: formData.email, password: formData.password })
    console.log("Login data:", formData);
    
    setTimeout(() => setStatus('idle'), 1000); // Simulated delay
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 italic">Dealer Login</h2>
        <p className="text-slate-500 mt-2">Welcome back! Manage your properties.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="email@example.com" />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" />
          </div>
        </div>

        <button type="submit" disabled={status === 'loading'} className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50">
          {status === 'loading' ? <><Loader2 className="animate-spin" /> Verifying...</> : "Login to Dashboard"}
        </button>
      </form>
    </div>
  );
};

export default DealerLogin;