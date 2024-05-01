export const postQuery = `
  *[_type == "post"]{
    ...,
    "mainImage": mainImage.asset -> url,
    author->,
  } | order(_createdAt desc)
`;
