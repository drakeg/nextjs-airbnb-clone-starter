import ListingCard from "@/components/listingCard";
import { getListingsForOwner } from "@/lib/listings";

export default async function MyListingsPage() {
  const listings = await getListingsForOwner("Mad Mallard Stays");

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-sm font-semibold text-sky-700">Hosting</p>
      <h1 className="text-4xl font-bold tracking-tight">My listings</h1>
      <p className="mt-2 text-slate-500">
        This view will become account-scoped when authentication is migrated.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}
