import StackIcon from 'tech-stack-icons';

const SkillCard = ({ skill, index }) => {
  const iconSlug = (skill.iconName || '').trim().toLowerCase();
  const hasIcon = Boolean(skill.icon || iconSlug);

  return (
    <div 
      className="group relative font-mono rounded-none"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative bg-bg-card p-4 border border-border-main group-hover:border-accent-red/40 transition-all duration-200 group-hover:-translate-y-0.5 flex items-center justify-between shadow-md rounded-none">
        <div className="flex items-center gap-3 min-w-0">
          {hasIcon && (
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              {skill.icon ? (
                skill.icon
              ) : (
                <StackIcon name={iconSlug} className="w-7 h-7" />
              )}
            </div>
          )}
          
          <div className="truncate">
            <h3 className="text-sm font-semibold text-white group-hover:text-accent-red transition-colors truncate">
              {skill.name}
            </h3>
          </div>
        </div>

        <div className="w-1.5 h-1.5 bg-neutral-700 group-hover:bg-accent-red transition-colors shrink-0 rounded-none ml-2" />
      </div>
    </div>
  );
};

export default SkillCard;