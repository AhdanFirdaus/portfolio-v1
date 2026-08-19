import { BadgeCheck } from 'lucide-react';
import CertificateLayout from '../../../src/Layouts/CertificateLayout';
import { getCertificates } from '../../../lib/notion';

export const metadata = {
  title: 'Course Completions & Certifications',
  description: 'Certifications and courses completed by Ahdan Firdaus in IT, Cybersecurity, and Web Development.',
};

export const revalidate = 3600;

export default async function CompletionsPage() {
  const data = await getCertificates('completions');

  return (
    <CertificateLayout
      title="Completions"
      icon={BadgeCheck}
      data={data}
      type="completions"
    />
  );
}
