import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cancelTrip } from "@/app/stay-actions";

export const dynamic = "force-dynamic";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

export default async function TripsPage() {
  const user = await requireUser();

  const trips = await prisma.trip.findMany({
    where: { userId: user.id },
    include: { listing: true },
    orderBy: { startsAt: "asc" },
  });

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <p className="text-sm font-semibold text-sky-700">Travel</p>
      <h1 className="text-4xl font-bold tracking-tight">My trips</h1>
      <p className="mt-2 text-slate-500">Upcoming and saved reservations.</p>

      <div className="mt-8 space-y-4">
        {trips.length ? trips.map((trip) => (
          <article key={trip.id} className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href={`/listing/${trip.listing.id}`} className="text-xl font-bold hover:text-sky-700">
                {trip.listing.title}
              </Link>
              <p className="mt-1 text-slate-500">{trip.listing.location}</p>
              <p className="mt-3 text-sm font-medium text-slate-700">
                {trip.startsAt ? formatDate(trip.startsAt) : "Date TBD"} → {trip.endsAt ? formatDate(trip.endsAt) : "Date TBD"}
              </p>
            </div>
            <form action={cancelTrip}>
              <input type="hidden" name="tripId" value={trip.id} />
              <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:border-red-300 hover:text-red-700">
                Cancel trip
              </button>
            </form>
          </article>
        )) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="font-semibold">No trips booked yet.</p>
            <Link href="/search" className="mt-2 inline-block text-sm font-semibold text-sky-700">Explore stays →</Link>
          </div>
        )}
      </div>
    </section>
  );
}
