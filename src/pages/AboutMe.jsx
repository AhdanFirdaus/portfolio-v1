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
  Heart,
} from 'lucide-react';
import Footer from '../components/Footer';

const AboutMe = () => {
  const handleDownloadCV = () => {
    const cvUrl = '/Muhammad_Ahdan_Firdaus_CV.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Muhammad_Ahdan_Firdaus_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Path navigasi */}
      <div className="flex items-center gap-2 text-sm font-mono text-gray-500 border-b border-blue-500/10 pb-4">
        <span className="text-blue-400">~/portfolio</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Introduction</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">About Me</span>
      </div>

      {/* Profile Section with Photo - Diperbaiki layoutnya */}
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-transparent to-transparent blur-3xl -z-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column - Photo (Lebih proporsional) */}
          <div className="lg:col-span-4">
            <div className="relative group max-w-sm mx-auto lg:mx-0">
              {/* Background glow effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300" />
              
              {/* Photo container dengan aspect ratio yang pas */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-blue-500/30 bg-[#0f1422]">
                <img 
                  src="/me.png"
                  alt="Muhammad Ahdan Firdaus"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Status badge - Lebih ramping */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#0f1422] border border-blue-500/30 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-mono text-gray-300">Open to opportunities</span>
              </div>
            </div>
          </div>

          {/* Right Column - Info (Lebih lebar) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Name and Title */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white mb-3">
                Muhammad Ahdan Firdaus
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 text-gray-400 mb-4">
                <div className="flex items-center gap-1.5 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                  <Code2 size={12} className="text-blue-400" />
                  <span className="text-xs">Software Engineer</span>
                </div>
                <span className="text-gray-600">•</span>
                <div className="flex items-center gap-1.5 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                  <Shield size={12} className="text-blue-400" />
                  <span className="text-xs">Cybersecurity Enthusiast</span>
                </div>
              </div>

              {/* Quick Info Row - Grid lebih rapat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#0f1422]/50 p-2 rounded-lg border border-blue-500/10">
                  <MapPin size={14} className="text-blue-400 flex-shrink-0" />
                  <span className="truncate">Semarang, Indonesia</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#0f1422]/50 p-2 rounded-lg border border-blue-500/10">
                  <School size={14} className="text-blue-400 flex-shrink-0" />
                  <span className="truncate">SMK N 7 Semarang</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#0f1422]/50 p-2 rounded-lg border border-blue-500/10">
                  <Calendar size={14} className="text-blue-400 flex-shrink-0" />
                  <span className="truncate">SIJA · 2023-2027</span>
                </div>
              </div>
            </div>

            {/* Download CV Button - Lebih compact */}
            <button
              onClick={handleDownloadCV}
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 border border-blue-500/40 rounded-lg text-blue-400 hover:text-blue-300 transition-all duration-200 cursor-pointer"
            >
              <Download size={16} strokeWidth={1.5} className="group-hover:translate-y-0.5 transition-transform" />
              <span className="text-sm font-mono font-medium">Download CV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quote Section - Dibuat lebih menarik */}
      <div className="relative mt-6">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-blue-500/5 to-transparent blur-2xl" />
        <div className="relative bg-[#0f1422] p-6 rounded-xl border border-blue-500/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Quote size={24} className="text-blue-400" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-xl md:text-2xl font-mono text-white mb-2">
                "Strive for progress, not perfection."
              </p>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-6 h-px bg-blue-400/50"></span>
                words I live by
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section - Layout 2 kolom yang lebih seimbang */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* Main Bio - 2 kolom */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0f1422] p-6 rounded-xl border border-blue-500/10 h-full">
            <div className="flex items-center gap-2 mb-4 border-b border-blue-500/10 pb-3">
              <Terminal size={18} className="text-blue-400" />
              <span className="text-sm font-mono text-gray-300">$ cat about.txt</span>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                <span className="text-blue-400 font-semibold">$ whoami</span>
                <br />
                Hey! I’m <span className="text-blue-400">Muhammad Ahdan Firdaus</span>, 
                a Software Engineer and Cybersecurity enthusiast from 
                SMK Negeri 7 Semarang, majoring in SIJA.
              </p>
              
              <p>
                <span className="text-blue-400 font-semibold">$ what_i_do</span>
                <br />
                I focus on building modern, responsive web applications and enjoy working across 
                both frontend and backend to create clean, maintainable, and scalable systems. 
                I’m comfortable turning designs and ideas into functional products.
              </p>
              
              <p>
                <span className="text-blue-400 font-semibold">$ extra</span>
                <br />
                Alongside development, I explore cybersecurity to better understand how applications 
                can be built with security in mind — from basic secure coding practices to thinking 
                about potential vulnerabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - 1 kolom dengan cards yang lebih rapi */}
        <div className="space-y-4">
          {/* Interests Card */}
          <div className="bg-[#0f1422] p-5 rounded-xl border border-blue-500/10">
            <div className="flex items-center gap-2 mb-3 border-b border-blue-500/10 pb-2">
              <Heart size={16} className="text-blue-400" />
              <span className="text-xs font-mono text-gray-400">interests</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Web Development', 
                'Web Security', 
                'React', 
                'Node.js', 
                'Penetration Testing', 
                'Cloud',
                'DevOps',
                'Network Security'
              ].map((item) => (
                <span key={item} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] rounded-full border border-blue-500/20">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Leadership Card */}
          <div className="bg-[#0f1422] p-5 rounded-xl border border-blue-500/10">
            <div className="flex items-center gap-2 mb-3 border-b border-blue-500/10 pb-2">
              <Briefcase size={16} className="text-blue-400" />
              <span className="text-xs font-mono text-gray-400">leadership</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 p-2 bg-blue-500/5 rounded-lg">
                <Award size={14} className="text-amber-400 flex-shrink-0" />
                <span className="text-xs text-gray-300">Project Management</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-500/5 rounded-lg">
                <Award size={14} className="text-amber-400 flex-shrink-0" />
                <span className="text-xs text-gray-300">Community Leader</span>
              </div>
            </div>
          </div>

          {/* Connect Card */}
          <div className="bg-[#0f1422] p-5 rounded-xl border border-blue-500/10">
            <div className="flex items-center gap-2 mb-3 border-b border-blue-500/10 pb-2">
              <Mail size={16} className="text-blue-400" />
              <span className="text-xs font-mono text-gray-400">connect</span>
            </div>
            <div className="flex gap-2">
              <a href="https://github.com/AhdanFirdaus" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors border border-blue-500/20">
                <Github size={16} className="text-gray-400 hover:text-blue-400" />
              </a>
              <a   href="https://www.linkedin.com/in/ahdan-firdaus-5751763b1/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors border border-blue-500/20">
                <Linkedin size={16} className="text-gray-400 hover:text-blue-400" />
              </a>
              <a href="mailto:muhammadahdanf1@gmail.com" className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors border border-blue-500/20">
                <Mail size={16} className="text-gray-400 hover:text-blue-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Style Stats - Dibuat lebih menarik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        <div className="bg-[#0f1422] p-4 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-2">
            <span className="text-blue-400">$</span>
            <span>projects</span>
          </div>
          <p className="text-white font-mono text-2xl">8<span className="text-gray-600 text-sm ml-1">+</span></p>
          <p className="text-[13px] text-gray-600 mt-1">completed</p>
        </div>

        <div className="bg-[#0f1422] p-4 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-2">
            <span className="text-blue-400">$</span>
            <span>experience</span>
          </div>
          <p className="text-white font-mono text-2xl">2<span className="text-gray-600 text-sm ml-1">yrs</span></p>
          <p className="text-[13px] text-gray-600 mt-1">in development</p>
        </div>

        <div className="bg-[#0f1422] p-4 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-2">
            <span className="text-blue-400">$</span>
            <span>certifications</span>
          </div>
          <p className="text-white font-mono text-2xl">13</p>
          <p className="text-[13px] text-gray-600 mt-1">earned</p>
        </div>

        <div className="bg-[#0f1422] p-4 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-2">
            <span className="text-blue-400">$</span>
            <span>coffee</span>
          </div>
          <p className="text-white font-mono text-2xl">∞</p>
          <p className="text-[13px] text-gray-600 mt-1">cups and counting</p>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default AboutMe;