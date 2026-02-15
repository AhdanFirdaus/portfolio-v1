import { Calendar, Building, ExternalLink } from 'lucide-react';

const CertificateCard = ({ item, index, type }) => {
  return (
    <div 
      className="group relative animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card */}
      <div className="relative bg-[#0f1422] rounded-2xl border border-blue-500/10 overflow-hidden hover:border-blue-400/30 transition-all duration-300 hover:-translate-y-1 h-full">
        {/* Header dengan icon */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            {/* Type badge */}
            <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${
              type === 'award'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}>
              {type === 'award' ? 'Award' : 'Completion'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-mono font-semibold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
            {item.title}
          </h3>

          {/* Issuer and Date */}
          <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Building size={14} className="text-blue-400 shrink-0" />
              <span className="truncate">{item.issuer}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Calendar size={14} className="text-blue-400 shrink-0" />
              <span>{item.date}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 mb-4">
            {item.description}
          </p>

          {/* View Button */}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 transition-all text-sm font-mono w-full justify-center group/btn"
          >
            <span>View Certificate</span>
            <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Decorative corner */}
        <div className={`absolute top-0 right-0 w-16 h-16 bg-linear-to-br ${
          type === 'award'
            ? 'from-amber-500/10 to-transparent'
            : 'from-emerald-500/10 to-transparent'
        } rounded-bl-[100%]`} />
      </div>
    </div>
  );
};

export default CertificateCard;