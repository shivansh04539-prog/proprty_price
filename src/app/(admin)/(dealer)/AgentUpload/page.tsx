"use client"
import React, { useState, useRef } from 'react';
import { User, MapPin, Phone, Mail, FileText, Send, Loader2, Camera, X, Building2 } from 'lucide-react';

const AgentRegistration = () => {
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    area: '',
    phone: '',
    email: '',
    password: '', 
    bio: '' // Fixed syntax error here
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('idle'); 
  const [isVerifying, setIsVerifying] = useState(false);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [hashPayload, setHashPayload] = useState(""); // Holds our secure stateless token

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 1. Send OTP Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (res.ok) {
        setHashPayload(data.hashPayload); // Save the hash
        setShowOtpModal(true);
        setStatus("idle");
      } else {
        alert(data.message || "Failed to send OTP");
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  // 2. Verify OTP and Register
 const verifyOtp = async () => {
    if (otp.length < 6) return alert("Enter valid OTP");
    
    setIsVerifying(true);
    const dataToSend = new FormData();

    Object.keys(formData).forEach((key) => dataToSend.append(key, formData[key]));
    dataToSend.append("otp", otp);
    dataToSend.append("hashPayload", hashPayload);

    if (selectedFile) {
      dataToSend.append("image", selectedFile);
    }

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        body: dataToSend,
      });

      const result = await res.json();

      if (res.ok) {
        // 1. The browser AUTOMATICALLY handled the authToken cookie.
        // 2. Save only the non-sensitive user data to localStorage for your UI.
        localStorage.setItem("user", JSON.stringify(result.user));

        window.location.href = "/dealer";
      } else {
        alert(result.message || "Wrong OTP");
        setIsVerifying(false);
      }
    } catch (err) {
      alert("Something went wrong");
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 italic">Dealer Registration</h2>
        <p className="text-slate-500 mt-2">Set up your professional profile to start listing properties.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative cursor-pointer" onClick={() => fileInputRef.current.click()}>
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} className="w-32 h-32 rounded-2xl object-cover border-4 border-blue-50 shadow-md" alt="Preview" />
                <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500 transition-all">
                <Camera className="w-8 h-8 mb-1" />
                <span className="text-xs font-semibold">Add Photo</span>
              </div>
            )}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input required name="name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Dealer Name" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="email@example.com" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 ml-1">Phone</label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="+91 ..." />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 ml-1">City</label>
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input required name="city" value={formData.city} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. Saharanpur" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 ml-1">Area / Locality</label>
            <div className="relative mt-1">
              <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input required name="area" value={formData.area} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. Court Road" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
            <div className="relative mt-1">
              <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Min 6 characters" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">About (Bio)</label>
            <div className="relative mt-1">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" placeholder="Tell clients about your expertise..." />
            </div>
          </div>
        </div>

        <button type="submit" disabled={status === 'loading'} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-70">
          {status === 'loading' ? <><Loader2 className="animate-spin" /> Sending OTP...</> : <><Send size={18}/> Register as Dealer</>}
        </button>
      </form>

      {/* Modern Blurred OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl border border-slate-100 transform transition-all">
            <div className="text-center mb-6">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Verify Email</h2>
              <p className="text-sm text-slate-500 mt-2">We sent a 6-digit code to <br/><span className="font-medium text-slate-900">{formData.email}</span></p>
            </div>

            <input
              type="text"
              maxLength="6"
              placeholder="••••••"
              className="w-full text-center text-3xl tracking-[0.5em] font-mono border-2 border-slate-200 p-3 rounded-xl mb-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only allow numbers
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowOtpModal(false)}
                disabled={isVerifying}
                className="flex-1 py-3 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={verifyOtp}
                disabled={isVerifying || otp.length < 6}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-70"
              >
                {isVerifying ? <Loader2 className="animate-spin w-5 h-5" /> : "Verify"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentRegistration;