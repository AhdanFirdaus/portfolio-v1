import { FolderKanban, Terminal, Briefcase } from 'lucide-react';
import { projectsData } from '../../src/components/data/ProjectsData';
import ProjectCard from '../../src/components/ProjectCard';
import Footer from '../../src/components/Footer';

export const metadata = {
  title: 'Projects',
  description: 'Showcase of web application and cybersecurity projects built by Ahdan Firdaus.',
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-md border border-blue-500/20">
            <FolderKanban size={26} className="text-blue-400" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-2 tracking-tight">
              Projects
            </h1>
            <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
              <Terminal size={14} className="text-blue-400" />
              <span>$ a collection of things I’ve built</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 bg-[#0d121f] px-3 py-1.5 rounded-md border border-blue-500/20">
          <Briefcase size={14} className="text-blue-400" />
          <span className="text-gray-400">Total Projects:</span>
          <span className="text-white font-semibold">{projectsData.length}</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projectsData.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
          />
        ))}
      </div>

      <Footer/>
    </div>
  );
}
