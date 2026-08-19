import { Calendar, Building, ExternalLink } from 'lucide-react';

const CertificateCard = ({ item, index, type }) => {
  return (
    <div 
      className="group relative animate-fadeIn"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/15 to-indigo-600/15 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Card */}
      <div className="relative bg-[#0d121f] rounded-lg border border-blue-500/15 overflow-hidden hover:border-blue-400/35 transition-all duration-200 hover:-translate-y-0.5 h-full flex flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            {/* Type badge */}
            <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md font-medium ${
              type === 'award'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}>
              {type === 'award' ? 'Award' : 'Completion'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-mono font-semibold text-white group-hover:text-blue-400 transition-colors mb-3 line-clamp-2 leading-snug">
            {item.title}
          </h3>

          {/* Issuer and Date */}
          <div className="space-y-1.5 mb-4 font-mono">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Building size={13} className="text-blue-400 shrink-0" />
              <span className="truncate">{item.issuer}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Calendar size={13} className="text-blue-400 shrink-0" />
              <span>{item.date}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs font-mono text-gray-400 mb-4 leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* View Button */}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-md text-blue-400 hover:text-blue-300 transition-all text-xs font-mono w-full justify-center group/btn"
        >
          <span>View Certificate</span>
          <ExternalLink size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default CertificateCard;