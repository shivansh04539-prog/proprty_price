"use client";
import React, { useState } from 'react';

const districts = ["अंबेडकर नगर", "अमरोहा", "सहारनपुर", "गौतम बुद्ध नगर", "लखनऊ", "वाराणसी"]; // ... add all others here

export default function RateListForm() {
  const [district, setDistrict] = useState("सहारनपुर");
  const [office, setOffice] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Downloading Rate List for ${district} - ${office}`);
    // यहाँ आप PDF की लिंक ट्रिगर कर सकते हैं
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
      <form onSubmit={handleDownload} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">जनपद (District):</label>
          <select 
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">उप निबंधक कार्यालय (Sub-Registrar Office):</label>
          <select 
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">-- चयन करें --</option>
            <option value="SRO-1">SRO-1 Saharanpur</option>
            <option value="SRO-2">SRO-2 Deoband</option>
          </select>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold text-slate-400 mb-1">Captcha</span>
            <div className="text-2xl font-mono tracking-widest select-none bg-white px-4 py-2 border rounded shadow-inner line-through decoration-slate-400">
              R8K2P
            </div>
          </div>
          <button type="button" className="text-blue-600 text-sm hover:underline">पुनश्चर्या (Refresh)</button>
        </div>

        <div>
          <input 
            type="text" 
            placeholder="कैप्चा अंकित करें *"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          Download Rate List PDF
        </button>
      </form>
    </div>
  );
}