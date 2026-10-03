import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notionApiKey = process.env.NOTION_API_KEY;
const awardsDbId = process.env.NOTION_AWARDS_DB_ID;
const completionsDbId = process.env.NOTION_COMPLETIONS_DB_ID;
const certificatesDbId = process.env.NOTION_CERTIFICATES_DB_ID;
const blogDbId = process.env.NOTION_BLOG_DB_ID;
const projectsDbId = process.env.NOTION_PROJECTS_DB_ID;
const skillsDbId = process.env.NOTION_SKILLS_DB_ID;

export const notion = notionApiKey ? new Client({ auth: notionApiKey }) : null;
export const n2m = notion ? new NotionToMarkdown({ notionClient: notion }) : null;

/**
 * Helper to convert Google Drive share links to direct image URLs
 */
export function formatImageUrl(url) {
  if (!url) return '';
  const cleanUrl = url.trim();

  if (cleanUrl.includes('drive.google.com') || cleanUrl.includes('googleusercontent.com')) {
    let fileId = null;
    const matchFileD = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (matchFileD && matchFileD[1]) {
      fileId = matchFileD[1];
    } else {
      const matchId = cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (matchId && matchId[1]) {
        fileId = matchId[1];
      } else {
        const matchLh3 = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (matchLh3 && matchLh3[1]) {
          fileId = matchLh3[1];
        }
      }
    }

    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
    }
  }

  return cleanUrl;
}

/**
 * Fetch certificates from Notion Database (Separate or Single)
 */
export async function getCertificates(typeFilter = 'awardings') {
  const isAward = typeFilter === 'awardings';
  const targetDbId = isAward ? (awardsDbId || certificatesDbId) : (completionsDbId || certificatesDbId);
  const isSeparateDb = isAward ? !!awardsDbId : !!completionsDbId;

  if (!notion || !targetDbId) {
    return [];
  }

  try {
    const queryOptions = {
      database_id: targetDbId,
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    };

    if (!isSeparateDb) {
      queryOptions.filter = {
        property: 'Type',
        select: {
          equals: isAward ? 'Award' : 'Completion',
        },
      };
    }

    const response = await notion.databases.query(queryOptions);

    const items = response.results.map((page, index) => {
      const props = page.properties;
      return {
        id: page.id || index + 1,
        title: props.Title?.title?.map(t => t.plain_text).join('') || 'Untitled Certificate',
        issuer: props.Issuer?.select?.name || props.Issuer?.rich_text?.map(t => t.plain_text).join('') || 'Issuer',
        date: props.Date?.date?.start || props.Date?.rich_text?.map(t => t.plain_text).join('') || '2026',
        description: props.Description?.rich_text?.map(t => t.plain_text).join('') || '',
        link: props.Link?.url || props.Link?.rich_text?.map(t => t.plain_text).join('') || '#',
      };
    });

    items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    return items;
  } catch (error) {
    console.warn(`Notion API fetch error for certificates (${typeFilter}):`, error.message);
    return [];
  }
}

/**
 * Fetch projects from Notion Database
 */
export async function getProjects() {
  if (!notion || !projectsDbId) {
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: projectsDbId,
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    const items = response.results.map((page, index) => {
      const props = page.properties;
      const rawImage = props.Image?.url || props.Image?.rich_text?.[0]?.plain_text || props.Image?.files?.[0]?.file?.url || props.Image?.files?.[0]?.external?.url || '';
      
      return {
        id: page.id || index + 1,
        title: props.Title?.title?.[0]?.plain_text || 'Untitled Project',
        shortDesc: props.ShortDesc?.rich_text?.map(t => t.plain_text).join('') || '',
        fullDesc: props.FullDesc?.rich_text?.map(t => t.plain_text).join('') || '',
        image: formatImageUrl(rawImage),
        date: props.Date?.date?.start || props.Date?.rich_text?.[0]?.plain_text || '2026',
        projectType: props.ProjectType?.select?.name || 'Individual',
        role: props.Role?.rich_text?.map(t => t.plain_text).join('') || 'Developer',
        details: props.Details?.rich_text ? props.Details.rich_text.map(t => t.plain_text).join('').split('\n').filter(Boolean) : [],
        techStack: props.TechStack?.multi_select?.map(t => ({ name: t.name })) || [],
        links: {
          live: props.LiveUrl?.url || props.LiveUrl?.rich_text?.[0]?.plain_text || '',
          github: props.GithubUrl?.url || props.GithubUrl?.rich_text?.[0]?.plain_text || '',
        }
      };
    });

    items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    return items;
  } catch (error) {
    console.warn('Notion API fetch error for projects:', error.message);
    return [];
  }
}

/**
 * Fetch skills from Notion Database
 */
export async function getSkills() {
  if (!notion || !skillsDbId) {
    return { categories: [] };
  }

  try {
    const response = await notion.databases.query({
      database_id: skillsDbId,
    });

    const categoryMap = {};

    response.results.forEach((page) => {
      const props = page.properties;
      const categoryName = props.Category?.select?.name || 'Other';
      const skillTitle = props.Title?.title?.[0]?.plain_text || 'Skill';
      const iconValue = props.Icon?.rich_text?.[0]?.plain_text || props.Icon?.select?.name || '';

      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = {
          id: categoryName.toLowerCase().replace(/\s+/g, '-'),
          label: categoryName,
          skills: []
        };
      }

      categoryMap[categoryName].skills.push({
        name: skillTitle,
        iconName: iconValue
      });
    });

    const categories = Object.values(categoryMap);
    return { categories };
  } catch (error) {
    console.warn('Notion API fetch error for skills:', error.message);
    return { categories: [] };
  }
}

/**
 * Fetch CTF Writeups & Blog grouped by Year and Event from Notion
 */
export async function getEventsByYearNotion() {
  if (!notion || !blogDbId) {
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: blogDbId,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    if (response.results.length === 0) {
      return [];
    }

    const yearsMap = {};

    response.results.forEach((page) => {
      const props = page.properties;
      const title = props.Title?.title?.map(t => t.plain_text).join('') || 'Untitled Challenge';
      const eventName = props.EventName?.rich_text?.map(t => t.plain_text).join('') || props.EventName?.select?.name || 'CTF Writeups';
      const eventDesc = props.EventDesc?.rich_text?.map(t => t.plain_text).join('') || props.Summary?.rich_text?.map(t => t.plain_text).join('') || '';
      const year = props.Year?.select?.name || props.Year?.rich_text?.map(t => t.plain_text).join('') || '2026';
      const category = props.Category?.select?.name || props.Category?.multi_select?.[0]?.name || 'General';
      const challSlug = props.Slug?.rich_text?.map(t => t.plain_text).join('') || page.id;
      const eventSlug = props.EventSlug?.rich_text?.map(t => t.plain_text).join('') || eventName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const date = props.Date?.date?.start || props.Date?.rich_text?.map(t => t.plain_text).join('') || '2026-08-19';
      const readTime = props.ReadTime?.rich_text?.map(t => t.plain_text).join('') || '5 min read';
      const description = props.Summary?.rich_text?.map(t => t.plain_text).join('') || '';

      const rawThumbnail = props.Thumbnail?.url || props.Thumbnail?.rich_text?.[0]?.plain_text || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80';
      const thumbnail = formatImageUrl(rawThumbnail);

      const parsedTags = props.Tags?.multi_select?.map(t => (t.name.startsWith('#') ? t.name : `#${t.name}`))
        || (props.Tags?.rich_text?.[0]?.plain_text ? props.Tags.rich_text[0].plain_text.split(',').map(t => t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`) : null)
        || ['#CTF', `#${year}`];

      if (!yearsMap[year]) {
        yearsMap[year] = { year, eventsMap: {} };
      }

      if (!yearsMap[year].eventsMap[eventSlug]) {
        yearsMap[year].eventsMap[eventSlug] = {
          id: eventSlug,
          slug: eventSlug,
          title: eventName,
          thumbnail: thumbnail,
          description: eventDesc,
          author: { name: 'dadan' },
          date: date,
          readTime: readTime,
          subpostsCount: 0,
          tags: parsedTags,
          overview: {
            heading: eventName,
            content: eventDesc,
          },
          subposts: []
        };
      }

      yearsMap[year].eventsMap[eventSlug].subposts.push({
        id: page.id,
        notionPageId: page.id,
        slug: challSlug,
        title: title,
        category: category,
        readTime: readTime,
        date: date,
        author: 'dadan',
        description: description,
        tags: parsedTags,
      });

      const allEventTags = Array.from(new Set(yearsMap[year].eventsMap[eventSlug].subposts.flatMap(s => s.tags)));
      yearsMap[year].eventsMap[eventSlug].tags = allEventTags.length > 0 ? allEventTags : ['#CTF', `#${year}`];
      yearsMap[year].eventsMap[eventSlug].subpostsCount = yearsMap[year].eventsMap[eventSlug].subposts.length;
    });

    const result = Object.values(yearsMap).map(yObj => ({
      year: yObj.year,
      events: Object.values(yObj.eventsMap).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    })).sort((a, b) => Number(b.year) - Number(a.year));

    return result;
  } catch (error) {
    console.warn('Notion API fetch error for CTF events:', error.message);
    return [];
  }
}

export async function getEventBySlugNotion(eventSlug) {
  const years = await getEventsByYearNotion();
  for (const yearObj of years) {
    const found = yearObj.events.find(e => e.slug === eventSlug);
    if (found) return found;
  }
  return null;
}

export async function getSubpostNotion(eventSlug, challSlug) {
  const event = await getEventBySlugNotion(eventSlug);
  if (event) {
    const subpost = event.subposts.find(s => s.slug === challSlug);
    if (subpost) {
      if (subpost.notionPageId && n2m) {
        try {
          const mdblocks = await n2m.pageToMarkdown(subpost.notionPageId);
          const mdObject = n2m.toMarkdownString(mdblocks);
          subpost.contentMarkdown = mdObject.parent || '';
        } catch (e) {
          console.warn('Failed to parse Notion markdown body:', e.message);
        }
      }
      return { event, subpost };
    }
  }

  return null;
}
