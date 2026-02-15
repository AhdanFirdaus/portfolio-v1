import { FolderKanban, Terminal, Briefcase } from 'lucide-react';
import { projectsData } from '../components/data/ProjectsData';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

const Projects = () => {
  return (
    <div className="space-y-8">
      {/* Path navigasi */}
      <div className="flex items-center gap-2 text-sm font-mono text-gray-500 border-b border-blue-500/10 pb-4">
        <span className="text-blue-400">~/portfolio</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">My Work</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Projects</span>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-transparent to-transparent blur-3xl -z-10" />
        
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <FolderKanban size={28} className="text-blue-400" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">
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
        <div className="flex items-center gap-2 bg-[#0f1422] px-3 py-1.5 rounded-full border border-blue-500/20">
          <Briefcase size={14} className="text-blue-400" />
          <span className="text-gray-300">Total Projects:</span>
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


      {/* Add custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                    }
                    }
                    
                    .animate-fadeIn {
                        animation: fadeIn 0.5s ease-out forwards;
                        }
                        `}</style>
        <Footer/>
    </div>
  );
};

export default Projects;