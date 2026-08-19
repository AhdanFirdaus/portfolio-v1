'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Terminal, Calendar, Clock, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '../../src/components/Footer';
import { blogYears } from '../../lib/blogData';

export default function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Flatten all events with year tag for paginated view
  const allEvents = blogYears.flatMap(yearObj =>
    yearObj.events.map(event => ({ ...event, year: yearObj.year }))
  );

  const totalPages = Math.ceil(allEvents.length / itemsPerPage);
  const paginatedEvents = allEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Group current page events by year for display
  const yearsOnCurrentPage = Array.from(new Set(paginatedEvents.map(e => e.year)));

  return (
    <div className="space-y-8 font-mono">
      {/* Header */}
      <div className="relative border-b border-blue-500/15 pb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-md border border-blue-500/20">
            <BookOpen size={26} className="text-blue-400" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              CTF Writeups & Tech Blog
            </h1>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Terminal size={14} className="text-blue-400" />
              <span>$ cat writeups.log | grep security</span>
            </p>
          </div>
        </div>
      </div>

      {/* Events grouped by Year */}
      <div className="space-y-10">
        {yearsOnCurrentPage.map(year => {
          const eventsInYear = paginatedEvents.filter(e => e.year === year);
          return (
            <div key={year} className="space-y-4">
              <h2 className="text-2xl font-bold text-white border-l-2 border-blue-400 pl-3">
                {year}
              </h2>

              <div className="space-y-4">
                {eventsInYear.map(event => (
                  <Link
                    key={event.id}
                    href={`/blog/${event.slug}`}
                    className="block group"
                  >
                    <div className="bg-[#0d121f] rounded-lg border border-blue-500/15 p-5 hover:border-blue-400/40 hover:bg-[#111726] transition-all duration-200 shadow-md">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        {/* Thumbnail */}
                        <div className="md:col-span-4 aspect-[16/10] rounded-md overflow-hidden bg-[#141b2d] border border-blue-500/20 relative">
                          <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Event Content */}
                        <div className="md:col-span-8 space-y-3">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                            {event.title}
                          </h3>

                          <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-3">
                            {event.description}
                          </p>

                          {/* Metadata row */}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-2 border-t border-blue-500/10">
                            <div className="flex items-center gap-2">
                              <img
                                src={event.author.avatar}
                                alt={event.author.name}
                                className="w-5 h-5 rounded-full border border-blue-400/40"
                              />
                              <span className="text-gray-300 font-medium">{event.author.name}</span>
                            </div>

                            <span className="text-gray-700">|</span>

                            <div className="flex items-center gap-1.5 text-gray-400">
                              <Calendar size={13} className="text-blue-400" />
                              <span>{event.date}</span>
                            </div>

                            <span className="text-gray-700">|</span>

                            <div className="flex items-center gap-1.5 text-gray-400">
                              <Clock size={13} className="text-blue-400" />
                              <span>{event.readTime}</span>
                            </div>

                            <span className="text-gray-700">|</span>

                            <div className="flex items-center gap-1.5 text-gray-400">
                              <FileText size={13} className="text-blue-400" />
                              <span>{event.subpostsCount} subposts</span>
                            </div>
                          </div>

                          {/* Tag pills */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {event.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 bg-[#141b2d] text-gray-300 text-[11px] rounded-md border border-blue-500/20 group-hover:border-blue-400/30 group-hover:text-blue-300 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-blue-500/15 text-xs font-mono">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0d121f] border border-blue-500/20 rounded-md text-gray-300 hover:text-white hover:border-blue-400/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={14} />
            <span>Previous</span>
          </button>

          <span className="text-gray-400">
            Page <span className="text-blue-400 font-bold">{currentPage}</span> of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0d121f] border border-blue-500/20 rounded-md text-gray-300 hover:text-white hover:border-blue-400/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
