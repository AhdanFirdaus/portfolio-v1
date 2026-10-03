'use client';

import { useState } from 'react';
import { Terminal, Briefcase } from 'lucide-react';
import ProjectCard from './ProjectCard';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 12;

export default function ProjectsClient({ projects }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 font-mono rounded-none">
      {/* Header */}
      <div className="relative border-b border-border-main pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-neutral-400 text-sm font-mono flex items-center gap-2 mt-2">
            <Terminal size={14} className="text-accent-red" />
            <span>$ a collection of things I’ve built</span>
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 bg-bg-card px-3 py-1.5 border border-border-main rounded-none">
          <Briefcase size={14} className="text-accent-red" />
          <span className="text-neutral-400">Total Projects:</span>
          <span className="text-white font-semibold">{projects.length}</span>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-16 px-4 bg-bg-card border border-border-main rounded-none space-y-3 font-mono">
          <p className="text-lg md:text-xl font-bold text-white">Oops, data masih kosong atau tidak terload</p>
          <p className="text-xs md:text-sm text-neutral-400">$ no projects found in Notion database</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {currentProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>

          {/* Pagination - Only appears if more than 12 projects */}
          {projects.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
