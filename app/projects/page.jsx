import ProjectsClient from '../../src/components/ProjectsClient';
import { getProjects } from '../../lib/notion';

export const metadata = {
  title: 'Projects & Work',
  description: 'Showcase of web application development and cybersecurity projects built by Muhammad Ahdan Firdaus (dadan).',
  keywords: ['Projects', 'Web Development', 'React.js', 'Next.js', 'Cybersecurity', 'Ahdan Firdaus'],
  alternates: {
    canonical: '/projects',
  },
};

export const revalidate = 10; // Auto-revalidate Notion data every 10s

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient projects={projects} />;
}
