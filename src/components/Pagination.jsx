'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8 font-mono">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-bg-card border border-border-main text-neutral-300 hover:text-white hover:border-accent-red disabled:opacity-40 disabled:hover:border-border-main disabled:hover:text-neutral-300 transition-all rounded-none cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeft size={14} />
        <span>Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 text-xs font-semibold border transition-all rounded-none cursor-pointer ${
              currentPage === page
                ? 'bg-accent-red border-accent-red text-white'
                : 'bg-bg-card border-border-main text-neutral-300 hover:border-accent-red/50 hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-bg-card border border-border-main text-neutral-300 hover:text-white hover:border-accent-red disabled:opacity-40 disabled:hover:border-border-main disabled:hover:text-neutral-300 transition-all rounded-none cursor-pointer disabled:cursor-not-allowed"
      >
        <span>Next</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
