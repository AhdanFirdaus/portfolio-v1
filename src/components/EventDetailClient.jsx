'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ChevronRight,
  Calendar,
  Clock,
  FileText
} from 'lucide-react';

export default function EventDetailClient({ event }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!event) return null;

  const categories = ['All', ...Array.from(new Set((event.subposts || []).map(s => s.category)))];

  const filteredSubposts = selectedCategory === 'All'
    ? (event.subposts || [])
    : (event.subposts || []).filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-6 font-mono rounded-none">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-accent-red bg-bg-card px-3 py-1.5 border border-border-main transition-all w-fit rounded-none"
      >
        <ArrowLeft size={14} />
        <span>Back to Events</span>
      </Link>

      {/* Main Canvas */}
      <div className="bg-bg-card p-6 md:p-8 border border-border-main shadow-2xl space-y-8 rounded-none">
        
        {/* Header */}
        <div className="space-y-4 border-b border-border-main pb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-snug tracking-tight font-mono">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pt-2 font-mono">
            <span className="text-white font-medium">{event.author?.name || 'dadan'}</span>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Calendar size={13} className="text-accent-red" />
              <span>{event.date}</span>
            </div>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Clock size={13} className="text-accent-red" />
              <span>{event.readTime}</span>
            </div>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-1.5 text-accent-red font-semibold">
              <FileText size={13} />
              <span>{event.subpostsCount} subposts</span>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        {event.overview && (
          <div className="space-y-3 border-b border-border-main pb-6">
            <h2 className="text-xl font-bold text-white font-mono">
              {event.overview.heading}
            </h2>
            <p className="text-sm font-mono text-neutral-300 leading-relaxed">
              {event.overview.content}
            </p>
          </div>
        )}

        {/* Challenge List */}
        <div className="space-y-4 font-mono">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-mono">Challenge Writeups</h2>
            <span className="text-xs text-neutral-400 font-mono">{filteredSubposts.length} challenges</span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono border transition-all cursor-pointer rounded-none ${
                  selectedCategory === cat
                    ? 'bg-accent-red/15 text-accent-red border-accent-red/40 font-bold'
                    : 'bg-bg-hover text-neutral-400 border-border-main hover:text-white hover:border-accent-red/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Challenge List */}
          <div className="space-y-3 pt-2">
            {filteredSubposts.map(subpost => (
              <Link
                key={subpost.id}
                href={`/blog/${event.slug}/${subpost.slug}`}
                className="block group"
              >
                <div className="bg-bg-hover p-4 border border-border-main hover:border-accent-red/50 transition-all flex items-center justify-between gap-4 rounded-none">
                  <div className="space-y-1 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-accent-red/10 text-accent-red text-[10px] border border-accent-red/20 font-bold rounded-none">
                        {subpost.category}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">{subpost.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-accent-red transition-colors font-mono">
                      {subpost.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-1 font-mono">
                      {subpost.description}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-neutral-500 group-hover:text-accent-red group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
