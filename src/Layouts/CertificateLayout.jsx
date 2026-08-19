import { Terminal, Award, BadgeCheck } from 'lucide-react';
import CertificateCard from '../components/CertificateCard';
import Footer from '../components/Footer';

const CertificateLayout = ({ title, icon: Icon, data, type }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-md ${
            type === 'awardings' 
              ? 'bg-amber-500/10 border border-amber-500/20' 
              : 'bg-emerald-500/10 border border-emerald-500/20'
          }`}>
            <Icon size={26} className={
              type === 'awardings' ? 'text-amber-400' : 'text-emerald-400'
            } strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-2 tracking-tight">
              {title}
            </h1>
            <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
              <Terminal size={14} className="text-blue-400" />
              <span>$ things I’ve earned along the way</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md border ${
          type === 'awardings'
            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
        }`}>
          {type === 'awardings' ? <Award size={14} /> : <BadgeCheck size={14} />}
          <span className="text-gray-400">Total:</span>
          <span className="text-white font-semibold">{data.length}</span>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data.map((item, index) => (
          <CertificateCard 
            key={item.id} 
            item={item} 
            index={index}
            type={type === 'awardings' ? 'award' : 'completion'}
          />
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12 bg-[#0d121f] rounded-lg border border-blue-500/15">
          <div className={`p-4 rounded-full inline-block mb-4 ${
            type === 'awardings' 
              ? 'bg-amber-500/10' 
              : 'bg-emerald-500/10'
          }`}>
            {type === 'awardings' 
              ? <Award size={40} className="text-amber-400/50" />
              : <BadgeCheck size={40} className="text-emerald-400/50" />
            }
          </div>
          <p className="text-gray-400 font-mono text-sm mb-2">No certificates found</p>
          <p className="text-gray-600 text-xs font-mono">Check back later for updates</p>
        </div>
      )}

      <Footer/>
    </div>
  );
};

export default CertificateLayout;