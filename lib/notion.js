import { Client } from '@notionhq/client';
import { awardingsData, completionsData } from '../src/components/data/CertificatesData';

const notionApiKey = process.env.NOTION_API_KEY;
const certificatesDbId = process.env.NOTION_CERTIFICATES_DB_ID;
const blogDbId = process.env.NOTION_BLOG_DB_ID;

export const notion = notionApiKey ? new Client({ auth: notionApiKey }) : null;

/**
 * Fetch certificates from Notion Database or fallback to local static data
 */
export async function getCertificates(typeFilter = 'awardings') {
  if (!notion || !certificatesDbId) {
    return typeFilter === 'awardings' ? awardingsData : completionsData;
  }

  try {
    const response = await notion.databases.query({
      database_id: certificatesDbId,
      filter: {
        property: 'Type',
        select: {
          equals: typeFilter === 'awardings' ? 'Award' : 'Completion',
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    const items = response.results.map((page, index) => {
      const props = page.properties;
      return {
        id: page.id || index + 1,
        title: props.Title?.title[0]?.plain_text || 'Untitled Certificate',
        issuer: props.Issuer?.select?.name || props.Issuer?.rich_text[0]?.plain_text || 'Issuer',
        date: props.Date?.date?.start || props.Date?.rich_text[0]?.plain_text || '2026',
        description: props.Description?.rich_text[0]?.plain_text || '',
        link: props.Link?.url || props.Link?.rich_text[0]?.plain_text || '#',
      };
    });

    return items.length > 0
      ? items
      : typeFilter === 'awardings'
      ? awardingsData
      : completionsData;
  } catch (error) {
    console.warn(`Notion API fetch error for certificates (${typeFilter}), using fallback static data:`, error.message);
    return typeFilter === 'awardings' ? awardingsData : completionsData;
  }
}

/**
 * Fetch blog / CTF writeups list from Notion Database
 */
export async function getBlogPosts() {
  if (!notion || !blogDbId) {
    return [
      {
        id: 'sample-ctf-writeup',
        title: 'PicoCTF 2025 - Web Exploitation & Cryptography Writeups',
        slug: 'picoctf-2025-writeups',
        date: '2026-02-15',
        category: ['CTF', 'Web Security'],
        summary: 'Detailed writeup for solving Web Exploitation and Cryptography challenges in PicoCTF 2025.',
        published: true,
      },
      {
        id: 'sample-lks-cybersec',
        title: 'LKS Cyber Security 2026 - Incident Response & Forensic Writeup',
        slug: 'lks-cyber-security-2026',
        date: '2026-02-10',
        category: ['CTF', 'Forensics'],
        summary: 'Walkthrough and analysis of network forensic and digital forensic challenges from LKS XXXIV Kota Semarang.',
        published: true,
      }
    ];
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

    return response.results.map((page) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Title?.title[0]?.plain_text || 'Untitled Writeup',
        slug: props.Slug?.rich_text[0]?.plain_text || page.id,
        date: props.Date?.date?.start || '2026-01-01',
        category: props.Category?.multi_select?.map((cat) => cat.name) || ['Blog'],
        summary: props.Summary?.rich_text[0]?.plain_text || '',
        published: props.Published?.checkbox ?? true,
      };
    });
  } catch (error) {
    console.warn('Notion API fetch error for blog posts, using fallback:', error.message);
    return [
      {
        id: 'sample-ctf-writeup',
        title: 'PicoCTF 2025 - Web Exploitation & Cryptography Writeups',
        slug: 'picoctf-2025-writeups',
        date: '2026-02-15',
        category: ['CTF', 'Web Security'],
        summary: 'Detailed writeup for solving Web Exploitation and Cryptography challenges in PicoCTF 2025.',
        published: true,
      },
      {
        id: 'sample-lks-cybersec',
        title: 'LKS Cyber Security 2026 - Incident Response & Forensic Writeup',
        slug: 'lks-cyber-security-2026',
        date: '2026-02-10',
        category: ['CTF', 'Forensics'],
        summary: 'Walkthrough and analysis of network forensic and digital forensic challenges from LKS XXXIV Kota Semarang.',
        published: true,
      }
    ];
  }
}
