const SkillCard = ({ skill, index }) => {
  return (
    <div 
      className="group relative"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card */}
      <div className="relative bg-[#1a1f2e] p-4 rounded-xl border border-blue-500/10 group-hover:border-blue-400/30 transition-all duration-300 group-hover:translate-y-[-2px]">
        <div className="flex items-center gap-3">
          {/* Skill icon */}
          {skill.icon}
          
          {/* Skill name */}
          <div>
            <h3 className="text-sm font-mono font-medium text-white group-hover:text-blue-400 transition-colors">
              {skill.name}
            </h3>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-2 right-2 w-1 h-1 bg-blue-400/30 rounded-full group-hover:bg-blue-400 transition-colors" />
      </div>
    </div>
  );
};

export default SkillCard;