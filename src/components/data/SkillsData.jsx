import { 
  Code2, 
  Server, 
  Database, 
  Shield, 
  Container,
  Wifi,
  Crosshair,
  FileDigit,
  Wrench,
  Braces,
} from 'lucide-react';

import StackIcon from "tech-stack-icons";

export const skillsData = {
  categories: [
    {
      id: 'frontend',
      label: 'Frontend Framework',
      icon: <Code2 className="text-blue-400" size={20} strokeWidth={1.5} />,
      skills: [
        {
          name: 'React.js',
          icon: <StackIcon name="react" className='w-7' />,
        },
        {
          name: 'Next.js',
          icon: <StackIcon name="nextjs" className='w-7' variant="dark"/>,
        },
        {
          name: 'TailwindCSS',
          icon: <StackIcon name="tailwindcss" className='w-7'/>,
        }
      ]
    },
    {
      id: 'backend',
      label: 'Backend Framework',
      icon: <Server className="text-blue-400" size={20} strokeWidth={1.5} />,
      skills: [
        {
          name: 'Laravel',
          icon: <StackIcon name="laravel" className='w-7'/>,
        },
        {
          name: 'Node.js',
          icon: <StackIcon name="nodejs" className='w-7'/>,
        },
        {
          name: 'Express.js',
          icon: <StackIcon name="expressjs" className='w-7' variant="dark"/>,
        },
      ]
    },
    {
      id: 'database',
      label: 'Database',
      icon: <Database className="text-blue-400" size={20} strokeWidth={1.5} />,
      skills: [
        {
          name: 'MySQL',
          icon: <StackIcon name="mysql" className='w-7'/>,
        },
        {
          name: 'PostgreSQL',
          icon: <StackIcon name="postgresql" className='w-7'/>,
        },
        {
          name: 'MongoDB',
          icon: <StackIcon name="mongodb" className='w-7'/>,
        },
        {
          name: 'Firebase',
          icon: <StackIcon name="firebase" className='w-7'/>,
        },
        {
          name: 'Supabase',
          icon: <StackIcon name="supabase" className='w-7'/>,
        },
      ]
    },
    {
      id: 'devops',
      label: 'DevOps',
      icon: <Container className="text-blue-400" size={20} strokeWidth={1.5} />,
      skills: [
        {
          name: 'Docker',
          icon: <StackIcon name="docker" className='w-7'/>,
        },
        {
          name: 'Git/GitHub',
          icon: <StackIcon name="git" className='w-7'/>,
        },
      ]
    },
    {
      id: 'tools',
      label: 'Tools',
      icon: <Wrench className="text-blue-400" size={20} strokeWidth={1.5} />,
      skills: [
        {
          name: 'VsCode',
          icon: <StackIcon name="vscode" className='w-7'/>,
        },
        {
          name: 'Postman',
          icon: <StackIcon name="postman" className='w-7'/>,
        },
      ]
    },
      {
      id: 'cybersecurity',
      label: 'Cybersecurity',
      icon: <Shield className="text-blue-400" size={20} strokeWidth={1.5} />,
      skills: [
        {
          name: 'Web Exploitation',
          icon: <Crosshair className="text-blue-400" size={18} strokeWidth={1.5} />,
        },
        {
          name: 'DFIR',
          icon: <FileDigit className="text-blue-400" size={18} strokeWidth={1.5} />,
        },
      ]
    },
    {
      id: 'language',
      label: 'Language',
      icon: <Braces className="text-blue-400" size={20} strokeWidth={1.5} />,
      skills: [
        {
          name: 'Javascript',
          icon: <StackIcon name="js" className='w-7'/>,
        },
        {
          name: 'PHP',
          icon: <StackIcon name="php" className='w-7'/>,
        },
        {
          name: 'Python',
          icon: <StackIcon name="python" className='w-7'/>,
        },
        {
          name: 'Bash',
          icon: <StackIcon name="bash" className='w-7'/>,
        },
      ]
    },
  ]
};