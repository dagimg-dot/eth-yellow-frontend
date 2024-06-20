export const dynamicQuery = (filter) => {
  return `
    query GetFilteredBusinesses(
      ${filter.cityNames.length === 0 ? "" : "$cityNames: [name!]!"}
        ${filter.categoryNames.length === 0 ? "" : "$categoryNames: [name!]!"}
        ${filter.query === "" ? "" : "$query: String!"}
        ${filter.owner_id === null || undefined ? "" : "$owner_id: uuid!"}
    ) {
      businesses(
        where: {
            ${
              filter.cityNames.length === 0
                ? ""
                : "locations: {city: {_in: $cityNames}}"
            }
            ${
              filter.categoryNames.length === 0
                ? ""
                : "business_categories: { category: { name: { _in: $categoryNames } } }"
            }
          ${filter.query === "" ? "" : "name: { _ilike: $query }"}
          ${
            filter.owner_id === null || undefined
              ? ""
              : "owner_id: {_eq: $owner_id}"
          }

        }
      ) {
        business_id
        name
        description
        locations {
          city
          country
        }
      }
    }
  `;
};
