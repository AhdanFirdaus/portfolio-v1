import { 
  Terminal, 
  Mail, 
  Github, 
  Linkedin, 
  Instagram,
  MessageSquare,
  PersonStanding
} from 'lucide-react';
import ContactForm from '../../src/components/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Muhammad Ahdan Firdaus for software engineering projects, security research, CTF collaboration, or hire opportunities.',
  keywords: ['Contact Ahdan Firdaus', 'Hire Software Engineer', 'Cybersecurity Specialist Contact', 'Muhammad Ahdan Firdaus Email'],
  alternates: {
    canonical: '/contacts',
  },
  openGraph: {
    title: 'Contact | Muhammad Ahdan Firdaus',
    description: 'Get in touch with Muhammad Ahdan Firdaus for software engineering projects, security research, CTF collaboration, or hire opportunities.',
    url: '/contacts',
  },
};

export default function ContactsPage() {
  const contactInfo = {
    email: "muhammadahdanf1@gmail.com",
    socials: [
      {
        name: "GitHub",
        username: "@ahdanfirdaus",
        icon: <Github size={18} />,
        link: "https://github.com/ahdanfirdaus",
        color: "hover:text-accent-red"
      },
      {
        name: "LinkedIn",
        username: "in/ahdanfirdaus",
        icon: <Linkedin size={18} />,
        link: "https://www.linkedin.com/in/ahdan-firdaus-5751763b1/",
        color: "hover:text-accent-red"
      },
      {
        name: "Instagram",
        username: "@ahdan.firdaus",
        icon: <Instagram size={18} />,
        link: "https://instagram.com/ahdan.firdaus",
        color: "hover:text-accent-red"
      }
    ]
  };

  return (
    <div className="space-y-8 font-mono rounded-none">
      {/* Header */}
      <div className="relative border-b border-border-main pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
            Contacts
          </h1>
          <p className="text-neutral-400 text-sm font-mono flex items-center gap-2 mt-2">
            <Terminal size={14} className="text-accent-red" />
            <span>$ feel free to reach out</span>
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-1 space-y-4">
          {/* Email Card */}
          <div className="bg-bg-card border border-border-main p-5 rounded-none">
            <div className="flex items-center gap-2 mb-4 border-b border-border-main pb-3">
              <Mail size={15} className="text-accent-red" />
              <span className="text-xs font-mono text-neutral-400">email</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-bg-hover border border-border-main rounded-none">
                <div className="p-2 bg-bg-card border border-border-main">
                  <Mail size={15} className="text-accent-red" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-neutral-500">primary</p>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-xs text-accent-red hover:underline font-mono transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 pt-4 border-t border-border-main">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center justify-center gap-2 py-2 bg-bg-hover hover:bg-accent-red/15 text-accent-red hover:text-white transition-all text-xs font-mono border border-border-main hover:border-accent-red/40 rounded-none cursor-pointer"
              >
                <MessageSquare size={14} />
                <span>Send Email Directly</span>
              </a>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="bg-bg-card border border-border-main p-5 rounded-none">
            <div className="flex items-center gap-2 mb-4 border-b border-border-main pb-3">
              <PersonStanding size={15} className="text-accent-red" />
              <span className="text-xs font-mono text-neutral-400">social</span>
            </div>
            
            <div className="space-y-2">
              {contactInfo.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 bg-bg-hover hover:bg-border-main border border-border-main transition-all group rounded-none ${social.color}`}
                >
                  <div className="p-2 bg-bg-card border border-border-main group-hover:border-accent-red/30 transition-colors">
                    {social.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-mono text-neutral-500">{social.name}</p>
                    <p className="text-xs font-mono text-neutral-300 group-hover:text-accent-red transition-colors">
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
          <div className="bg-bg-card border border-border-main p-6 rounded-none">
            <div className="mb-6 border-b border-border-main pb-4">
              <h2 className="text-xl font-mono font-bold text-white mb-1 tracking-tight">
                Send me a message
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
