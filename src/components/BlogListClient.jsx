'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Terminal, Calendar, Clock, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BlogListClient({ blogYears }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const allEvents = (blogYears || []).flatMap(yearObj =>
    (yearObj.events || []).map(event => ({ ...event, year: yearObj.year }))
  );

  const totalPages = Math.max(1, Math.ceil(allEvents.length / itemsPerPage));
  const paginatedEvents = allEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const yearsOnCurrentPage = Array.from(new Set(paginatedEvents.map(e => e.year)));

  return (
    <div className="space-y-8 font-mono rounded-none">
      {/* Header */}
      <div className="relative border-b border-border-main pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-mono">
            Technical Logs & Writeups
          </h1>
          <p className="text-neutral-400 text-sm flex items-center gap-2 mt-2 font-mono">
            <Terminal size={14} className="text-accent-red" />
            <span>$ cat writeups.log | grep security</span>
          </p>
        </div>
      </div>

      {/* Events grouped by Year */}
      {allEvents.length === 0 ? (
        <div className="text-center py-16 px-4 bg-bg-card border border-border-main rounded-none space-y-3 font-mono">
          <p className="text-lg md:text-xl font-bold text-white">Oops, data masih kosong atau tidak terload</p>
          <p className="text-xs md:text-sm text-neutral-400">$ no technical logs or writeups found in Notion database</p>
        </div>
      ) : (
        <div className="space-y-10 font-mono">
          {yearsOnCurrentPage.map(year => {
            const eventsInYear = paginatedEvents.filter(e => e.year === year);
            return (
              <div key={year} className="space-y-4 font-mono">
                <h2 className="text-2xl font-bold text-white border-l-2 border-accent-red pl-3 flex items-center gap-2 font-mono">
                  <span>{year}</span>
                </h2>

                <div className="space-y-4 font-mono">
                  {eventsInYear.map(event => (
                    <Link
                      key={event.id}
                      href={`/blog/${event.slug}`}
                      className="block group"
                    >
                      <div className="bg-bg-card border border-border-main p-6 hover:border-accent-red/50 transition-all duration-200 shadow-xl rounded-none space-y-4 font-mono">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-accent-red transition-colors leading-tight font-mono">
                          {event.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-mono line-clamp-3">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pt-3 border-t border-border-main/80 font-mono">
                          <span className="text-neutral-300 font-medium font-mono">{event.author?.name || 'dadan'}</span>
                          <span className="text-neutral-700">|</span>
                          <div className="flex items-center gap-1.5 text-neutral-400 font-mono">
                            <Calendar size={13} className="text-accent-red" />
                            <span>{event.date}</span>
                          </div>
                          <span className="text-neutral-700">|</span>
                          <div className="flex items-center gap-1.5 text-neutral-400 font-mono">
                            <Clock size={13} className="text-accent-red" />
                            <span>{event.readTime}</span>
                          </div>
                          <span className="text-neutral-700">|</span>
                          <div className="flex items-center gap-1.5 text-neutral-400 font-mono">
                            <FileText size={13} className="text-accent-red" />
                            <span>{event.subpostsCount} subposts</span>
                          </div>
                        </div>

                        {event.tags && event.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1 font-mono">
                            {event.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 bg-bg-hover text-neutral-300 text-[11px] border border-border-main group-hover:border-accent-red/30 group-hover:text-accent-red transition-colors rounded-none font-mono"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-border-main text-xs font-mono">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-bg-card border border-border-main text-neutral-300 hover:text-white hover:border-accent-red/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer rounded-none font-mono"
          >
            <ChevronLeft size={14} />
            <span>Previous</span>
          </button>

          <span className="text-neutral-400 font-mono">
            Page <span className="text-accent-red font-bold font-mono">{currentPage}</span> of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-bg-card border border-border-main text-neutral-300 hover:text-white hover:border-accent-red/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer rounded-none font-mono"
          >
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
