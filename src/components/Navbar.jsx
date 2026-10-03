'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronRight, 
  ChevronDown, 
  Menu,
  X,
  FolderClosed,
  FolderOpen,
  CircleDot
} from 'lucide-react';
import { navItems } from './NavItems';

const Navbar = () => {
  const pathname = usePathname();
  const [openFolders, setOpenFolders] = useState(['intro']);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredFolder, setHoveredFolder] = useState(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Auto open folder based on active path
  useEffect(() => {
    navItems.forEach(item => {
      if (item.type === 'folder' && item.children) {
        const hasActiveChild = item.children.some(child => {
          if (child.path === '/') return pathname === '/';
          return pathname.startsWith(child.path);
        });
        if (hasActiveChild && !openFolders.includes(item.id)) {
          setOpenFolders(prev => [...prev, item.id]);
        }
      }
    });
  }, [pathname, openFolders]);

  const toggleFolder = (folderId) => {
    setOpenFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderNavItem = (item, depth = 0) => {
    const isFolder = item.type === 'folder';
    const isOpen = openFolders.includes(item.id);
    const isHovered = hoveredFolder === item.id;
    const paddingLeft = depth * 16;

    if (isFolder) {
      return (
        <div key={item.id} className="select-none">
          <button
            onClick={() => toggleFolder(item.id)}
            onMouseEnter={() => setHoveredFolder(item.id)}
            onMouseLeave={() => setHoveredFolder(null)}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-neutral-300 hover:text-white transition-all duration-200 group relative cursor-pointer rounded-none"
            style={{ paddingLeft: `${paddingLeft + 12}px` }}
          >
            <span className="absolute left-0 w-0.5 h-0 bg-accent-red group-hover:h-full transition-all duration-200" />
            
            <span className="text-neutral-500 group-hover:text-accent-red transition-colors">
              {isOpen ? <ChevronDown size={14} strokeWidth={2} /> : <ChevronRight size={14} strokeWidth={2} />}
            </span>
            
            <span className="text-neutral-400 group-hover:text-accent-red transition-colors">
              {isOpen ? 
                <FolderOpen size={18} strokeWidth={1.5} className="text-accent-red" /> : 
                <FolderClosed size={18} strokeWidth={1.5} className={isHovered ? "text-accent-red" : "text-neutral-400"} />
              }
            </span>
            
            <span className="text-sm font-medium tracking-wide">{item.label}</span>
          </button>
          
          {isOpen && item.children && (
            <div className="animate-folderOpen">
              {item.children.map(child => renderNavItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);

    return (
      <Link
        key={item.id}
        href={item.path}
        onClick={closeMobileMenu}
        className={
          `w-full flex items-center gap-2 px-3 py-2.5 transition-all duration-200 group relative rounded-none ${
            isActive 
              ? 'text-accent-red bg-accent-red/10 font-medium' 
              : 'text-neutral-300 hover:text-white hover:bg-accent-red/5'
          }`
        }
        style={{ paddingLeft: `${paddingLeft + 44}px` }}
      >
        <span className={`absolute left-0 w-0.5 transition-all duration-200 ${
          isActive ? 'bg-accent-red h-full' : 'bg-accent-red h-0 group-hover:h-full'
        }`} />
        
        <span className="transition-colors">
          {item.icon}
        </span>
        <span className="text-sm tracking-wide">{item.label}</span>
        
        {isActive && (
          <span className="absolute right-3 w-1.5 h-1.5 bg-accent-red rounded-none" />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 right-4 z-[100] p-2.5 bg-bg-main border border-border-main rounded-none text-accent-red hover:text-white transition-all duration-200 shadow-xl cursor-pointer"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X size={20} strokeWidth={1.5} />
        ) : (
          <Menu size={20} strokeWidth={1.5} />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-[90]"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-bg-main border-r border-border-main
          transform transition-all duration-300 ease-out z-[95]
          ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto custom-scrollbar
          flex flex-col font-mono rounded-none
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-bg-main border-b border-border-main p-3.5 z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-none bg-neutral-700"></span>
              <span className="w-2.5 h-2.5 rounded-none bg-neutral-700"></span>
              <span className="w-2.5 h-2.5 rounded-none bg-accent-red"></span>
            </div>
          </div>
        </div>

        {/* Explorer Label */}
        <div className="px-3.5 py-2.5 text-[11px] font-mono font-semibold text-accent-red uppercase tracking-widest border-b border-border-main flex items-center gap-2">
          <span className="w-0.5 h-3 bg-accent-red"></span>
          EXPLORER
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-2">
          {navItems.map(item => renderNavItem(item))}
        </nav>

        {/* Footer */}
        <div className="bg-bg-main border-t border-border-main p-3 text-xs font-mono">
          <div className="flex items-center justify-between text-neutral-400">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent-red"></span>
                <span className="text-neutral-300">Dadan</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-red font-medium">UTF-8</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;