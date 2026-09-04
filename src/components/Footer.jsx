export default function Footer({ name = "dadan", year = new Date().getFullYear() }) {
  return (
    <footer className="w-full text-center text-xs font-mono text-neutral-400 pt-6 pb-2 border-t border-border-main mt-auto rounded-none">
      <div className="flex items-center justify-center gap-2">
        <span>fueled by <span className="text-sm">☕</span> & code by <span className="text-accent-red font-semibold">{name}</span> © {year}</span>
      </div>
    </footer>
  );
}