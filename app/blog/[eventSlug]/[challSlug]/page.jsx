'use client';

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
  FileText
} from 'lucide-react';
import Footer from '../../../../src/components/Footer';
import { getSubpost } from '../../../../lib/blogData';

export default function ChallengeWriteupPage() {
  const params = useParams();
  const { eventSlug, challSlug } = params;

  const result = getSubpost(eventSlug, challSlug);

  if (!result) {
    return notFound();
  }

  const { event, subpost } = result;

  return (
    <div className="space-y-8 font-mono">
      {/* Back button */}
      <Link
        href={`/blog/${event.slug}`}
        className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 bg-[#0d121f] px-3 py-1.5 rounded-md border border-blue-500/20 transition-all w-fit"
      >
        <ArrowLeft size={14} />
        <span>Back to {event.title}</span>
      </Link>

      {/* Writeup Container */}
      <div className="space-y-8">
        
        {/* Title Header */}
        <div className="bg-[#0d121f] p-6 md:p-8 rounded-lg border border-blue-500/20 space-y-4">
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

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 border-t border-blue-500/10 pt-4">
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
          <div className="rounded-lg overflow-hidden border border-blue-500/20 bg-[#0d121f] aspect-[16/8] relative">
            <img
              src={subpost.image}
              alt={subpost.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Description Section */}
        {subpost.description && (
          <div className="bg-[#0d121f] p-6 rounded-lg border border-blue-500/15 space-y-2">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <FileText size={16} />
              Challenge Description
            </h2>
            <p className="text-sm font-sans text-gray-300 leading-relaxed">
              {subpost.description}
            </p>
          </div>
        )}

        {/* Executive Summary */}
        {subpost.executiveSummary && (
          <div className="bg-[#0d121f] p-6 rounded-lg border border-blue-500/15 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-blue-500/10 pb-2">
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
          <div className="bg-[#0d121f] p-6 rounded-lg border border-blue-500/15 space-y-3">
            <div className="flex items-center justify-between border-b border-blue-500/10 pb-2">
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

        {/* Template / Command snippet */}
        {subpost.template && (
          <div className="bg-[#0d121f] p-6 rounded-lg border border-blue-500/15 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-blue-500/10 pb-2">
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
          <div className="bg-[#0d121f] p-6 rounded-lg border border-blue-500/15 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-blue-500/10 pb-3">
              Technical Report
            </h2>

            <div className="space-y-6 text-sm font-sans">
              <div>
                <h3 className="text-sm font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                  1. Reconnaissance
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {subpost.technicalReport.reconnaissance}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                  2. Enumeration
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {subpost.technicalReport.enumeration}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
                  3. Initial Exploitation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {subpost.technicalReport.exploitation}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">
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
          <div className="bg-[#0d121f] p-6 rounded-lg border border-blue-500/15 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-blue-500/10 pb-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              Conclusion & Mitigations
            </h2>
            <p className="text-sm font-sans text-gray-300 leading-relaxed">
              {subpost.conclusion}
            </p>
          </div>
        )}

        {/* Flag Box */}
        {subpost.flag && (
          <div className="bg-[#080c16] p-6 rounded-lg border-2 border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
              <Flag size={16} />
              <span>Captured Flag</span>
            </div>
            <div className="bg-[#0d121f] p-3 rounded-md border border-emerald-500/20 font-mono text-sm text-emerald-300 font-bold select-all overflow-x-auto">
              {subpost.flag}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
