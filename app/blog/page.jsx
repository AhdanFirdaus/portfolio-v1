import BlogListClient from '../../src/components/BlogListClient';
import { getEventsByYearNotion } from '../../lib/notion';

export const metadata = {
  title: 'CTF Writeups & Technical Logs',
  description: 'Cybersecurity writeups, Capture The Flag (CTF) challenge walkthroughs, and technical articles by Muhammad Ahdan Firdaus.',
  keywords: ['CTF Writeups', 'Cybersecurity', 'Web Exploitation', 'Forensics', 'Ahdan Firdaus', 'dadan'],
  alternates: {
    canonical: '/blog',
  },
};

export const revalidate = 10; // Auto-revalidate Notion data every 10s

export default async function BlogListPage() {
  const blogYears = await getEventsByYearNotion();

  return <BlogListClient blogYears={blogYears} />;
}
