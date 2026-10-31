import Link from "next/link";
import ListingCard from "@/components/listingCard";
import { getListingsForOwner } from "@/lib/listings";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function MyListingsPage() {
  const user = await requireUser();
  const listings = await getListingsForOwner(user.id);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-sm font-semibold text-sky-700">Hosting</p>
      <h1 className="text-4xl font-bold tracking-tight">My listings</h1>
      <p className="mt-2 text-slate-500">
        Listings owned by @{user.username}.
      </p>

      {listings.length ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <div key={listing.id} className="space-y-3">
              <ListingCard listing={listing} />
              <Link
                href={`/my-listings/${listing.id}/edit`}
                className="block rounded-xl border border-slate-300 bg-white px-4 py-2 text-center text-sm font-semibold hover:border-sky-400 hover:text-sky-700"
              >
                Edit listing
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-semibold">You have not created a listing yet.</p>
          <Link
            href="/new-listing"
            className="mt-3 inline-block text-sm font-semibold text-sky-700"
          >
            Create your first listing →
          </Link>
        </div>
      )}
    </section>
  );
}
