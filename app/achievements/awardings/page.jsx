import { Award } from 'lucide-react';
import CertificateLayout from '../../../src/Layouts/CertificateLayout';
import { getCertificates } from '../../../lib/notion';

export const metadata = {
  title: 'Awardings & Honors',
  description: 'Competition awards and honors earned by Ahdan Firdaus in Cyber Security and Web Development.',
};

export const revalidate = 3600;

export default async function AwardingsPage() {
  const data = await getCertificates('awardings');

  return (
    <CertificateLayout
      title="Awardings"
      icon={Award}
      data={data}
      type="awardings"
    />
  );
}
