import './globals.css';
import Navbar from '../src/components/Navbar';
import Cursor from '../src/components/Cursor';
import Footer from '../src/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahdanfirdaus.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Muhammad Ahdan Firdaus (dadan) | Software Engineer & Cybersecurity',
    template: '%s | Muhammad Ahdan Firdaus'
  },
  description: 'Personal portfolio & CTF writeups of Muhammad Ahdan Firdaus (dadan) - Software Engineer & Cybersecurity Enthusiast from SMK Negeri 7 Semarang. Showcasing web applications, security research, and technical skills.',
  keywords: [
    'Muhammad Ahdan Firdaus',
    'dadan',
    'Ahdan Firdaus',
    'Software Engineer Semarang',
    'Frontend Developer Indonesia',
    'Cybersecurity Specialist',
    'SMK Negeri 7 Semarang',
    'SIJA STEMBA',
    'CTF Writeups',
    'React Developer',
    'Next.js Portfolio'
  ],
  authors: [{ name: 'Muhammad Ahdan Firdaus', url: siteUrl }],
  creator: 'Muhammad Ahdan Firdaus',
  publisher: 'Muhammad Ahdan Firdaus',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    title: 'Muhammad Ahdan Firdaus | Software Engineer & Cybersecurity',
    description: 'Explore web development projects, skills, certifications, and technical CTF writeups by Muhammad Ahdan Firdaus.',
    siteName: 'Ahdan Firdaus Portfolio',
    images: [
      {
        url: '/me.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Ahdan Firdaus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Ahdan Firdaus | Software Engineer & Cybersecurity',
    description: 'Explore web development projects, skills, certifications, and technical CTF writeups by Muhammad Ahdan Firdaus.',
    images: ['/me.png'],
    creator: '@ahdanfirdaus',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Ahdan Firdaus',
  alternateName: 'dadan',
  url: siteUrl,
  image: `${siteUrl}/me.png`,
  jobTitle: 'Software Engineer & Cybersecurity Specialist',
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'SMK Negeri 7 Semarang'
  },
  sameAs: [
    'https://github.com/AhdanFirdaus',
    'https://www.linkedin.com/in/ahdan-firdaus-5751763b1/',
    'https://instagram.com/ahdan.firdaus'
  ],
  knowsAbout: [
    'Web Development',
    'React.js',
    'Next.js',
    'Cybersecurity',
    'Capture The Flag (CTF)',
    'Frontend Engineering'
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bg-main text-text-main antialiased flex flex-col">
        <Cursor />
        <Navbar />
        <main className="lg:ml-72 flex-1 flex flex-col justify-between p-6 md:p-8 bg-bg-main min-h-screen">
          <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col">
            {children}
          </div>
          <div className="max-w-5xl w-full mx-auto shrink-0">
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
