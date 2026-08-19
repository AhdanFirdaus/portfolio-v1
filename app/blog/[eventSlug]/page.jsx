'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { 
  Terminal, 
  Clock, 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  List, 
  Tag, 
  ChevronRight,
  Code2,
  BookOpen
} from 'lucide-react';
import Footer from '../../../src/components/Footer';
import { getEventBySlug } from '../../../lib/blogData';

export default function EventDetailPage() {
  const params = useParams();
  const eventSlug = params.eventSlug;
  const event = getEventBySlug(eventSlug);

  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!event) {
    return notFound();
  }

  // Extract unique categories from subposts
  const categories = ['All', ...Array.from(new Set(event.subposts.map(s => s.category)))];

  const filteredSubposts = selectedCategory === 'All'
    ? event.subposts
    : event.subposts.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-8 font-mono">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 bg-[#0d121f] px-3 py-1.5 rounded-md border border-blue-500/20 transition-all w-fit"
      >
        <ArrowLeft size={14} />
        <span>Back to Events</span>
      </Link>

      {/* Main Grid: Left TOC, Center Content, Right Subposts Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Table of Contents */}
        <div className="hidden lg:block lg:col-span-3 space-y-4 text-xs">
          <div className="sticky top-6 bg-[#0d121f] p-4 rounded-lg border border-blue-500/15 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold border-b border-blue-500/10 pb-2">
              <List size={14} />
              <span>Table of Contents</span>
            </div>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#overview" className="hover:text-blue-400 transition-colors block">
                  • Overview
                </a>
              </li>
              <li>
                <a href="#domains" className="hover:text-blue-400 transition-colors block">
                  • Knowledge Domains
                </a>
              </li>
              <li>
                <a href="#subposts-section" className="hover:text-blue-400 transition-colors block">
                  • Challenge Subposts ({event.subpostsCount})
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Center Column: Main Content */}
        <div className="lg:col-span-6 space-y-8">
          {/* Header Banner */}
          <div className="bg-[#0d121f] p-6 rounded-lg border border-blue-500/20 space-y-4">
            <div className="flex items-center gap-2 text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 w-fit">
              <ShieldCheck size={14} />
              <span>CTF & Pentest Event Track</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 border-t border-blue-500/10 pt-3">
              <span>{event.author.name}</span>
              <span className="text-gray-700">|</span>
              <span>{event.date}</span>
              <span className="text-gray-700">|</span>
              <span>{event.readTime}</span>
              <span className="text-gray-700">|</span>
              <span className="text-blue-400">{event.subpostsCount} subposts</span>
            </div>
          </div>

          {/* Overview Section */}
          {event.overview && (
            <div id="overview" className="bg-[#0d121f] p-6 rounded-lg border border-blue-500/15 space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-blue-500/10 pb-2">
                {event.overview.heading}
              </h2>
              <p className="text-sm font-sans text-gray-300 leading-relaxed">
                {event.overview.content}
              </p>
            </div>
          )}

          {/* Knowledge Domains Table */}
          {event.overview?.knowledgeDomains && (
            <div id="domains" className="bg-[#0d121f] p-6 rounded-lg border border-blue-500/15 space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-blue-500/10 pb-2">
                Knowledge Domains
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-blue-500/20 text-blue-400">
                      <th className="py-2.5 px-3">Domain</th>
                      <th className="py-2.5 px-3">Topics Covered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-500/10 text-gray-300">
                    {event.overview.knowledgeDomains.map((kd, i) => (
                      <tr key={i} className="hover:bg-blue-500/5">
                        <td className="py-2.5 px-3 text-white font-bold">{kd.domain}</td>
                        <td className="py-2.5 px-3 text-gray-400">{kd.topics}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Category Filter Tabs */}
          <div id="subposts-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Challenge Subposts</h2>
              <span className="text-xs text-gray-400">{filteredSubposts.length} challenges</span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-500/20 text-blue-300 border-blue-400/50 font-bold'
                      : 'bg-[#0d121f] text-gray-400 border-blue-500/15 hover:text-white hover:border-blue-400/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List of Filtered Challenges */}
            <div className="space-y-3">
              {filteredSubposts.map(subpost => (
                <Link
                  key={subpost.id}
                  href={`/blog/${event.slug}/${subpost.slug}`}
                  className="block group"
                >
                  <div className="bg-[#0d121f] p-4 rounded-lg border border-blue-500/15 hover:border-blue-400/40 hover:bg-[#111726] transition-all flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] rounded border border-blue-500/20">
                          {subpost.category}
                        </span>
                        <span className="text-xs text-gray-500">{subpost.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                        {subpost.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-1 font-sans">
                        {subpost.description}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Subposts Box Sidebar (Matching attached Image 2 right box) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="sticky top-6 bg-[#0d121f] p-4 rounded-lg border border-blue-500/20 space-y-3">
            <div className="bg-[#141b2d] p-3 rounded-md border border-blue-500/20 space-y-1">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <BookOpen size={14} className="text-blue-400" />
                <span className="truncate">{event.title}</span>
              </div>
              <p className="text-[11px] text-gray-400">
                {event.readTime} total ({event.subpostsCount} subposts)
              </p>
            </div>

            {/* List of subposts */}
            <div className="space-y-1.5 pt-1">
              {event.subposts.map(sub => (
                <Link
                  key={sub.id}
                  href={`/blog/${event.slug}/${sub.slug}`}
                  className="flex items-start gap-2.5 p-2 rounded-md hover:bg-blue-500/10 text-xs text-gray-300 hover:text-blue-400 transition-colors group"
                >
                  <FileText size={14} className="text-gray-500 group-hover:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold leading-snug line-clamp-1">{sub.title}</p>
                    <p className="text-[10px] text-gray-500">{sub.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
