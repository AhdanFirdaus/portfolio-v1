import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SkillCard from './SkillCard';

const CategorySection = ({ category, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-[#0f1422] rounded-xl border border-blue-500/10 overflow-hidden animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Category Header - Clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-[#1a1f2e] transition-colors group"
      >
        <div className="flex items-center gap-3">
          {/* Category Icon */}
          <div className="p-2.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
            {category.icon}
          </div>
          
          <div className="text-left">
            <h2 className="text-lg font-mono font-semibold text-white group-hover:text-blue-400 transition-colors">
              {category.label}
            </h2>
          </div>
        </div>

        {/* Expand/Collapse Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 group-hover:text-blue-400 transition-colors">
            {isExpanded ? 'collapse' : 'expand'}
          </span>
          {isExpanded ? (
            <ChevronUp size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
          ) : (
            <ChevronDown size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
          )}
        </div>
      </button>

      {/* Skills Grid - Animated */}
      {isExpanded && (
        <div className="p-4 border-t border-blue-500/10 animate-slideDown">
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