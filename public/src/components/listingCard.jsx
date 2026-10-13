import Link from "next/link";

export default function ListingCard({ listing }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/listing/${listing.id}`} className="block">
        <div className="flex h-52 items-end bg-gradient-to-br from-sky-200 via-indigo-100 to-amber-100 p-5">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            {listing.placeType}
          </span>
        </div>
        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                {listing.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{listing.location}</p>
            </div>
            <span className="whitespace-nowrap text-sm font-medium text-slate-700">
              ★ {listing.rating}
            </span>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-sm text-slate-500">
              {listing.guests} guests · {listing.bedrooms} bedroom
              {listing.bedrooms === 1 ? "" : "s"}
            </p>
            <p className="text-slate-950">
              <span className="font-semibold">${listing.price}</span>
              <span className="text-sm text-slate-500"> / night</span>
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
