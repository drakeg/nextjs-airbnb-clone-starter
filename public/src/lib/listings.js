import { prisma } from "@/lib/prisma";

function toListingCard(listing) {
  const locationData =
    listing.locationData && typeof listing.locationData === "object"
      ? listing.locationData
      : {};

  const placeSpace =
    listing.placeSpace && typeof listing.placeSpace === "object"
      ? listing.placeSpace
      : {};

  return {
    id: listing.id,
    title: listing.title,
    description: listing.description ?? "",
    location: locationData.label ?? locationData.location ?? "Location coming soon",
    locationType: listing.locationType,
    placeType: listing.placeType,
    price: listing.price,
    guests: Number(placeSpace.guests ?? 1),
    bedrooms: Number(placeSpace.bedrooms ?? 1),
    rating: Number(placeSpace.rating ?? 5),
    owner:
      listing.owner?.username ??
      [listing.owner?.firstName, listing.owner?.lastName].filter(Boolean).join(" ") ??
      "Roost host",
    featured: Boolean(placeSpace.featured),
  };
}

export async function getListings({
  query = "",
  placeType = "",
  guests = "",
  maxPrice = "",
  sort = "recommended",
} = {}) {
  const minimumGuests = Number.parseInt(guests, 10);
  const maximumPrice = Number.parseInt(maxPrice, 10);

  const listings = await prisma.listing.findMany({
    where: {
      ...(query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              { locationType: { contains: query, mode: "insensitive" } },
              { placeType: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(placeType ? { placeType } : {}),
      ...(Number.isFinite(maximumPrice) ? { price: { lte: maximumPrice } } : {}),
    },
    include: { owner: true },
  });

  let results = listings
    .map(toListingCard)
    .filter(
      (listing) =>
        !Number.isFinite(minimumGuests) || listing.guests >= minimumGuests
    );

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
  const listings = await prisma.listing.findMany({
    include: { owner: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return listings.map(toListingCard);
}

export async function getListingById(id) {
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { owner: true },
  });

  return listing ? toListingCard(listing) : null;
}

export async function getListingsForOwner(ownerUsername) {
  const listings = await prisma.listing.findMany({
    where: { owner: { username: ownerUsername } },
    include: { owner: true },
    orderBy: { createdAt: "desc" },
  });

  return listings.map(toListingCard);
}

export async function getListingFilterOptions() {
  const rows = await prisma.listing.findMany({
    distinct: ["placeType"],
    select: { placeType: true },
    orderBy: { placeType: "asc" },
  });

  return {
    placeTypes: rows.map((row) => row.placeType),
  };
}
