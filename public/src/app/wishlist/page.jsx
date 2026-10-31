import ListingCard from "@/components/listingCard";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function toCard(listing) {
  return {
    id: listing.id,
    title: listing.title,
    description: listing.description ?? "",
    location: listing.location,
    locationType: listing.locationType,
    placeType: listing.placeType,
    price: listing.price,
    guests: listing.guests,
    bedrooms: listing.bedrooms,
    rating: listing.rating,
    owner:
      listing.owner?.username ??
      [listing.owner?.firstName, listing.owner?.lastName].filter(Boolean).join(" ") ??
      "Roost host",
    featured: listing.featured,
    photos: Array.isArray(listing.photos) ? listing.photos : [],
  };
}

export default async function WishlistPage() {
  const user = await requireUser();

  const items = await prisma.wishlist.findMany({
    where: { userId: user.id },
    include: {
      listing: {
        include: { owner: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-sm font-semibold text-sky-700">Saved stays</p>
      <h1 className="text-4xl font-bold tracking-tight">Wishlist</h1>
      <p className="mt-2 text-slate-500">Places you want to come back to.</p>

      {items.length ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map(({ listing }) => (
            <ListingCard key={listing.id} listing={toCard(listing)} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-semibold">Your wishlist is empty.</p>
          <p className="mt-2 text-sm text-slate-500">Save a stay from its listing page.</p>
        </div>
      )}
    </section>
  );
}
