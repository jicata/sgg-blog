import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '../lib/content';
import { href } from '../lib/url';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const site = new URL(import.meta.env.BASE_URL, context.site!);
  const selfUrl = new URL(href('/rss.xml'), context.site!).href;

  return rss({
    title: 'Svetlin Galov',
    description: 'Backend tech lead, agentic-first. Notes on C#/.NET systems and building with coding agents as teammates.',
    site,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<atom:link href="${selfUrl}" rel="self" type="application/rss+xml"/>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: href(`/posts/${post.id}/`),
    })),
  });
}
