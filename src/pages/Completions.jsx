import { BadgeCheck } from 'lucide-react';
import { completionsData } from '../components/data/CertificatesData';
import CertificateLayout from '../Layouts/CertificateLayout';

const Completions = () => {
  return (
    <CertificateLayout
      title="Completions"
      icon={BadgeCheck}
      data={completionsData}
      type="completions"
    />
  );
};

export default Completions;