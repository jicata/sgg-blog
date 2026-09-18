import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Project = CollectionEntry<'projects'>;

const isProduction = import.meta.env.PROD;

/** The single place drafts are filtered. Every list, feed and route goes through here. */
export async function getPublishedPosts(): Promise<Post[]> {
  const all = await getCollection('posts', ({ data }) => !(isProduction && data.draft));
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function readingTime(body: string | undefined): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
