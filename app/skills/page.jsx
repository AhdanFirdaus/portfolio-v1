import { Terminal, Layers } from 'lucide-react';
import { skillsData } from '../../src/components/data/SkillsData';
import CategorySection from '../../src/components/CategorySection';
import Footer from '../../src/components/Footer';

export const metadata = {
  title: 'Skills & Technologies',
  description: 'Technical skills, frameworks, tools, and cybersecurity capabilities of Ahdan Firdaus.',
};

export default function SkillsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-md border border-blue-500/20">
            <Layers size={26} className="text-blue-400" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-2 tracking-tight">
              Skills & Technologies
            </h1>
            <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
              <Terminal size={14} className="text-blue-400" />
              <span>$ skills I use to build real-world projects</span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 bg-[#0d121f] px-3 py-1.5 rounded-md border border-blue-500/20">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
          <span className="text-gray-400">Total Skills:</span>
          <span className="text-white font-semibold">
            {skillsData.categories.reduce((acc, cat) => acc + cat.skills.length, 0)}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-[#0d121f] px-3 py-1.5 rounded-md border border-blue-500/20">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
          <span className="text-gray-400">Categories:</span>
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

      <Footer/>
    </div>
  );
}
