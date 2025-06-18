import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2023-01-01',
});

// Helper function to get image URL from Sanity
export const urlFor = (source: any) => {
  if (!source?.asset?._ref) return '';
  
  const ref = source.asset._ref;
  const [, id, dimensions, format] = ref.split('-');
  const [width, height] = dimensions.split('x');
  
  return `https://cdn.sanity.io/images/${import.meta.env.VITE_SANITY_PROJECT_ID}/${import.meta.env.VITE_SANITY_DATASET}/${id}-${dimensions}.${format}`;
};