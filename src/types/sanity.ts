// TypeScript interfaces for Sanity content types

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
  };
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  rating?: number;
  photo?: SanityImage;
  approved: boolean;
  _createdAt: string;
}

export interface Service {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  ctaText?: string;
  ctaLink?: string;
  order: number;
  visible: boolean;
  _createdAt: string;
}

export interface CaseStudy {
  _id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  image?: SanityImage;
  published: boolean;
  _createdAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  author: string;
  publishedAt: string;
  featuredImage?: SanityImage;
  categories: Array<{
    title: string;
    slug: {
      current: string;
    };
  }>;
  published: boolean;
}

export interface SiteSettings {
  _id: string;
  siteTitle: string;
  siteDescription: string;
  logo?: SanityImage;
  socialMedia: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    whatsapp?: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address?: string;
  };
}