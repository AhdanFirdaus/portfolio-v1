'use client';

import { useState } from 'react';
import { Calendar, ExternalLink, ImageOff } from 'lucide-react';
import ProjectModal from './ProjectModal';

const ProjectCard = ({ project, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div 
        className="group relative animate-fadeIn font-mono rounded-none"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative bg-bg-card border border-border-main overflow-hidden hover:border-accent-red/50 transition-all duration-300 hover:-translate-y-1 shadow-xl rounded-none">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden bg-bg-main border-b border-border-main rounded-none">
            {project?.image && !imageError ? (
              <img
                src={project.image}
                alt={project.title || 'Project'}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-none"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-bg-main/80 p-4 text-center space-y-1.5 font-mono">
                <ImageOff size={28} className="text-accent-red/70" />
                <span className="text-xs font-mono text-neutral-300 font-semibold">Oops, image not available</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="text-lg font-mono font-bold text-white group-hover:text-accent-red transition-colors line-clamp-1">
                {project?.title || 'Oops, title unavailable'}
              </h3>
              <div className="flex items-center gap-1 text-xs text-neutral-400 shrink-0">
                <Calendar size={12} className="text-accent-red" />
                <span>{project?.date?.split(' ')[0] || 'N/A'}</span>
              </div>
            </div>

            <p className="text-sm font-sans text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
              {project?.shortDesc || 'Oops, data deskripsi tidak terload'}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack?.slice(0, 3).map((tech, i) => (
                <span 
                  key={i}
                  className="px-2.5 py-0.5 bg-bg-hover text-accent-red text-[11px] border border-border-main font-bold rounded-none"
                >
                  {tech.name}
                </span>
              ))}
              {project.techStack?.length > 3 && (
                <span className="px-2 py-0.5 bg-bg-hover text-neutral-400 text-[11px] border border-border-main rounded-none">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2 bg-bg-hover hover:bg-accent-red/15 border border-border-main hover:border-accent-red/40 text-neutral-300 hover:text-accent-red transition-all text-xs font-mono flex items-center justify-center gap-2 group/btn cursor-pointer rounded-none"
            >
              <span>View Details</span>
              <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
      />
    </>
  );
};

export default ProjectCard;