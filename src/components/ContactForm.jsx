// src/components/ContactForm.jsx
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const ContactForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Ambil credentials dari environment variables
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Validasi environment variables
    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS credentials are missing');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    try {
      // Format timestamp untuk EmailJS
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

      // Tambahkan timestamp ke form data
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
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset status setelah 5 detik
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      
      // Reset status error setelah 5 detik
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {/* Name Input */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-xs font-mono text-gray-400 flex items-center gap-2">
          <span className="text-blue-400">$</span>
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
          className="w-full bg-[#1a1f2e] border border-blue-500/20 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-400/50 transition-colors font-mono text-sm disabled:opacity-50"
          placeholder="John Doe"
        />
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-mono text-gray-400 flex items-center gap-2">
          <span className="text-blue-400">$</span>
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
          className="w-full bg-[#1a1f2e] border border-blue-500/20 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-400/50 transition-colors font-mono text-sm disabled:opacity-50"
          placeholder="john@example.com"
        />
      </div>

      {/* Subject Input */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs font-mono text-gray-400 flex items-center gap-2">
          <span className="text-blue-400">$</span>
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
          className="w-full bg-[#1a1f2e] border border-blue-500/20 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-400/50 transition-colors font-mono text-sm disabled:opacity-50"
          placeholder="Project Collaboration"
        />
      </div>

      {/* Message Input */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-mono text-gray-400 flex items-center gap-2">
          <span className="text-blue-400">$</span>
          <span>message</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === 'sending'}
          rows="4"
          className="w-full bg-[#1a1f2e] border border-blue-500/20 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-400/50 transition-colors font-mono text-sm resize-none disabled:opacity-50"
          placeholder="Write your message here..."
        />
      </div>

      {/* Hidden inputs untuk timestamp (opsional) */}
      <input type="hidden" name="date" value={new Date().toLocaleString()} />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className="w-full py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-blue-400 hover:text-blue-300 transition-all font-mono text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {status === 'sending' && (
          <>
            <Loader size={16} className="animate-spin" />
            <span>Sending...</span>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-green-400">Message Sent!</span>
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

      {/* Status Messages */}
      {status === 'success' && (
        <div className="text-center text-xs text-green-400 font-mono bg-green-500/10 border border-green-500/20 rounded-lg p-2">
          ✓ Your message has been sent successfully!
        </div>
      )}
      {status === 'error' && (
        <div className="text-center text-xs text-red-400 font-mono bg-red-500/10 border border-red-500/20 rounded-lg p-2">
          ✗ Failed to send message. Please try again.
        </div>
      )}
    </form>
  );
};

export default ContactForm;