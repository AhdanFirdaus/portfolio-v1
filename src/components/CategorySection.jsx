'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Code2, Server, Database, Shield, Wrench, Layers } from 'lucide-react';
import SkillCard from './SkillCard';

function getCategoryIcon(label) {
  const clean = (label || '').toLowerCase();
  if (clean.includes('front')) return <Code2 className="text-accent-red" size={20} strokeWidth={1.5} />;
  if (clean.includes('back')) return <Server className="text-accent-red" size={20} strokeWidth={1.5} />;
  if (clean.includes('data')) return <Database className="text-accent-red" size={20} strokeWidth={1.5} />;
  if (clean.includes('cyber') || clean.includes('sec')) return <Shield className="text-accent-red" size={20} strokeWidth={1.5} />;
  if (clean.includes('tool') || clean.includes('dev')) return <Wrench className="text-accent-red" size={20} strokeWidth={1.5} />;
  return <Layers className="text-accent-red" size={20} strokeWidth={1.5} />;
}

const CategorySection = ({ category, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-bg-card border border-border-main overflow-hidden animate-fadeIn font-mono rounded-none"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-bg-hover transition-colors group cursor-pointer rounded-none"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-bg-hover border border-border-main group-hover:border-accent-red/30 transition-colors rounded-none">
            {category.icon || getCategoryIcon(category.label)}
          </div>
          
          <div className="text-left">
            <h2 className="text-base font-semibold text-white group-hover:text-accent-red transition-colors tracking-tight">
              {category.label}
            </h2>
            <p className="text-[11px] text-neutral-500 font-mono">
              {category.skills.length} skills
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 group-hover:text-accent-red transition-colors">
            {isExpanded ? 'collapse' : 'expand'}
          </span>
          {isExpanded ? (
            <ChevronUp size={18} className="text-neutral-400 group-hover:text-accent-red transition-colors" />
          ) : (
            <ChevronDown size={18} className="text-neutral-400 group-hover:text-accent-red transition-colors" />
          )}
        </div>
      </button>

      {/* Skills Grid */}
      {isExpanded && (
        <div className="p-4 border-t border-border-main bg-bg-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {category.skills.map((skill, skillIndex) => (
              <SkillCard 
                key={skill.name} 
                skill={skill} 
                index={skillIndex}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySection;