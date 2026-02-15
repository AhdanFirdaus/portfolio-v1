import { useState } from 'react';
import { Calendar, ExternalLink, Github, Eye, Clock } from 'lucide-react';
import ProjectModal from './ProjectModal';

const ProjectCard = ({ project, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="group relative animate-fadeIn"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Hover effect background */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Card */}
        <div className="relative bg-[#0f1422] rounded-2xl border border-blue-500/10 overflow-hidden hover:border-blue-400/30 transition-all duration-300 hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden bg-linear-to-br from-blue-500/10 to-blue-600/10">
            <div className="absolute inset-0 bg-linear-to-t from-[#0f1422] via-transparent to-transparent z-10" />
            
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1 opacity-20">
                    {[...Array(64)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-blue-400/30 rounded-sm" />
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title and Date */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="text-lg font-mono font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                {project.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                <Calendar size={12} />
                <span>{project.date.split(' ')[0]}</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-gray-400 mb-4">
              {project.shortDesc}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.slice(0, 3).map((tech, i) => (
                <span 
                  key={i}
                  className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] rounded-full border border-blue-500/20"
                >
                  {tech.name}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] rounded-full border border-blue-500/20">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>

            {/* View Details Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 transition-all text-sm font-mono flex items-center justify-center gap-2 group/btn"
            >
              <span>View Details</span>
              <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
      />
    </>
  );
};

export default ProjectCard;