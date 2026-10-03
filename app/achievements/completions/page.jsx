import CertificateLayout from '../../../src/Layouts/CertificateLayout';
import { getCertificates } from '../../../lib/notion';

export const metadata = {
  title: 'Course Completions & Certifications',
  description: 'Certifications and verified courses completed by Muhammad Ahdan Firdaus in IT, Cybersecurity, and Web Development.',
  keywords: ['Ahdan Firdaus Certifications', 'Cybersecurity Certificates', 'Web Development Courses', 'Professional Certificates'],
  alternates: {
    canonical: '/achievements/completions',
  },
  openGraph: {
    title: 'Course Completions & Certifications | Muhammad Ahdan Firdaus',
    description: 'Certifications and verified courses completed by Muhammad Ahdan Firdaus in IT, Cybersecurity, and Web Development.',
    url: '/achievements/completions',
  },
};

export const revalidate = 10; // Auto-revalidate Notion data every 10s

export default async function CompletionsPage() {
  const data = await getCertificates('completions');

  return (
    <CertificateLayout
      title="Completions"
      data={data}
      type="completions"
    />
  );
}
