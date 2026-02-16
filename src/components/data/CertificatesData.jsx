// src/components/data/CertificatesData.jsx
import { Award, BadgeCheck, Calendar, Building, ExternalLink } from 'lucide-react';

export const awardingsData = [
  {
    id: 1,
    title: "1st Place LKS XXXIV Cyber Security - Semarang",
    issuer: "MKKS Kota Semarang",
    date: "February 2026",
    description: "1st place winner in the city-level student competition (Semarang) for the Cyber Security category. Successfully solved multiple challenges including web exploitation and cryptography against top SMK participants across Semarang.",
    link: "https://drive.google.com/file/d/1WHuoQy6HDnf8OSn2Vbpra9LkdbLQWyRV/view?usp=sharing",
    icon: <Award className="text-amber-400" size={24} />
  },
  {
    id: 2,
    title: "2nd Place Web Development Competition",
    issuer: "UNSIKA",
    date: "July 2025",
    description: "Secured 2nd place in a team-based Web Development competition against participants from various high schools and universities. Built a functional web application with a strong focus on user experience, frontend-backend architecture, and solution presentation.",
    link: "https://drive.google.com/file/d/1KjfMxGzIqPQaBRDw7OsZkkgM6TROOQvi/view?usp=sharing",
    icon: <Award className="text-amber-400" size={24} />
  },
  {
    id: 3,
    title: "3rd Place CTF Competition",
    issuer: "Badan Sandi dan Siber Negara",
    date: "October 2025",
    description: "3rd place winner in the Junior category Capture The Flag (CTF) team competition, participated by senior and vocational high school students. Solved challenges in web exploitation, cryptography, reverse engineering, and digital forensics.",
    link: "https://drive.google.com/file/d/1LW2_7IHSjuAAg_Pvr8OfeS8DAjRogPy1/view?usp=sharing",
    icon: <Award className="text-amber-400" size={24} />
  },
  {
    id: 4,
    title: "3rd Place Web Development Competition",
    issuer: "Skilvul",
    date: "April 2024",
    description: "Achieved 3rd place in an individual Web Development competition for senior and vocational high school students. Developed an end-to-end website, covering UI design, frontend implementation, and application logic with a focus on performance and modern design.",
    link: "https://drive.google.com/file/d/1m7G7WBK6TvYlidKwxgbAwWknE0H7-T8n/view?usp=sharing",
    icon: <Award className="text-amber-400" size={24} />
  }
];

export const completionsData = [
  {
    id: 1,
    title: "Web Programming Fundamentals",
    issuer: "dicoding",
    date: "October 15, 2023",
    description: "Learned core web development concepts including HTML, CSS, and basic JavaScript for building responsive websites.",
    link: "https://drive.google.com/file/d/1YTHEj72TWF9aDFE8do6YyTzDcqUEURGX/view?usp=sharing",
    icon: <BadgeCheck className="text-emerald-400" size={24} />
  },
  {
    id: 2,
    title: "Front-End Web Fundamentals",
    issuer: "dicoding",
    date: "October 22, 2023",
    description: "Built interactive and user-friendly interfaces using modern front-end techniques and best practices.",
    link: "https://drive.google.com/file/d/1g_wd8lZB_-bS_V95j5ZveEnDAIcccTX9/view?usp=sharing",
    icon: <BadgeCheck className="text-emerald-400" size={24} />
  },
  {
    id: 3,
    title: "Data Visualization Fundamentals",
    issuer: "dicoding",
    date: "December 23, 2023",
    description: "Learned how to transform data into meaningful visual insights using charts and basic visualization principles.",
    link: "https://drive.google.com/file/d/11uDM3csELG-DE-zNLXglh5HXfdIlSPnq/view?usp=sharing",
    icon: <BadgeCheck className="text-emerald-400" size={24} />
  },
  {
    id: 4,
    title: "IT Essentials",
    issuer: "Cisco Networking Academy",
    date: "February 27, 2024",
    description: "Gained foundational knowledge of computer hardware, software, networking, and troubleshooting.",
    link: "https://drive.google.com/file/d/1Y15iBbhrAsfrCLnx7mR4x4LNumPCUgpR/view?usp=sharing",
    icon: <BadgeCheck className="text-emerald-400" size={24} />
  },
  {
    id: 5,
    title: "Cyber Security Fundamentals",
    issuer: "Cisco Networking Academy",
    date: "November 14, 2025",
    description: "Learned basic cybersecurity concepts including threats, vulnerabilities, and fundamental protection strategies.",
    link: "https://drive.google.com/file/d/1fxmd7-rqwUll3VlatXSRT9ZWWObis9Zc/view?usp=sharing",
    icon: <BadgeCheck className="text-emerald-400" size={24} />
  },
  {
    id: 6,
    title: "Cyber Security Officer",
    issuer: "Telkom Digiup",
    date: "December 22, 2025",
    description: "Trained in practical cybersecurity operations, incident response, and basic security monitoring practices.",
    link: "https://drive.google.com/file/d/1EirGMEHNcse_X9qXR63PiPHR1DA-zyRp/view?usp=sharing",
    icon: <BadgeCheck className="text-emerald-400" size={24} />
  },
  {
    id: 7,
    title: "Digital Forensics",
    issuer: "Security Blue Team",
    date: "January 19, 2025",
    description: "Learned digital forensic techniques to collect, analyze, and preserve digital evidence in investigations.",
    link: "https://drive.google.com/file/d/15FQiricHZdcmzQvfH-MR0Esxd643kdew/view?usp=sharing",
    icon: <BadgeCheck className="text-emerald-400" size={24} />
  },
  {
    id: 8,
    title: "Fiber Optic FTTH Training",
    issuer: "PT. Tower Bersama Infrastructure Tbk",
    date: "September 23, 2025",
    description: "Hands-on training on FTTH installation and fiber optic cabling.",
    link: "https://drive.google.com/file/d/1_48bsCl9yiOHTksapx76N-LSX_pVr6Ic/view?usp=sharing",
    icon: <BadgeCheck className="text-emerald-400" size={24} />
  },
  {
    id: 9,
    title: "AI Upskilling Program",
    issuer: "Remote Skills Academy",
    date: "August 4, 2025",
    description: "Explored practical AI concepts and tools to enhance productivity and problem-solving skills.",
    link: "https://drive.google.com/file/d/1TW6cVcgMntA64Yy80FMLM1Dfrva4V3JX/view?usp=sharing",
    icon: <BadgeCheck className="text-emerald-400" size={24} />
  },
];