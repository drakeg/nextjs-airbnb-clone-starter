import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cancelHostedReservation } from "./actions";

export const dynamic = "force-dynamic";

function formatDate(value) {
  if (!value) return "Date TBD";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

export default async function HostReservationsPage() {
  const host = await requireUser();

  const trips = await prisma.trip.findMany({
    where: {
      listing: {
        ownerId: host.id,
      },
    },
    include: {
      listing: true,
      user: {
        select: {
          username: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: { startsAt: "asc" },
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <p className="text-sm font-semibold text-sky-700">Hosting</p>
      <h1 className="text-4xl font-bold tracking-tight">Reservations</h1>
      <p className="mt-2 text-slate-500">
        Trips booked against your listings.
      </p>

      <div className="mt-8 space-y-4">
        {trips.length ? (
          trips.map((trip) => {
            const guestName =
              [trip.user.firstName, trip.user.lastName].filter(Boolean).join(" ") ||
              `@${trip.user.username}`;

            return (
              <article
                key={trip.id}
                className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto]"
              >
                <div>
                  <Link
                    href={`/listing/${trip.listing.id}`}
                    className="text-xl font-bold hover:text-sky-700"
                  >
                    {trip.listing.title}
                  </Link>
                  <p className="mt-1 text-slate-500">{trip.listing.location}</p>
                  <div className="mt-4 grid gap-1 text-sm text-slate-700">
                    <p><span className="font-semibold">Guest:</span> {guestName}</p>
                    <p>
                      <span className="font-semibold">Dates:</span>{" "}
                      {formatDate(trip.startsAt)} → {formatDate(trip.endsAt)}
                    </p>
                  </div>
                </div>
                <form action={cancelHostedReservation} className="self-center">
                  <input type="hidden" name="tripId" value={trip.id} />
                  <button className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
                    Cancel reservation
                  </button>
                </form>
              </article>
            );
          })
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="font-semibold">No reservations yet.</p>
            <p className="mt-2 text-sm text-slate-500">
              Reservations will appear here when guests book your listings.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
