// GROQ queries for fetching content from Sanity

export const getTestimonials = `
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
    },
    _createdAt
  }
`;

export const getServices = `
  *[_type == "service" && visible == true] | order(order asc) {
    _id,
    title,
    shortDescription,
    description,
    icon,
    features[],
    ctaText,
    ctaLink,
    order,
    _createdAt
  }
`;

export const getCaseStudies = `
  *[_type == "caseStudy" && published == true] | order(_createdAt desc) {
    _id,
    title,
    client,
    industry,
    challenge,
    solution,
    results,
    image {
      asset -> {
        _id,
        url
      }
    },
    _createdAt
  }
`;

export const getBlogPosts = `
  *[_type == "blogPost" && published == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    author,
    publishedAt,
    featuredImage {
      asset -> {
        _id,
        url
      }
    },
    categories[]-> {
      title,
      slug
    }
  }
`;

export const getSettings = `
  *[_type == "settings"][0] {
    _id,
    siteTitle,
    siteDescription,
    logo {
      asset -> {
        _id,
        url
      }
    },
    socialMedia {
      instagram,
      linkedin,
      twitter,
      whatsapp
    },
    contactInfo {
      email,
      phone,
      address
    }
  }
`;