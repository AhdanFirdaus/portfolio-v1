import './globals.css';
import Navbar from '../src/components/Navbar';
import Cursor from '../src/components/Cursor';

export const metadata = {
  title: {
    default: 'Ahdan Firdaus | Portfolio & Cybersecurity',
    template: '%s | Ahdan Firdaus'
  },
  description: 'Personal portfolio & CTF writeups of Ahdan Firdaus - Web Developer & Cyber Security Enthusiast.',
  keywords: ['Ahdan Firdaus', 'Cybersecurity', 'Web Development', 'CTF Writeups', 'Portfolio'],
  authors: [{ name: 'Ahdan Firdaus' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1422] to-[#0a0e1a]">
        <Cursor />
        <Navbar />
        <main className="lg:ml-72 min-h-screen p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
