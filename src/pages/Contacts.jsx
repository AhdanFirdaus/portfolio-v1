import { 
  Terminal, 
  Mail, 
  Github, 
  Linkedin, 
  Instagram,
  MessageSquare,
  PersonStanding
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Contacts = () => {
  const contactInfo = {
    email: "muhammadahdanf1@gmail.com",
    socials: [
      {
        name: "GitHub",
        username: "@ahdanfirdaus",
        icon: <Github size={20} />,
        link: "https://github.com/ahdanfirdaus",
        color: "hover:text-gray-300"
      },
      {
        name: "LinkedIn",
        username: "in/ahdanfirdaus",
        icon: <Linkedin size={20} />,
        link: "https://www.linkedin.com/in/ahdan-firdaus-5751763b1/",
        color: "hover:text-blue-400"
      },
      {
        name: "Instagram",
        username: "@ahdan.firdaus",
        icon: <Instagram size={20} />,
        link: "https://instagram.com/ahdan.firdaus",
        color: "hover:text-pink-400"
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Path navigasi */}
      <div className="flex items-center gap-2 text-sm font-mono text-gray-500 border-b border-blue-500/10 pb-4">
        <span className="text-blue-400">~/portfolio</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Contacts</span>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-transparent to-transparent blur-3xl -z-10" />
        
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Mail size={28} className="text-blue-400" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">
              Contacts
            </h1>
            <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
              <Terminal size={14} className="text-blue-400" />
              <span>$ feel free to reach out</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-1 space-y-4">
          {/* Email Card */}
          <div className="bg-[#0f1422] rounded-xl border border-blue-500/10 p-5">
            <div className="flex items-center gap-2 mb-4 border-b border-blue-500/10 pb-3">
              <Mail size={16} className="text-blue-400" />
              <span className="text-xs font-mono text-gray-400">email</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#1a1f2e] rounded-lg border border-blue-500/10">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Mail size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">primary</p>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-blue-400 hover:text-blue-300 font-mono transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 pt-4 border-t border-blue-500/10">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center justify-center gap-2 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 transition-all text-sm font-mono"
              >
                <MessageSquare size={14} />
                <span>Send Email Directly</span>
              </a>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="bg-[#0f1422] rounded-xl border border-blue-500/10 p-5">
            <div className="flex items-center gap-2 mb-4 border-b border-blue-500/10 pb-3">
              <PersonStanding size={16} className="text-blue-400" />
              <span className="text-xs font-mono text-gray-400">social</span>
            </div>
            
            <div className="space-y-2">
              {contactInfo.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 bg-[#1a1f2e] hover:bg-[#242937] rounded-lg border border-blue-500/10 transition-all group ${social.color}`}
                >
                  <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    {social.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{social.name}</p>
                    <p className="text-sm text-gray-300 group-hover:text-inherit transition-colors">
                      {social.username}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-[#0f1422] rounded-xl border border-blue-500/10 overflow-hidden">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-mono font-semibold text-white mb-2">
                  Send me a message
                </h2>
                <p className="text-sm text-gray-400">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Contacts;