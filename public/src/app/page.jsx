import Link from "next/link";
import ListingCard from "@/components/listingCard";
import { getFeaturedListings } from "@/lib/listings";

export default async function HomePage() {
  const listings = await getFeaturedListings();

  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
            Find your next stay
          </p>
          <h1 className="max-w-3xl text-5xl font-black tracking-tight sm:text-6xl">
            Places worth going out of your way for.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Cabins, campers, tiny homes, city stays, and memorable places in
            between—without the clutter.
          </p>
          <form action="/search" className="mt-8 flex max-w-2xl gap-3">
            <input
              name="q"
              placeholder="Search by place, region, or stay type"
              className="min-w-0 flex-1 rounded-2xl border-0 px-5 py-4 text-slate-950 outline-none ring-2 ring-transparent focus:ring-sky-400"
            />
            <button className="rounded-2xl bg-sky-400 px-6 py-4 font-bold text-slate-950 hover:bg-sky-300">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-sky-700">Featured stays</p>
            <h2 className="text-3xl font-bold tracking-tight">Start exploring</h2>
          </div>
          <Link href="/search" className="text-sm font-semibold text-slate-700 hover:text-slate-950">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </>
  );
}
