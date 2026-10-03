import { Terminal } from 'lucide-react';
import CategorySection from '../../src/components/CategorySection';
import { getSkills } from '../../lib/notion';

export const metadata = {
  title: 'Skills & Technologies',
  description: 'Technical skills, frontend frameworks, tools, and cybersecurity capabilities of Muhammad Ahdan Firdaus (dadan).',
  keywords: ['Skills', 'Technologies', 'Frontend', 'React', 'Next.js', 'Cybersecurity', 'SIJA', 'dadan'],
  alternates: {
    canonical: '/skills',
  },
};

export const revalidate = 10; // Auto-revalidate Notion data every 10s

export default async function SkillsPage() {
  const skillsData = await getSkills();

  return (
    <div className="space-y-8 font-mono rounded-none">
      {/* Header */}
      <div className="relative border-b border-border-main pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
            Skills & Technologies
          </h1>
          <p className="text-neutral-400 text-sm font-mono flex items-center gap-2 mt-2">
            <Terminal size={14} className="text-accent-red" />
            <span>$ skills I use to build real-world projects</span>
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 bg-bg-card px-3 py-1.5 border border-border-main rounded-none">
          <span className="w-1.5 h-1.5 bg-accent-red"></span>
          <span className="text-neutral-400">Total Skills:</span>
          <span className="text-white font-semibold">
            {skillsData.categories.reduce((acc, cat) => acc + cat.skills.length, 0)}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-bg-card px-3 py-1.5 border border-border-main rounded-none">
          <span className="w-1.5 h-1.5 bg-accent-red"></span>
          <span className="text-neutral-400">Categories:</span>
          <span className="text-white font-semibold">
            {skillsData.categories.length}
          </span>
        </div>
      </div>

      {/* Skills Categories */}
      {(!skillsData || !skillsData.categories || skillsData.categories.length === 0) ? (
        <div className="text-center py-16 px-4 bg-bg-card border border-border-main rounded-none space-y-3 font-mono">
          <p className="text-lg md:text-xl font-bold text-white">Oops, data masih kosong atau tidak terload</p>
          <p className="text-xs md:text-sm text-neutral-400">$ no skills found in Notion database</p>
        </div>
      ) : (
        <div className="space-y-4 mt-6">
          {skillsData.categories.map((category, index) => (
            <CategorySection 
              key={category.id} 
              category={category} 
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
