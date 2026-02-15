import { Award } from 'lucide-react';
import { awardingsData } from '../components/data/CertificatesData';
import CertificateLayout from '../Layouts/CertificateLayout';

const Awardings = () => {
  return (
    <CertificateLayout
      title="Awardings"
      icon={Award}
      data={awardingsData}
      type="awardings"
    />
  );
};

export default Awardings;