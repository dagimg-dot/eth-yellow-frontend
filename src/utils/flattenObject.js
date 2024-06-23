export const flattenListingObj = (listing) => {
    return {
      name: listing.name,
      description: listing.description,
      email: listing.contact_details[0].email,
      phone_number: listing.contact_details[0].phone_number,
      website: listing.contact_details[0].website,
      address: listing.locations[0].address,
      isAddressFetched: false,
      city: listing.locations[0].city,
      latitude: listing.locations[0].latitude,
      longitude: listing.locations[0].longitude,
      country: listing.locations[0].country,
      postal_code: listing.locations[0].postal_code,
      categories: listing.business_categories.map((c) => c.category.name),
    };
  };
  