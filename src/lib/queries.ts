export const servicesQuery = /* groq */ `
  *[_type == "service" && visible == true]{
    _id,
    title,
    short_description,
    icon,
    points
  } | order(_createdAt asc)
`;