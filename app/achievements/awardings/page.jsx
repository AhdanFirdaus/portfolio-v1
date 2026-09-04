import CertificateLayout from '../../../src/Layouts/CertificateLayout';
import { getCertificates } from '../../../lib/notion';

export const metadata = {
  title: 'Awardings & Honors',
  description: 'Competition awards, CTF achievements, and honors earned by Muhammad Ahdan Firdaus in Cyber Security and Software Engineering.',
  keywords: ['Ahdan Firdaus Awards', 'CTF Competition Winners', 'Cybersecurity Honors', 'Software Engineering Awards'],
  alternates: {
    canonical: '/achievements/awardings',
  },
  openGraph: {
    title: 'Awardings & Honors | Muhammad Ahdan Firdaus',
    description: 'Competition awards, CTF achievements, and honors earned by Muhammad Ahdan Firdaus in Cyber Security and Software Engineering.',
    url: '/achievements/awardings',
  },
};

export const revalidate = 10; // Auto-revalidate Notion data every 10s

export default async function AwardingsPage() {
  const data = await getCertificates('awardings');

  return (
    <CertificateLayout
      title="Awardings"
      data={data}
      type="awardings"
    />
  );
}
