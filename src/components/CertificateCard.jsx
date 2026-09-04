import { Calendar, Building, ExternalLink } from 'lucide-react';

const CertificateCard = ({ item, index, type }) => {
  return (
    <div 
      className="group relative animate-fadeIn font-mono rounded-none"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative bg-bg-card border border-border-main overflow-hidden hover:border-accent-red/50 transition-all duration-200 hover:-translate-y-0.5 h-full flex flex-col justify-between p-5 rounded-none shadow-xl">
        <div>
          <h3 className="text-base font-mono font-bold text-white group-hover:text-accent-red transition-colors mb-3 leading-snug">
            {item.title}
          </h3>

          <div className="space-y-1.5 mb-4 font-mono">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Building size={13} className="text-accent-red shrink-0" />
              <span className="truncate">{item.issuer}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Calendar size={13} className="text-accent-red shrink-0" />
              <span>{item.date}</span>
            </div>
          </div>

          <p className="text-xs font-mono text-neutral-400 mb-4 leading-relaxed">
            {item.description}
          </p>
        </div>

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 bg-bg-hover hover:bg-accent-red/15 border border-border-main hover:border-accent-red/40 text-neutral-300 hover:text-accent-red transition-all text-xs font-mono w-full justify-center group/btn rounded-none cursor-pointer"
        >
          <span>View Certificate</span>
          <ExternalLink size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default CertificateCard;