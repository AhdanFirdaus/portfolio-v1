'use client';

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const ContactForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS credentials are missing');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    try {
      const now = new Date();
      const formattedDate = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date: formattedDate,
        timestamp: now.getTime(),
        time: now.toLocaleTimeString(),
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate()
      };

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (result.text === 'OK') {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 font-mono">
      {/* Name Input */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-xs font-mono text-neutral-400 flex items-center gap-2">
          <span className="text-accent-red">$</span>
          <span>name</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === 'sending'}
          className="w-full bg-bg-hover border border-border-main rounded-none px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-accent-red/50 transition-colors font-mono text-sm disabled:opacity-50"
          placeholder="John Doe"
        />
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-mono text-neutral-400 flex items-center gap-2">
          <span className="text-accent-red">$</span>
          <span>email</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === 'sending'}
          className="w-full bg-bg-hover border border-border-main rounded-none px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-accent-red/50 transition-colors font-mono text-sm disabled:opacity-50"
          placeholder="john@example.com"
        />
      </div>

      {/* Subject Input */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs font-mono text-neutral-400 flex items-center gap-2">
          <span className="text-accent-red">$</span>
          <span>subject</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          disabled={status === 'sending'}
          className="w-full bg-bg-hover border border-border-main rounded-none px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-accent-red/50 transition-colors font-mono text-sm disabled:opacity-50"
          placeholder="Project Collaboration"
        />
      </div>

      {/* Message Input */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-mono text-neutral-400 flex items-center gap-2">
          <span className="text-accent-red">$</span>
          <span>message</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === 'sending'}
          rows={4}
          className="w-full bg-bg-hover border border-border-main rounded-none px-4 py-3 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-accent-red/50 transition-colors font-mono text-sm resize-none disabled:opacity-50"
          placeholder="Write your message here..."
        />
      </div>

      <input type="hidden" name="date" value={new Date().toLocaleString()} />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className="w-full py-3 bg-bg-hover hover:bg-accent-red/20 border border-border-main hover:border-accent-red/50 text-accent-red hover:text-white transition-all font-mono text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group rounded-none cursor-pointer"
      >
        {status === 'sending' && (
          <>
            <Loader size={16} className="animate-spin" />
            <span>Sending...</span>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle size={16} className="text-accent-red" />
            <span className="text-accent-red">Message Sent!</span>
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle size={16} className="text-red-400" />
            <span className="text-red-400">Failed to Send</span>
          </>
        )}
        {status === 'idle' && (
          <>
            <span>Send Message</span>
            <Send size={14} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="text-center text-xs text-accent-red font-mono bg-accent-red/10 border border-accent-red/30 p-2 rounded-none">
          ✓ Your message has been sent successfully!
        </div>
      )}
      {status === 'error' && (
        <div className="text-center text-xs text-red-400 font-mono bg-red-500/10 border border-red-500/20 p-2 rounded-none">
          ✗ Failed to send message. Please try again.
        </div>
      )}
    </form>
  );
};

export default ContactForm;