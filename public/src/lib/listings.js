import { listings } from "@/data/listings";

export async function getListings({ query = "" } = {}) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return listings;
  }

  return listings.filter((listing) =>
    [
      listing.title,
      listing.location,
      listing.locationType,
      listing.placeType,
      listing.description,
    ].some((value) => value.toLowerCase().includes(normalized))
  );
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
