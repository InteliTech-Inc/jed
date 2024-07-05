export const postQuery = `
  *[_type == "post"]{
    ...,
    "mainImage": mainImage.asset -> url,
    author->,
  } | order(_createdAt desc)
`;

export const commissionQuery = `
*[_type == "commission_rate"]{
    _id,
    commission,
}

`;
