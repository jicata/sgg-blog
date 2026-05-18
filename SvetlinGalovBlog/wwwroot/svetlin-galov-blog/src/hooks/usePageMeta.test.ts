import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, cleanup } from '@testing-library/react';
import { usePageMeta } from './usePageMeta';

describe('usePageMeta', () => {
  const originalTitle = 'original-title';

  beforeEach(() => {
    document.title = originalTitle;
    // Remove any existing meta tags added by previous tests
    document.querySelectorAll('meta[name="description"], meta[property^="og:"]').forEach(el => el.remove());
  });

  it('sets document.title on mount', () => {
    renderHook(() => usePageMeta({ title: 'Test Page' }));
    expect(document.title).toBe('Test Page');
  });

  it('sets meta description on mount', () => {
    renderHook(() => usePageMeta({ title: 'Test', description: 'Test description' }));
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    expect(meta).not.toBeNull();
    expect(meta.content).toBe('Test description');
  });

  it('sets og:title on mount', () => {
    renderHook(() => usePageMeta({ title: 'OG Test', og: { title: 'OG Title' } }));
    const meta = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    expect(meta).not.toBeNull();
    expect(meta.content).toBe('OG Title');
  });

  it('restores document.title on unmount', () => {
    const { unmount } = renderHook(() => usePageMeta({ title: 'New Title' }));
    expect(document.title).toBe('New Title');
    unmount();
    expect(document.title).toBe(originalTitle);
  });

  it('removes meta description on unmount', () => {
    const { unmount } = renderHook(() => usePageMeta({ title: 'X', description: 'desc' }));
    unmount();
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).toBeNull();
  });

  it('sets og:image to default /og-image.png when og block provided without image', () => {
    renderHook(() => usePageMeta({ title: 'Test', og: { title: 'OG Title' } }));
    const meta = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    expect(meta).not.toBeNull();
    expect(meta.content).toBe('/og-image.png');
  });

  it('uses provided og:image when explicitly set', () => {
    renderHook(() =>
      usePageMeta({ title: 'Test', og: { title: 'OG Title', image: '/custom.png' } }),
    );
    const meta = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    expect(meta).not.toBeNull();
    expect(meta.content).toBe('/custom.png');
  });

  it('removes og:image on unmount when og block provided without explicit image', () => {
    const { unmount } = renderHook(() =>
      usePageMeta({ title: 'Test', og: { title: 'OG Title' } }),
    );
    const metaBefore = document.querySelector('meta[property="og:image"]');
    expect(metaBefore).not.toBeNull();
    unmount();
    const metaAfter = document.querySelector('meta[property="og:image"]');
    expect(metaAfter).toBeNull();
  });
});
