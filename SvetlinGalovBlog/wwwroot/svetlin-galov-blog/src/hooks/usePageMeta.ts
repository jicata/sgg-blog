import { useEffect } from 'react';

interface OgMeta {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

interface PageMeta {
  title: string;
  description?: string;
  og?: OgMeta;
}

function setMeta(name: string, content: string, property = false): HTMLMetaElement {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
  return el;
}

function removeMeta(name: string, property = false): void {
  const attr = property ? 'property' : 'name';
  document.querySelector(`meta[${attr}="${name}"]`)?.remove();
}

export function usePageMeta({ title, description, og }: PageMeta): void {
  useEffect(() => {
    const prevTitle = document.title;

    document.title = title;

    if (description) setMeta('description', description);

    if (og) {
      if (og.title) setMeta('og:title', og.title, true);
      if (og.description) setMeta('og:description', og.description, true);
      if (og.image) setMeta('og:image', og.image, true);
      if (og.url) setMeta('og:url', og.url, true);
      if (og.type) setMeta('og:type', og.type, true);
    }

    return () => {
      document.title = prevTitle;
      if (description) removeMeta('description');
      if (og) {
        if (og.title) removeMeta('og:title', true);
        if (og.description) removeMeta('og:description', true);
        if (og.image) removeMeta('og:image', true);
        if (og.url) removeMeta('og:url', true);
        if (og.type) removeMeta('og:type', true);
      }
    };
  }, [title, description, og]);
}
