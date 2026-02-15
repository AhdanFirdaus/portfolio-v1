import { 
  Rocket,
  Code2,
  FolderClosed,
  GraduationCap,
  Trophy,
  BadgeCheck,
  Mail,
  Terminal,
  FileCode
} from 'lucide-react';

export const navItems = [
  {
    id: 'intro',
    label: 'Introduction    ',
    icon: <Rocket className="text-blue-400" size={18} strokeWidth={1.5} />,
    type: 'folder',
    children: [
      {
        id: 'about-me',
        label: 'About Me',
        icon: <Terminal className="text-blue-300" size={16} strokeWidth={1.5} />,
        type: 'file',
        path: '/'
      }
    ]
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: <FolderClosed className="text-blue-400" size={18} strokeWidth={1.5} />,
    type: 'folder',
    children: [
      {
        id: 'technologies',
        label: 'Technologies',
        icon: <Code2 className="text-blue-300" size={16} strokeWidth={1.5} />,
        type: 'file',
        path: '/skills'
      }
    ]
  },
  {
    id: 'my-work',
    label: 'My Work',
    icon: <FolderClosed className="text-blue-400" size={18} strokeWidth={1.5} />,
    type: 'folder',
    children: [
      {
        id: 'projects-list',
        label: 'Projects',
        icon: <FileCode className="text-blue-300" size={16} strokeWidth={1.5} />,
        type: 'file',
        path: '/projects'
      }
    ]
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: <GraduationCap className="text-blue-400" size={18} strokeWidth={1.5} />,
    type: 'folder',
    children: [
      {
        id: 'awardings',
        label: 'Awardings',
        icon: <Trophy className="text-amber-400" size={16} strokeWidth={1.5} />,
        type: 'file',
        path: '/achievements/awardings'
      },
      {
        id: 'completions',
        label: 'Completions',
        icon: <BadgeCheck className="text-emerald-400" size={16} strokeWidth={1.5} />,
        type: 'file',
        path: '/achievements/completions'
      }
    ]
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: <Mail className="text-blue-400" size={18} strokeWidth={1.5} />,
    type: 'file',
    path: '/contacts'
  }
];