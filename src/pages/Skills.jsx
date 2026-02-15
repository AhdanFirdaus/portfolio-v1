import { Terminal, Layers } from 'lucide-react';
import { skillsData } from '../components/data/SkillsData';
import CategorySection from '../components/CategorySection';
import Footer from '../components/Footer';

const Skills = () => {
  return (
    <div className="space-y-8">
      {/* Path navigasi */}
      <div className="flex items-center gap-2 text-sm font-mono text-gray-500 border-b border-blue-500/10 pb-4">
        <span className="text-blue-400">~/portfolio</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Skills</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Technologies</span>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-transparent to-transparent blur-3xl -z-10" />
        
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Layers size={28} className="text-blue-400" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">
              Skills & Technologies
            </h1>
            <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
              <Terminal size={14} className="text-blue-400" />
              <span>$ skills I use to build real-world projects</span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats - Simple */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 bg-[#0f1422] px-3 py-1.5 rounded-full border border-blue-500/20">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
          <span className="text-gray-300">Total Skills:</span>
          <span className="text-white font-semibold">
            {skillsData.categories.reduce((acc, cat) => acc + cat.skills.length, 0)}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-[#0f1422] px-3 py-1.5 rounded-full border border-blue-500/20">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
          <span className="text-gray-300">Categories:</span>
          <span className="text-white font-semibold">
            {skillsData.categories.length}
          </span>
        </div>
      </div>

      {/* Skills Categories */}
      <div className="space-y-4 mt-6">
        {skillsData.categories.map((category, index) => (
          <CategorySection 
            key={category.id} 
            category={category} 
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
                        
                        @keyframes slideDown {
                            from {
                                opacity: 0;
                                transform: translateY(-10px);
                                }
                                to {
                                    opacity: 1;
                                    transform: translateY(0);
                                    }
                                    }
                                    
                                    .animate-slideDown {
                                        animation: slideDown 0.3s ease-out;
                                        }
                                        `}</style>
    <Footer/>
    </div>
  );
};

export default Skills;