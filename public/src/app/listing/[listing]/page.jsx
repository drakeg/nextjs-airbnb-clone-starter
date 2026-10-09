import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById } from "@/lib/listings";

export default async function ListingPage({ params }) {
  const { listing: id } = await params;
  const listing = await getListingById(id);

  if (!listing) notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/search" className="text-sm font-semibold text-sky-700">
        ← Back to stays
      </Link>
      <div className="mt-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-200 via-indigo-100 to-amber-100">
        <div className="h-80 sm:h-[28rem]" />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <p className="text-sm font-semibold text-sky-700">
            {listing.placeType} · {listing.locationType}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{listing.title}</h1>
          <p className="mt-3 text-slate-500">
            {listing.location} · {listing.guests} guests · {listing.bedrooms} bedroom
            {listing.bedrooms === 1 ? "" : "s"} · ★ {listing.rating}
          </p>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-700">
            {listing.description}
          </p>
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-sm text-slate-500">Hosted by</p>
            <p className="font-semibold">{listing.owner}</p>
          </div>
        </div>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <p className="text-2xl font-bold">${listing.price} <span className="text-base font-normal text-slate-500">/ night</span></p>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            Reservation checkout is coming in the next migration phase.
          </div>
          <button className="mt-5 w-full rounded-2xl bg-sky-400 px-5 py-4 font-bold text-slate-950">
            Check availability
          </button>
        </aside>
      </div>
    </section>
  );
}
