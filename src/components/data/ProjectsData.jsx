import { 
  Globe, 
  Github, 
  Calendar,
  User,
  Briefcase,
  Code2,
  ExternalLink,
  Smartphone,
  Shield,
  Database,
  Server,
  Layout,
  Lock
} from 'lucide-react';

export const projectsData = [
  {
    id: 1,
    title: "LaporinAja",
    shortDesc: "A digital public complaint platform for Semarang citizens with interactive maps and identity verification.",
    fullDesc: "LaporinAja is a civic-tech web application that enables citizens to report public facility issues in a secure and transparent way. The platform focuses on verified reporting and meaningful community participation, helping local authorities respond faster while building trust between citizens and the government.",
    image: "/img/projects/laporinaja.png",
    date: "June 28, 2025",
    projectType: "Team",
    role: "FrontEnd Developer",
    details: [
      "Built a web-based public complaint platform for citizens of Semarang",
      "Implemented citizen authentication and identity verification using KTP upload and OCR with Tesseract",
      "Developed an automatic district labeling system based on OCR text extraction",
      "Created an interactive map to visualize reports with color-coded zones based on complaint density",
      "Integrated a support chatbot to guide users through the reporting process",
      "Provided a public complaints page to ensure transparency and track report progress"
    ],
    techStack: [
      { name: "React.js"},
      { name: "Supabase"},
      { name: "TailwindCSS"},
      { name: "Tesseract OCR"},
    ],
    links: {
      live: "https://laporinaja-phi.vercel.app/", 
      github: "https://github.com/AhdanFirdaus/laporinaja"
    }
  },
  {
    id: 2,
    title: "Pemilos Stembase 2025",
    shortDesc: "A web-based voting system for the 2025 OSIS election at SMK Negeri 7 Semarang.",
    fullDesc: "Pemilos Stembase 2025 is a digital election platform designed to manage the OSIS Chairperson and Vice Chairperson election process efficiently and securely. The system includes candidate profiles, voter authentication, one-time vote validation, and real-time vote tallying to ensure transparency and a smooth election experience for both students and staff.",
    image: "/img/projects/pemilos.jpg",
    date: "October 20, 2025",
    projectType: "Team",
    role: "FrontEnd Developer",
    details: [
      "Secure login system using NIS for students and teachers",
      "Candidate profiles page with detailed vision and mission statements",
      "Vote page accessible only after reviewing all candidate information",
      "Real-time vote tallying and results display for transparency"
    ],
    techStack: [
      { name: "React.js"},
      { name: "Laravel"},
      { name: "TailwindCSS"},
    ],
    links: {
      github: "https://github.com/AhdanFirdaus/pemilos-stembase-2025"
    }
  },
  {
    id: 3,
    title: "Kakarya",
    shortDesc: "A one-page landing website promoting STEM programs for women, built with HTML, CSS, and JavaScript.",
    fullDesc: "Kakarya is a single-page landing website created for the Liga Digital Nasional Skilvul competition, focusing on promoting STEM programs for women. The page highlights industry-based training programs, STEM communities, networking events, skill workshops, and webinars. Developed entirely with native HTML, CSS, and JavaScript, the site demonstrates clean design, responsiveness, and a user-friendly layout while adhering to competition requirements.",
    image: "/img/projects/kakarya.png",
    date: "April 17, 2024",
    projectType: "Individual",
    role: "FrontEnd Developer",
    details: [
      "Single-page landing website showcasing STEM programs for women",
      "Sections include industry-based training, STEM communities, networking events, workshops, and webinars",
      "Built using only native HTML, CSS, and JavaScript without external libraries",
      "Responsive and clean design optimized for readability and engagement",
      "Focus on clear information hierarchy and visual presentation suitable for a competition entry"
    ],
    techStack: [
      { name: "HTML"},
      { name: "CSS"},
      { name: "Javascript"},
    ],
    links: {
      live: "https://ahdanfirdaus.github.io/kakarya/", 
      github: "https://github.com/AhdanFirdaus/kakarya"
    }
  },
  {
    id: 4,
    title: "Kursus-Al-Khabiir",
    shortDesc: "A static one-page landing website showcasing Islamic learning content and resources, built with HTML, CSS, and JavaScript.",
    fullDesc: "Kursus-Al-Khabiir is a single-page landing website developed for the Festida 2024 web design competition. The page presents various Islamic learning resources and community features, including study materials, prayer time reminders, product showcases, and donation campaigns. Designed with native HTML, CSS, and JavaScript, the site focuses on clean visual hierarchy, responsive layout, and engaging presentation, adhering to the competition’s static website requirements.",
    image: "/img/projects/al-khabir.png",
    date: "January 13, 2024",
    projectType: "Team",
    role: "FrontEnd Developer",
    details: [
      "Single-page landing website presenting Islamic educational content and resources",
      "Sections include learning materials, prayer time reminders, product showcases, and donation campaigns",
      "Built entirely with HTML, CSS, and JavaScript with no backend functionality",
      "Includes static Sign Up / Sign In forms for design demonstration purposes",
      "Responsive, clean, and visually engaging layout optimized for competition standards"
    ],
    techStack: [
      { name: "HTML"},
      { name: "CSS"},
      { name: "Javascript"},
      { name: "Swiper js"},
    ],
    links: {
      live: "https://al-khabiiir.netlify.app/", 
      github: "https://github.com/AhdanFirdaus/Kursus-Al-Khabiir"
    }
  },
  {
    id: 5,
    title: "Suka Tani",
    shortDesc: "A multi-page web design project promoting agricultural education and smart farming solutions.",
    fullDesc: "Suka Tani is a multi-page web design project created for the IITC 2024 web design competition. The website aims to promote agricultural education by presenting information about modern farming infrastructure, smart farming concepts, and sustainable agricultural practices. Built with native HTML, CSS, and JavaScript, the project focuses on clean layout, intuitive navigation, and informative content structure to raise awareness and interest in modern agriculture.",
    image: "/img/projects/sukatani.png",
    date: "September 19, 2024",
    projectType: "Team",
    role: "FrontEnd Developer",
    details: [
      "Multi-page website presenting agricultural education and smart farming concepts",
      "Dedicated sections for modern farming tools, infrastructure, and smart agriculture practices",
      "Built using native HTML, CSS, and JavaScript without external frameworks",
      "Designed with clear navigation and information hierarchy for better user experience",
      "Responsive layout optimized for desktop and mobile viewing as part of a competition entry"
    ],
    techStack: [
      { name: "HTML"},
      { name: "CSS"},
      { name: "Javascript"},
    ],
    links: {
      github: "https://github.com/AhdanFirdaus/SukaTani"
    }
  },
  {
    id: 6,
    title: "Bakas",
    shortDesc: "A web design project promoting waste management and recycling services through a clean, user-friendly interface.",
    fullDesc: "Bakas is a web design project created for the INVENTION 2024 web design competition, focusing on promoting waste management and recycling services. The website presents a concept where users can schedule waste pickup, exchange recyclable waste for money, and explore recycled products. Built with native HTML, CSS, and JavaScript, the project emphasizes clear user flow, intuitive navigation, and informative content to encourage environmental awareness and responsible waste practices.",
    image: "/img/projects/bakas.png",
    date: "August 25, 2024",
    projectType: "Team",
    role: "FrontEnd Developer",
    details: [
      "Multi-page website concept for waste management and recycling services",
      "User flow showcasing waste pickup requests and waste-to-cash exchange concept",
      "Product showcase page for recycled products",
      "Static Sign Up / Sign In pages for user journey demonstration",
      "Built using native HTML, CSS, and JavaScript with a focus on clean UI and responsive layout"
    ],
    techStack: [
      { name: "HTML"},
      { name: "CSS"},
      { name: "Javascript"},
    ],
    links: {
      live: "https://bakas-id.netlify.app/", 
      github: "https://github.com/AhdanFirdaus/bakas"
    }
  },
  {
    id: 7,
    title: "Sewaras",
    shortDesc: "A health-tech web design project providing digital health services and public health insights.",
    fullDesc: "Sewaras is a health-tech web design project developed for the INVENTION 2025 web design competition. The website presents a digital healthcare concept that allows users to explore medical consultations, check blood availability at hospitals, and monitor regional health conditions through interactive maps. Built with native HTML, CSS, and JavaScript, the project focuses on clear user flow, informative content, and an intuitive interface to promote public health awareness and accessibility.",
    image: "/img/projects/sewaras.png",
    date: "October 3, 2025",
    projectType: "Team",
    role: "FrontEnd Developer",
    details: [
      "Multi-page website concept for digital healthcare and public health services",
      "Doctor consultation section with category-based doctor selection",
      "Blood availability information across hospitals",
      "Health region tracker visualized using interactive maps",
      "Simple health quiz implemented with JavaScript for user engagement",
      "Static Sign Up / Sign In pages to demonstrate user journey and access flow",
      "Built using native HTML, CSS, and JavaScript with responsive and clean UI design"
    ],
    techStack: [
      { name: "HTML"},
      { name: "CSS"},
      { name: "Javascript"},
    ],
    links: {
      live: "https://sewaras.vercel.app/", 
      github: "https://github.com/AhdanFirdaus/sewaras"
    }
  },
  {
    id: 8,
    title: "Komitku",
    shortDesc: "A simple Python CLI tool to create clean Conventional Commits directly from the terminal.",
    fullDesc: "Komitku is a lightweight Python-based CLI tool that helps developers write clean and consistent Git commits using the Conventional Commits format. Designed for Indonesian developers, it allows you to write commit messages in Indonesian and automatically translates them into English. Komitku also guides you through staging files and streamlines the commit process, making your workflow faster and more organized.",
    image: "/img/projects/komitku.png",
    date: "May 14, 2025",
    projectType: "Individual",
    role: "Creator",
    details: [
      "CLI tool to generate Git commits using the Conventional Commits standard",
      "Supports Indonesian-to-English commit message translation",
      "Interactive file selection for staging, with a default option to stage all files",
      "Automatic commit scope handling for config changes",
      "Safe cancellation with Ctrl+C without leaving staged files",
      "Supports multiple commit types such as feat, fix, docs, config, wip, and sec"
    ],
    techStack: [
      { name: "Python"},
    ],
    links: {
      github: "https://github.com/AhdanFirdaus/komitku"
    }
  },
];