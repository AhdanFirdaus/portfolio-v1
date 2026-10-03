'use client';

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Terminal, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  ShieldAlert, 
  CheckCircle2, 
  Code2, 
  FileCode, 
  Flag,
  FileText,
  Eye,
  EyeOff,
  FolderTree
} from 'lucide-react';

function FlagBox({ flagText }) {
  const [isRevealed, setIsRevealed] = useState(false);
  return (
    <div className="bg-bg-main p-4 border border-accent-red/40 my-4 space-y-2 font-mono rounded-none">
      <div className="flex items-center justify-between text-xs font-bold text-accent-red uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Flag size={15} />
          <span>Flag</span>
        </div>
        <span className="text-[10px] text-neutral-400 flex items-center gap-1 cursor-pointer select-none hover:text-white">
          {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
          <span>{isRevealed ? '(Click to blur)' : '(Click to reveal)'}</span>
        </span>
      </div>
      <div
        onClick={() => setIsRevealed(!isRevealed)}
        className="bg-bg-card p-3 border border-accent-red/20 text-sm font-bold text-accent-red cursor-pointer transition-all duration-300 overflow-x-auto rounded-none"
      >
        <span className={isRevealed ? 'blur-none select-all transition-all duration-300' : 'blur-md select-none opacity-50 transition-all duration-300'}>
          {flagText}
        </span>
      </div>
    </div>
  );
}

export default function ChallengeWriteupClient({ event, subpost }) {
  if (!subpost || !event) return null;

  const subpostsList = event.subposts || [];
  const subpostIndex = subpostsList.findIndex(s => s.slug === subpost.slug);
  const prevSubpost = subpostIndex > 0 ? subpostsList[subpostIndex - 1] : null;
  const nextSubpost = (subpostIndex >= 0 && subpostIndex < subpostsList.length - 1) ? subpostsList[subpostIndex + 1] : null;

  return (
    <div className="space-y-6 font-mono rounded-none">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
        <Link
          href={`/blog/${event.slug}`}
          className="inline-flex items-center gap-2 text-neutral-300 hover:text-accent-red bg-bg-card px-3 py-1.5 border border-border-main transition-all w-fit rounded-none"
        >
          <ArrowLeft size={14} />
          <span>Back to {event.title}</span>
        </Link>

        {/* Prev / Next Quick Nav Bar */}
        <div className="flex items-center gap-2">
          {prevSubpost ? (
            <Link
              href={`/blog/${event.slug}/${prevSubpost.slug}`}
              className="px-2.5 py-1 bg-bg-card border border-border-main hover:border-accent-red/50 text-neutral-300 hover:text-accent-red transition-all flex items-center gap-1.5 text-[11px] rounded-none"
              title={`Prev: ${prevSubpost.title}`}
            >
              <ArrowLeft size={12} />
              <span className="hidden sm:inline truncate max-w-[120px]">{prevSubpost.title}</span>
              <span className="sm:hidden">Prev</span>
            </Link>
          ) : (
            <span className="px-2.5 py-1 bg-bg-card border border-border-main text-neutral-600 text-[11px] rounded-none">
              No Prev
            </span>
          )}

          <Link
            href={`/blog/${event.slug}`}
            className="px-2.5 py-1 bg-bg-card border border-border-main hover:border-accent-red/50 text-neutral-300 hover:text-accent-red transition-all flex items-center gap-1.5 text-[11px] rounded-none"
          >
            <FolderTree size={12} />
            <span className="hidden sm:inline">Event Track</span>
          </Link>

          {nextSubpost ? (
            <Link
              href={`/blog/${event.slug}/${nextSubpost.slug}`}
              className="px-2.5 py-1 bg-bg-card border border-border-main hover:border-accent-red/50 text-neutral-300 hover:text-accent-red transition-all flex items-center gap-1.5 text-[11px] rounded-none"
              title={`Next: ${nextSubpost.title}`}
            >
              <span className="hidden sm:inline truncate max-w-[120px]">{nextSubpost.title}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight size={12} />
            </Link>
          ) : (
            <span className="px-2.5 py-1 bg-bg-card border border-border-main text-neutral-600 text-[11px] rounded-none">
              No Next
            </span>
          )}
        </div>
      </div>

      {/* SINGLE UNIFIED CANVAS CONTAINER */}
      <div className="bg-bg-card p-6 md:p-8 border border-border-main shadow-2xl space-y-8 rounded-none">
        
        {/* Title Header Section */}
        <div className="space-y-4 border-b border-border-main pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-accent-red/10 text-accent-red text-xs border border-accent-red/30 font-bold rounded-none">
              {subpost.category}
            </span>
            <span className="px-3 py-1 bg-bg-hover text-neutral-300 text-xs border border-border-main rounded-none">
              {event.title}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight tracking-tight font-mono">
            {subpost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pt-2 font-mono">
            <div className="flex items-center gap-1.5">
              <Terminal size={14} className="text-accent-red" />
              <span>Author: {subpost.author || 'dadan'}</span>
            </div>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-accent-red" />
              <span>{subpost.date}</span>
            </div>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-accent-red" />
              <span>{subpost.readTime}</span>
            </div>
          </div>

          {subpost.tags && subpost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 font-mono">
              {subpost.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-bg-hover text-neutral-300 hover:text-accent-red text-[11px] border border-border-main transition-colors rounded-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Optional Challenge Image Banner */}
        {subpost.image && (
          <div className="border border-border-main bg-bg-main aspect-[16/8] relative rounded-none overflow-hidden">
            <img
              src={subpost.image}
              alt={subpost.title}
              className="w-full h-full object-cover rounded-none"
            />
          </div>
        )}

        {/* Challenge Description */}
        {subpost.description && (
          <div className="space-y-3 border-b border-border-main pb-6">
            <h2 className="text-xs font-mono font-bold text-accent-red uppercase tracking-widest flex items-center gap-2">
              <FileText size={15} />
              Challenge Description
            </h2>
            <p className="text-sm font-mono text-neutral-300 leading-relaxed">
              {subpost.description}
            </p>
          </div>
        )}

        {/* Dynamic Notion Markdown Page Body Content */}
        {subpost.contentMarkdown && (
          <div className="space-y-4 border-b border-border-main pb-6 font-mono">
            <div className="markdown-content space-y-4 font-mono">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-2xl md:text-3xl font-mono font-bold text-white mt-8 mb-4 border-b border-border-main pb-2" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl md:text-2xl font-mono font-bold text-white mt-8 mb-4 border-l-2 border-accent-red pl-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-lg font-mono font-bold text-accent-red mt-6 mb-2" {...props} />
                  ),
                  p: ({ node, children, ...props }) => {
                    const text = String(children || '');
                    if (text.startsWith('Flag:') || text.startsWith('flag:') || text.startsWith('FLAG:')) {
                      const flagVal = text.replace(/^(Flag|flag|FLAG):\s*/, '').trim();
                      return <FlagBox flagText={flagVal} />;
                    }
                    return <p className="text-sm font-mono text-neutral-300 leading-relaxed my-3" {...props}>{children}</p>;
                  },
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 text-sm font-mono text-neutral-300 my-3" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1 text-sm font-mono text-neutral-300 my-3" {...props} />,
                  li: ({ node, ...props }) => <li className="my-1 font-mono" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-accent-red bg-bg-main p-4 text-xs font-mono text-accent-red my-4 rounded-none shadow-sm" {...props} />
                  ),
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="my-5 border border-border-main bg-bg-main rounded-none overflow-hidden font-mono">
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            padding: '1.25rem',
                            fontSize: '0.8125rem',
                            background: 'var(--bg-main)',
                            borderRadius: '0px',
                            fontFamily: 'var(--font-mono)',
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className="bg-accent-red/10 text-accent-red border border-accent-red/30 px-1.5 py-0.5 text-xs font-mono font-semibold rounded-none" {...props}>
                        {children}
                      </code>
                    );
                  },
                  img: ({ node, src, alt, ...props }) => (
                    <img
                      src={src}
                      alt={alt || ''}
                      referrerPolicy="no-referrer"
                      className="my-5 max-w-full h-auto rounded-none"
                      loading="lazy"
                      {...props}
                    />
                  )
                }}
              >
                {subpost.contentMarkdown}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Executive Summary */}
        {subpost.executiveSummary && (
          <div className="space-y-3 border-b border-border-main pb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
              <ShieldAlert size={18} className="text-amber-400" />
              Executive Summary
            </h2>
            <p className="text-sm font-mono text-neutral-300 leading-relaxed">
              {subpost.executiveSummary}
            </p>
          </div>
        )}

        {/* PoC Code */}
        {subpost.poc && (
          <div className="space-y-3 border-b border-border-main pb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
              <Code2 size={18} className="text-accent-red" />
              Proof of Concept (PoC Exploit)
            </h2>
            <pre className="bg-bg-main p-4 border border-border-main text-xs text-accent-red overflow-x-auto leading-relaxed font-mono rounded-none">
              <code>{subpost.poc}</code>
            </pre>
          </div>
        )}

        {/* Command Template */}
        {subpost.template && (
          <div className="space-y-3 border-b border-border-main pb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
              <FileCode size={18} className="text-accent-red" />
              Command Template
            </h2>
            <pre className="bg-bg-main p-3 border border-border-main text-xs text-accent-red overflow-x-auto font-mono rounded-none">
              <code>{subpost.template}</code>
            </pre>
          </div>
        )}

        {/* Technical Report */}
        {subpost.technicalReport && (
          <div className="space-y-6 border-b border-border-main pb-6 font-mono">
            <h2 className="text-xl font-bold text-white font-mono">Technical Report</h2>
            <div className="space-y-6 text-sm font-mono">
              {subpost.technicalReport.reconnaissance && (
                <div>
                  <h3 className="text-xs font-mono font-bold text-accent-red uppercase tracking-wider mb-1">1. Reconnaissance</h3>
                  <p className="text-neutral-300 leading-relaxed font-mono">{subpost.technicalReport.reconnaissance}</p>
                </div>
              )}
              {subpost.technicalReport.enumeration && (
                <div>
                  <h3 className="text-xs font-mono font-bold text-accent-red uppercase tracking-wider mb-1">2. Enumeration</h3>
                  <p className="text-neutral-300 leading-relaxed font-mono">{subpost.technicalReport.enumeration}</p>
                </div>
              )}
              {subpost.technicalReport.exploitation && (
                <div>
                  <h3 className="text-xs font-mono font-bold text-accent-red uppercase tracking-wider mb-1">3. Initial Exploitation</h3>
                  <p className="text-neutral-300 leading-relaxed font-mono">{subpost.technicalReport.exploitation}</p>
                </div>
              )}
              {subpost.technicalReport.privilegeEscalation && (
                <div>
                  <h3 className="text-xs font-mono font-bold text-accent-red uppercase tracking-wider mb-1">4. Privilege Escalation</h3>
                  <p className="text-neutral-300 leading-relaxed font-mono">{subpost.technicalReport.privilegeEscalation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Conclusion */}
        {subpost.conclusion && (
          <div className="space-y-3 border-b border-border-main pb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
              <CheckCircle2 size={18} className="text-accent-red" />
              Conclusion & Mitigations
            </h2>
            <p className="text-sm font-mono text-neutral-300 leading-relaxed">
              {subpost.conclusion}
            </p>
          </div>
        )}

        {/* Flag */}
        {subpost.flag && (
          <FlagBox flagText={subpost.flag} />
        )}

        {/* Bottom Prev / Next Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border-main font-mono text-xs">
          {prevSubpost ? (
            <Link
              href={`/blog/${event.slug}/${prevSubpost.slug}`}
              className="flex items-center gap-2 px-4 py-2 bg-bg-main border border-border-main hover:border-accent-red/50 text-neutral-300 hover:text-accent-red transition-all rounded-none"
            >
              <ArrowLeft size={14} />
              <span>Previous: {prevSubpost.title}</span>
            </Link>
          ) : <div />}

          {nextSubpost ? (
            <Link
              href={`/blog/${event.slug}/${nextSubpost.slug}`}
              className="flex items-center gap-2 px-4 py-2 bg-bg-main border border-border-main hover:border-accent-red/50 text-neutral-300 hover:text-accent-red transition-all ml-auto rounded-none"
            >
              <span>Next: {nextSubpost.title}</span>
              <ArrowRight size={14} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
