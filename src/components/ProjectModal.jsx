'use client';

import { useState } from 'react';
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
  ImageOff
} from 'lucide-react';

const renderFormattedDesc = (text) => {
  if (!text) return null;

  const lines = text.split('\n');
  const blocks = [];
  let currentList = [];
  let isNumbered = false;

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({
        type: isNumbered ? 'ol' : 'ul',
        items: [...currentList]
      });
      currentList = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    const bulletMatch = trimmed.match(/^[-*•]\s+(.*)/);
    const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)/);

    if (bulletMatch) {
      if (isNumbered) flushList();
      isNumbered = false;
      currentList.push(bulletMatch[1]);
    } else if (numberMatch) {
      if (!isNumbered) flushList();
      isNumbered = true;
      currentList.push(numberMatch[2]);
    } else {
      flushList();
      blocks.push({ type: 'p', content: trimmed });
    }
  });

  flushList();

  return (
    <div className="space-y-3">
      {blocks.map((block, idx) => {
        if (block.type === 'ul') {
          return (
            <ul key={idx} className="space-y-1.5 pl-1 my-2 font-mono">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-accent-red mt-0.5 font-mono">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'ol') {
          return (
            <ol key={idx} className="space-y-1.5 pl-1 my-2 font-mono">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-accent-red font-mono text-xs font-bold shrink-0">{itemIdx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={idx} className="text-neutral-300 text-sm leading-relaxed font-sans">
            {block.content}
          </p>
        );
      })}
    </div>
  );
};

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 font-mono rounded-none">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-bg-card border border-border-main max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar animate-modalSlide rounded-none shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-bg-card border-b border-border-main p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-neutral-600"></span>
              <span className="w-2.5 h-2.5 bg-neutral-600"></span>
              <span className="w-2.5 h-2.5 bg-accent-red"></span>
            </div>
            <span className="text-sm font-mono text-neutral-300 ml-2">
              {project.title || 'project'}.md
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-bg-hover transition-colors rounded-none cursor-pointer"
          >
            <X size={20} className="text-neutral-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="relative h-64 overflow-hidden bg-bg-main border border-border-main rounded-none">
            {project.image && !imageError ? (
              <img
                src={project.image}
                alt={project.title || 'Project'}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105 rounded-none"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-main/80 p-4 text-center space-y-2 border border-border-main font-mono">
                <ImageOff size={36} className="text-accent-red/70" />
                <span className="text-sm font-mono text-neutral-300 font-semibold">Oops, image not available</span>
              </div>
            )}
          </div>

          {/* Title and Links */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-mono font-bold text-white mb-2">
                {project.title || 'Oops, title unavailable'}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1 text-neutral-400">
                  <Calendar size={14} className="text-accent-red" />
                  <span>{project.date || 'N/A'}</span>
                </div>
                <span className="text-neutral-700">|</span>
                <div className="flex items-center gap-1 text-neutral-400">
                  <Briefcase size={14} className="text-accent-red" />
                  <span>{project.projectType || 'Individual'}</span>
                </div>
                <span className="text-neutral-700">|</span>
                <div className="flex items-center gap-1 text-neutral-400">
                  <User size={14} className="text-accent-red" />
                  <span>{project.role || 'Developer'}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-bg-hover hover:bg-border-main border border-border-main text-neutral-300 hover:text-white transition-all rounded-none"
                >
                  <Github size={16} />
                  <span className="text-sm">Source Code</span>
                </a>
              )}
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-accent-red/15 hover:bg-accent-red/25 border border-accent-red/40 text-accent-red hover:text-white transition-all rounded-none"
                >
                  <Globe size={16} />
                  <span className="text-sm">Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-bg-hover p-5 border border-border-main rounded-none">
            {project?.fullDesc ? (
              renderFormattedDesc(project.fullDesc)
            ) : (
              <p className="text-neutral-400 text-sm font-mono leading-relaxed">
                $ Oops, deskripsi lengkap tidak terload
              </p>
            )}
          </div>

          {/* Details List */}
          {project.details && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <List size={16} className="text-accent-red" />
                <h3 className="text-sm font-mono font-semibold text-white">Key Features</h3>
              </div>
              <ul className="space-y-2">
                {project.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-neutral-400 font-sans">
                    <span className="text-accent-red mt-1 font-mono">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack */}
          {project.techStack && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={16} className="text-accent-red" />
                <h3 className="text-sm font-mono font-semibold text-white">Technology Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-hover text-accent-red border border-border-main text-xs rounded-none font-bold"
                  >
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-border-main text-center text-[10px] font-mono text-neutral-500">
            <span className="text-accent-red">❯</span> project details • {project.date}{' '}
            <span className="text-accent-red">❮</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;