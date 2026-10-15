import { listings } from "@/data/listings";

export async function getListings({
  query = "",
  placeType = "",
  guests = "",
  maxPrice = "",
  sort = "recommended",
} = {}) {
  const normalized = query.trim().toLowerCase();
  const minimumGuests = Number.parseInt(guests, 10);
  const maximumPrice = Number.parseInt(maxPrice, 10);

  let results = listings.filter((listing) => {
    const matchesQuery =
      !normalized ||
      [
        listing.title,
        listing.location,
        listing.locationType,
        listing.placeType,
        listing.description,
      ].some((value) => value.toLowerCase().includes(normalized));

    const matchesType = !placeType || listing.placeType === placeType;
    const matchesGuests =
      !Number.isFinite(minimumGuests) || listing.guests >= minimumGuests;
    const matchesPrice =
      !Number.isFinite(maximumPrice) || listing.price <= maximumPrice;

    return matchesQuery && matchesType && matchesGuests && matchesPrice;
  });

  results = [...results];

  switch (sort) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    default:
      results.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          b.rating - a.rating
      );
  }

  return results;
}

export async function getFeaturedListings() {
  return listings.filter((listing) => listing.featured);
}

export async function getListingById(id) {
  return listings.find((listing) => listing.id === id) ?? null;
}

export async function getListingsForOwner(owner) {
  return listings.filter((listing) => listing.owner === owner);
}

export async function getListingFilterOptions() {
  return {
    placeTypes: [...new Set(listings.map((listing) => listing.placeType))].sort(),
  };
}
