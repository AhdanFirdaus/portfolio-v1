'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { 
  Terminal, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ShieldAlert, 
  CheckCircle2, 
  Code2, 
  FileCode, 
  Flag,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';
import Footer from '../../../../src/components/Footer';
import { getSubpost } from '../../../../lib/blogData';

export default function ChallengeWriteupPage() {
  const params = useParams();
  const { eventSlug, challSlug } = params;

  const [isFlagRevealed, setIsFlagRevealed] = useState(false);

  const result = getSubpost(eventSlug, challSlug);

  if (!result) {
    return notFound();
  }

  const { event, subpost } = result;

  return (
    <div className="space-y-6 font-mono">
      {/* Back button */}
      <Link
        href={`/blog/${event.slug}`}
        className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 bg-[#0d121f] px-3 py-1.5 rounded-md border border-blue-500/20 transition-all w-fit"
      >
        <ArrowLeft size={14} />
        <span>Back to {event.title}</span>
      </Link>

      {/* SINGLE UNIFIED CANVAS CONTAINER */}
      <div className="bg-[#0d121f] p-6 md:p-8 rounded-lg border border-blue-500/20 shadow-xl space-y-8">
        
        {/* Title Header Section */}
        <div className="space-y-4 border-b border-blue-500/15 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md border border-blue-500/20 font-bold">
              {subpost.category}
            </span>
            <span className="px-3 py-1 bg-[#141b2d] text-gray-300 text-xs rounded-md border border-blue-500/15">
              {event.title}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            {subpost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-2">
            <div className="flex items-center gap-1.5">
              <Terminal size={14} className="text-blue-400" />
              <span>Author: {subpost.author}</span>
            </div>
            <span className="text-gray-700">|</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-blue-400" />
              <span>{subpost.date}</span>
            </div>
            <span className="text-gray-700">|</span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-blue-400" />
              <span>{subpost.readTime}</span>
            </div>
          </div>
        </div>

        {/* Optional Challenge Image */}
        {subpost.image && (
          <div className="rounded-md overflow-hidden border border-blue-500/20 bg-[#141b2d] aspect-[16/8] relative">
            <img
              src={subpost.image}
              alt={subpost.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Description Section */}
        {subpost.description && (
          <div className="space-y-2 border-b border-blue-500/15 pb-6">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <FileText size={15} />
              Challenge Description
            </h2>
            <p className="text-sm font-sans text-gray-300 leading-relaxed">
              {subpost.description}
            </p>
          </div>
        )}

        {/* Executive Summary */}
        {subpost.executiveSummary && (
          <div className="space-y-3 border-b border-blue-500/15 pb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert size={18} className="text-amber-400" />
              Executive Summary
            </h2>
            <p className="text-sm font-sans text-gray-300 leading-relaxed">
              {subpost.executiveSummary}
            </p>
          </div>
        )}

        {/* Proof of Concept (PoC) Code Script */}
        {subpost.poc && (
          <div className="space-y-3 border-b border-blue-500/15 pb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 size={18} className="text-blue-400" />
                Proof of Concept (PoC Exploit)
              </h2>
              <span className="text-[10px] text-gray-400">python / exploit script</span>
            </div>
            <pre className="bg-[#080c16] p-4 rounded-md border border-blue-500/20 text-xs text-blue-300 overflow-x-auto leading-relaxed font-mono">
              <code>{subpost.poc}</code>
            </pre>
          </div>
        )}

        {/* Command Template */}
        {subpost.template && (
          <div className="space-y-3 border-b border-blue-500/15 pb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode size={18} className="text-blue-400" />
              Command Template
            </h2>
            <pre className="bg-[#080c16] p-3 rounded-md border border-blue-500/20 text-xs text-emerald-400 overflow-x-auto font-mono">
              <code>{subpost.template}</code>
            </pre>
          </div>
        )}

        {/* Technical Report Breakdown */}
        {subpost.technicalReport && (
          <div className="space-y-6 border-b border-blue-500/15 pb-6">
            <h2 className="text-xl font-bold text-white">
              Technical Report
            </h2>

            <div className="space-y-6 text-sm font-sans">
              <div>
                <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                  1. Reconnaissance
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {subpost.technicalReport.reconnaissance}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                  2. Enumeration
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {subpost.technicalReport.enumeration}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                  3. Initial Exploitation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {subpost.technicalReport.exploitation}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                  4. Privilege Escalation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {subpost.technicalReport.privilegeEscalation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Conclusion */}
        {subpost.conclusion && (
          <div className="space-y-3 border-b border-blue-500/15 pb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              Conclusion & Mitigations
            </h2>
            <p className="text-sm font-sans text-gray-300 leading-relaxed">
              {subpost.conclusion}
            </p>
          </div>
        )}

        {/* Flag Box (Click to Blur / Unblur) */}
        {subpost.flag && (
          <div className="bg-[#080c16] p-5 rounded-md border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Flag size={15} />
                <span>Captured Flag</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                {isFlagRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                <span>{isFlagRevealed ? '(Click flag to blur)' : '(Click flag to reveal)'}</span>
              </span>
            </div>
            
            <div
              onClick={() => setIsFlagRevealed(!isFlagRevealed)}
              className="bg-[#0d121f] p-3.5 rounded-md border border-emerald-500/20 font-mono text-sm font-bold text-emerald-300 cursor-pointer transition-all duration-300 overflow-x-auto"
            >
              <span className={isFlagRevealed ? 'blur-none select-all' : 'blur-md select-none opacity-60'}>
                {subpost.flag}
              </span>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
