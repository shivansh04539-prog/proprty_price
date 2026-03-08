"use client";
import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Message sent! (connect this to email API later)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-xl w-full bg-white shadow-md rounded-xl p-8">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Contact Us
        </h1>

        <p className="text-center text-gray-500 mb-6">
          We'd love to hear from you. Send us a message.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            rows={4}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90"
          >
            Send Message
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Email: shivanshsingh4539@gmail.com</p>
          <p>Phone: +91 7618550475</p>
        </div>

      </div>
    </div>
  );
}