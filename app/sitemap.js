import { getEventsByYearNotion } from '../lib/notion';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahdanfirdaus.my.id';

  // Static routes
  const staticRoutes = [
    '',
    '/projects',
    '/skills',
    '/blog',
    '/achievements/awardings',
    '/achievements/completions',
    '/contacts',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic CTF Writeup routes fetched from Notion
  try {
    const blogYears = await getEventsByYearNotion();
    const dynamicRoutes = [];

    blogYears.forEach((yearObj) => {
      (yearObj.events || []).forEach((event) => {
        // Event level page
        dynamicRoutes.push({
          url: `${baseUrl}/blog/${event.slug}`,
          lastModified: new Date().toISOString().split('T')[0],
          changeFrequency: 'monthly',
          priority: 0.7,
        });

        // Subpost / Challenge writeup page
        (event.subposts || []).forEach((subpost) => {
          dynamicRoutes.push({
            url: `${baseUrl}/blog/${event.slug}/${subpost.slug}`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        });
      });
    });

    return [...staticRoutes, ...dynamicRoutes];
  } catch (e) {
    return staticRoutes;
  }
}
