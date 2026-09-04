import { notFound } from 'next/navigation';
import ChallengeWriteupClient from '../../../../src/components/ChallengeWriteupClient';
import { getSubpostNotion } from '../../../../lib/notion';

export const revalidate = 10; // Auto-revalidate Notion data every 10s

export async function generateMetadata({ params }) {
  const { eventSlug, challSlug } = await params;
  const result = await getSubpostNotion(eventSlug, challSlug);
  if (!result || !result.subpost) return { title: 'CTF Writeup' };

  const { subpost } = result;
  const title = `${subpost.title} Writeup | CTF`;
  const description = subpost.description || `In-depth writeup and solution for ${subpost.title} CTF challenge.`;
  const canonicalUrl = `/blog/${eventSlug}/${challSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ChallengeWriteupPage({ params }) {
  const { eventSlug, challSlug } = await params;
  const result = await getSubpostNotion(eventSlug, challSlug);

  if (!result || !result.subpost) {
    return notFound();
  }

  const { event, subpost } = result;

  return <ChallengeWriteupClient event={event} subpost={subpost} />;
}
