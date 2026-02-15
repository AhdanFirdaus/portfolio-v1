import React from 'react';
import { Link } from 'react-router';
import { Home, FileQuestion } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1422] to-[#0a0e1a] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Simple header with dots */}
        <div className="bg-[#1a1f2e] rounded-t-lg border border-blue-500/20 border-b-0 p-3 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-xs font-mono text-gray-500 ml-2">404.jsx</span>
        </div>

        {/* Content */}
        <div className="bg-[#0f1422] border border-blue-500/20 rounded-b-lg p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-500/10 rounded-2xl">
              <FileQuestion size={48} className="text-blue-400" strokeWidth={1.5} />
            </div>
          </div>

          {/* Error number */}
          <h1 className="text-7xl font-mono font-bold text-center text-white mb-2">
            404
          </h1>
          
          {/* Simple message */}
          <p className="text-center text-gray-400 mb-6 font-mono text-sm">
            Page not found
          </p>
          
          <p className="text-center text-gray-500 text-sm mb-8">
            The file you're looking for doesn't exist or has been moved.
          </p>

          {/* Simple back button */}
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all duration-200 border border-blue-500/20 font-mono text-sm"
          >
            <Home size={16} strokeWidth={1.5} />
            <span>Back to Introduction</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;