import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export function useSanityData<T>(query: string, params?: Record<string, any>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await client.fetch<T>(query, params);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Sanity fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}

// Specific hooks for common queries
export function useTestimonials() {
  return useSanityData(`
    *[_type == "testimonial" && approved == true] | order(_createdAt desc) {
      _id,
      name,
      role,
      company,
      quote,
      rating,
      photo {
        asset -> {
          _id,
          url
        }
      }
    }
  `);
}

export function useServices() {
  return useSanityData(`
    *[_type == "service" && visible == true] | order(order asc) {
      _id,
      title,
      shortDescription,
      description,
      icon,
      features[],
      ctaText,
      ctaLink
    }
  `);
}