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

  // Auto open folder berdasarkan path aktif
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
            className="w-full flex items-center gap-2 px-3 py-2.5 text-gray-300 hover:text-white transition-all duration-200 group relative"
            style={{ paddingLeft: `${paddingLeft + 12}px` }}
          >
            <span className="absolute left-0 w-0.5 h-0 bg-blue-400 group-hover:h-full transition-all duration-200" />
            
            <span className="text-gray-500 group-hover:text-blue-400 transition-colors">
              {isOpen ? <ChevronDown size={14} strokeWidth={2} /> : <ChevronRight size={14} strokeWidth={2} />}
            </span>
            
            <span className="text-gray-400 group-hover:text-blue-400 transition-colors">
              {isOpen ? 
                <FolderOpen size={18} strokeWidth={1.5} className="text-blue-400" /> : 
                <FolderClosed size={18} strokeWidth={1.5} className={isHovered ? "text-blue-400" : "text-gray-400"} />
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

    // Untuk file item
    const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);

    return (
      <Link
        key={item.id}
        href={item.path}
        onClick={closeMobileMenu}
        className={
          `w-full flex items-center gap-2 px-3 py-2.5 transition-all duration-200 group relative ${
            isActive 
              ? 'text-blue-400 bg-blue-500/10 font-medium' 
              : 'text-gray-300 hover:text-white hover:bg-blue-500/5'
          }`
        }
        style={{ paddingLeft: `${paddingLeft + 44}px` }}
      >
        <span className={`absolute left-0 w-0.5 transition-all duration-200 ${
          isActive ? 'bg-blue-400 h-full' : 'bg-blue-400 h-0 group-hover:h-full'
        }`} />
        
        <span className="transition-colors">
          {item.icon}
        </span>
        <span className="text-sm tracking-wide">{item.label}</span>
        
        {isActive && (
          <span className="absolute right-3 w-1.5 h-1.5 bg-blue-400 rounded-full" />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 right-4 z-[100] p-2.5 bg-[#0e1320] border border-blue-500/20 rounded-md text-blue-400 hover:text-blue-300 transition-all duration-200 shadow-lg"
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
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-[#090d16] border-r border-blue-500/15
          transform transition-all duration-300 ease-out z-[95]
          ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto custom-scrollbar
          flex flex-col
        `}
      >
        {/* Header dengan VSCode style */}
        <div className="sticky top-0 bg-[#090d16] border-b border-blue-500/15 p-3.5 z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <div className="flex items-center gap-2">
              <CircleDot className="text-blue-400" size={16} strokeWidth={1.5} />
              <span className="text-xs font-mono text-gray-400">portfolio</span>
            </div>
          </div>
        </div>

        {/* Explorer Label */}
        <div className="px-3.5 py-2.5 text-[11px] font-mono font-semibold text-blue-400/90 uppercase tracking-widest border-b border-blue-500/10 flex items-center gap-2">
          <span className="w-0.5 h-3 bg-blue-400 rounded-full"></span>
          EXPLORER
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-2">
          {navItems.map(item => renderNavItem(item))}
        </nav>

        {/* Footer */}
        <div className="bg-[#090d16] border-t border-blue-500/15 p-3 text-xs font-mono">
          <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-gray-400">Ready</span>
              </div>
              <span className="text-gray-700">|</span>
              <span className="text-gray-400">v1.0.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400/80 font-medium">UTF-8</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;