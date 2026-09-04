import { 
  Terminal, 
  MapPin, 
  School, 
  Shield, 
  Code2,
  Download,
  Quote,
  Github,
  Linkedin,
  Mail,
  Briefcase,
  Award,
  Calendar,
} from 'lucide-react';
import { getProjects, getCertificates } from '../lib/notion';

export const metadata = {
  title: 'Ahdan Firdaus | Portfolio & Cybersecurity',
  description: 'Personal portfolio of Muhammad Ahdan Firdaus - Software Engineer & Cybersecurity Enthusiast.',
};

export const revalidate = 10;

export default async function Home() {
  const projects = await getProjects();
  const awardings = await getCertificates('awardings');
  const completions = await getCertificates('completions');

  const totalProjects = projects.length;
  const totalCertificates = awardings.length + completions.length;
  const experienceYears = new Date().getFullYear() - 2022;

  return (
    <div className="space-y-8 font-mono rounded-none">
      {/* Profile Section */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column - Photo */}
          <div className="lg:col-span-4">
            <div className="relative group max-w-sm mx-auto lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden border border-border-main bg-bg-card rounded-none">
                <img 
                  src="/me.png"
                  alt="Muhammad Ahdan Firdaus"
                  className="w-full h-full object-cover rounded-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="lg:col-span-8 space-y-5">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white mb-3 tracking-tight">
                Muhammad Ahdan Firdaus
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 text-neutral-400 mb-4">
                <div className="flex items-center gap-1.5 bg-bg-card px-3 py-1 border border-border-main rounded-none">
                  <Code2 size={13} className="text-accent-red" />
                  <span className="text-xs font-mono">Software Engineer</span>
                </div>
                <span className="text-neutral-700">•</span>
                <div className="flex items-center gap-1.5 bg-bg-card px-3 py-1 border border-border-main rounded-none">
                  <Shield size={13} className="text-accent-red" />
                  <span className="text-xs font-mono">Penetration Tester</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-bg-card p-2.5 border border-border-main rounded-none">
                  <MapPin size={14} className="text-accent-red shrink-0" />
                  <span className="truncate">Semarang, Indonesia</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-bg-card p-2.5 border border-border-main rounded-none">
                  <School size={14} className="text-accent-red shrink-0" />
                  <span className="truncate">SMK N 7 Semarang</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-bg-card p-2.5 border border-border-main rounded-none">
                  <Calendar size={14} className="text-accent-red shrink-0" />
                  <span className="truncate">SIJA · 2023-2027</span>
                </div>
              </div>
            </div>

            <a
              href="/Muhammad_Ahdan_Firdaus_CV.pdf"
              download="Muhammad_Ahdan_Firdaus_CV.pdf"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-bg-card hover:bg-accent-red/15 border border-border-main hover:border-accent-red/40 text-accent-red hover:text-white transition-all duration-200 cursor-pointer font-mono text-sm rounded-none"
            >
              <Download size={15} strokeWidth={1.5} className="group-hover:translate-y-0.5 transition-transform" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="relative mt-6">
        <div className="relative bg-bg-card p-6 border border-border-main rounded-none">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-bg-hover border border-border-main rounded-none">
              <Quote size={22} className="text-accent-red" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-xl md:text-2xl font-mono text-white mb-2 tracking-tight">
                "Strive for progress, not perfection."
              </p>
              <p className="text-neutral-400 text-xs font-mono flex items-center gap-2">
                <span className="w-6 h-px bg-accent-red"></span>
                words I live by
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-bg-card p-6 border border-border-main h-full rounded-none">
            <div className="flex items-center gap-2 mb-4 border-b border-border-main pb-3">
              <Terminal size={16} className="text-accent-red" />
              <span className="text-xs font-mono text-neutral-300">$ cat about.txt</span>
            </div>
            
            <div className="space-y-4 text-neutral-300 text-sm font-mono leading-relaxed">
              <p>
                <span className="text-accent-red font-semibold">$ whoami</span>
                <br />
                Hey! I'm <span className="text-accent-red">Muhammad Ahdan Firdaus</span>, 
                a Software Engineer and Cybersecurity enthusiast from 
                SMK Negeri 7 Semarang, majoring in SIJA.
              </p>
              
              <p>
                <span className="text-accent-red font-semibold">$ what_i_do</span>
                <br />
                I focus on building modern, responsive web applications and enjoy working across 
                both frontend and backend to create clean, maintainable, and scalable systems.
              </p>
              
              <p>
                <span className="text-accent-red font-semibold">$ extra</span>
                <br />
                Alongside development, I explore cybersecurity to better understand how applications 
                can be built with security in mind.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Leadership Card */}
          <div className="bg-bg-card p-5 border border-border-main rounded-none">
            <div className="flex items-center gap-2 mb-3 border-b border-border-main pb-2">
              <Briefcase size={15} className="text-accent-red" />
              <span className="text-xs font-mono text-neutral-400">leadership</span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono">
              <div className="flex items-center gap-2 p-2 bg-bg-hover border border-border-main rounded-none">
                <Award size={13} className="text-amber-400 shrink-0" />
                <span className="text-xs text-neutral-300">Project Management</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-bg-hover border border-border-main rounded-none">
                <Award size={13} className="text-amber-400 shrink-0" />
                <span className="text-xs text-neutral-300">Community</span>
              </div>
            </div>
          </div>

          {/* Connect Card */}
          <div className="bg-bg-card p-5 border border-border-main rounded-none">
            <div className="flex items-center gap-2 mb-3 border-b border-border-main pb-2">
              <Mail size={15} className="text-accent-red" />
              <span className="text-xs font-mono text-neutral-400">connect</span>
            </div>
            <div className="flex gap-2">
              <a href="https://github.com/AhdanFirdaus" target="_blank" rel="noopener noreferrer" className="p-2 bg-bg-hover hover:bg-accent-red/20 border border-border-main text-neutral-400 hover:text-accent-red transition-colors rounded-none">
                <Github size={16} />
              </a>
              <a href="https://www.linkedin.com/in/ahdan-firdaus-5751763b1/" target="_blank" rel="noopener noreferrer" className="p-2 bg-bg-hover hover:bg-accent-red/20 border border-border-main text-neutral-400 hover:text-accent-red transition-colors rounded-none">
                <Linkedin size={16} />
              </a>
              <a href="mailto:muhammadahdanf1@gmail.com" className="p-2 bg-bg-hover hover:bg-accent-red/20 border border-border-main text-neutral-400 hover:text-accent-red transition-colors rounded-none">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Style Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        <div className="bg-bg-card p-4 border border-border-main rounded-none">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2">
            <span className="text-accent-red">$</span>
            <span>projects</span>
          </div>
          <p className="text-white font-mono text-2xl font-bold">{totalProjects}<span className="text-accent-red text-sm ml-1">+</span></p>
          <p className="text-xs font-mono text-neutral-500 mt-1">completed</p>
        </div>

        <div className="bg-bg-card p-4 border border-border-main rounded-none">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2">
            <span className="text-accent-red">$</span>
            <span>experience</span>
          </div>
          <p className="text-white font-mono text-2xl font-bold">{experienceYears}<span className="text-accent-red text-sm ml-1">yrs</span></p>
          <p className="text-xs font-mono text-neutral-500 mt-1">in development (since 2022)</p>
        </div>

        <div className="bg-bg-card p-4 border border-border-main rounded-none">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2">
            <span className="text-accent-red">$</span>
            <span>certifications</span>
          </div>
          <p className="text-white font-mono text-2xl font-bold">{totalCertificates}</p>
          <p className="text-xs font-mono text-neutral-500 mt-1">earned</p>
        </div>

        <div className="bg-bg-card p-4 border border-border-main rounded-none">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2">
            <span className="text-accent-red">$</span>
            <span>coffee</span>
          </div>
          <p className="text-white font-mono text-2xl font-bold">∞</p>
          <p className="text-xs font-mono text-neutral-500 mt-1">cups and counting</p>
        </div>
      </div>
    </div>
  );
}
