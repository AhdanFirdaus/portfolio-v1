import Link from 'next/link';
import { Home, FileQuestion } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 font-mono rounded-none">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="bg-bg-card border border-border-main border-b-0 p-3 flex items-center gap-2 rounded-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-neutral-600"></span>
            <span className="w-2.5 h-2.5 bg-neutral-600"></span>
            <span className="w-2.5 h-2.5 bg-accent-red"></span>
          </div>
          <span className="text-xs font-mono text-neutral-400 ml-2">404.jsx</span>
        </div>

        {/* Content */}
        <div className="bg-bg-card border border-border-main p-8 rounded-none">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-accent-red/10 border border-accent-red/30 rounded-none">
              <FileQuestion size={48} className="text-accent-red" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-7xl font-mono font-bold text-center text-white mb-2">
            404
          </h1>
          
          <p className="text-center text-neutral-300 mb-4 font-mono text-sm">
            Page not found
          </p>
          
          <p className="text-center text-neutral-400 text-xs mb-8">
            The file you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-bg-hover hover:bg-accent-red/20 text-accent-red hover:text-white transition-all duration-200 border border-border-main hover:border-accent-red/40 font-mono text-sm rounded-none"
          >
            <Home size={16} strokeWidth={1.5} />
            <span>Back to Introduction</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
