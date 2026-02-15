import { 
  X, 
  Calendar, 
  User, 
  Briefcase, 
  Code2, 
  Globe, 
  Github,
  ExternalLink,
  List,
  Clock
} from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#0f1422] rounded-2xl border border-blue-500/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar animate-modalSlide">
        {/* Header with close button */}
        <div className="sticky top-0 bg-[#0f1422] border-b border-blue-500/10 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="text-sm font-mono text-gray-400 ml-2">
              {project.title}.md
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400 hover:text-blue-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="relative h-64 rounded-xl overflow-hidden bg-linear-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/20">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-12 gap-1 opacity-20">
                  {[...Array(144)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-blue-400/30 rounded-sm" />
                  ))}
                </div>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0f1422] via-transparent to-transparent" />
          </div>

          {/* Title and Links */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-mono font-bold text-white mb-2">
                {project.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar size={14} className="text-blue-400" />
                  <span>{project.date}</span>
                </div>
                <span className="text-gray-700">|</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <Briefcase size={14} className="text-blue-400" />
                  <span>{project.projectType}</span>
                </div>
                <span className="text-gray-700">|</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <User size={14} className="text-blue-400" />
                  <span>{project.role}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#1a1f2e] hover:bg-[#242937] border border-blue-500/20 rounded-lg text-gray-300 hover:text-white transition-all"
                >
                  <Github size={16} />
                  <span className="text-sm">Source Code</span>
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-blue-400 hover:text-blue-300 transition-all"
                >
                  <Globe size={16} />
                  <span className="text-sm">Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#1a1f2e] p-5 rounded-xl border border-blue-500/10">
            <p className="text-gray-300 text-sm leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Details List */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <List size={16} className="text-blue-400" />
              <h3 className="text-sm font-mono font-semibold text-white">Key Features</h3>
            </div>
            <ul className="space-y-2">
              {project.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code2 size={16} className="text-blue-400" />
              <h3 className="text-sm font-mono font-semibold text-white">Technology Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20"
                >
                  <span className="text-xs text-gray-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-blue-500/10 text-center text-[10px] font-mono text-gray-400">
            <span className="text-blue-400/50">❯</span> project details • {project.date}{' '}
            <span className="text-blue-400/50">❮</span>
          </div>
        </div>
      </div>

      {/* Add custom CSS for modal animation */}
      <style jsx>{`
        @keyframes modalSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-modalSlide {
          animation: modalSlide 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;