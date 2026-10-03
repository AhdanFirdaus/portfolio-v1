import { notFound } from 'next/navigation';
import EventDetailClient from '../../../src/components/EventDetailClient';
import { getEventBySlugNotion } from '../../../lib/notion';

export const revalidate = 10; // Auto-revalidate Notion data every 10s

export async function generateMetadata({ params }) {
  const { eventSlug } = await params;
  const event = await getEventBySlugNotion(eventSlug);
  const title = event ? `${event.title} - CTF Writeup` : 'CTF Event';
  const description = event ? (event.description || `Read CTF challenge writeups and solutions for ${event.title}`) : 'CTF event writeups track';
  const canonicalUrl = `/blog/${eventSlug}`;

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

export default async function EventDetailPage({ params }) {
  const { eventSlug } = await params;
  const event = await getEventBySlugNotion(eventSlug);

  if (!event) {
    return notFound();
  }

  return <EventDetailClient event={event} />;
}
