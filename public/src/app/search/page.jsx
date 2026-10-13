import ListingCard from "@/components/listingCard";
import { getListings } from "@/lib/listings";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q ?? "";
  const listings = await getListings({ query });

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-sky-700">Explore</p>
        <h1 className="text-4xl font-bold tracking-tight">
          {query ? `Results for “${query}”` : "All stays"}
        </h1>
        <form className="mt-5 flex max-w-xl gap-3">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search stays"
            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-sky-500"
          />
          <button className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white">
            Search
          </button>
        </form>
      </div>

      {listings.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <h2 className="text-xl font-semibold">No stays matched that search.</h2>
          <p className="mt-2 text-slate-500">Try a broader location or stay type.</p>
        </div>
      )}
    </section>
  );
}
