"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function toggleWishlist(formData) {
  const user = await requireUser();
  const listingId = String(formData.get("listingId") ?? "");

  if (!listingId) {
    throw new Error("A listing is required.");
  }

  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_listingId: {
        userId: user.id,
        listingId,
      },
    },
  });

  if (existing) {
    await prisma.wishlist.delete({ where: { id: existing.id } });
  } else {
    await prisma.wishlist.create({
      data: {
        userId: user.id,
        listingId,
      },
    });
  }

  revalidatePath(`/listing/${listingId}`);
  revalidatePath("/wishlist");
}

export async function createTrip(formData) {
  const user = await requireUser();
  const listingId = String(formData.get("listingId") ?? "");
  const startsAtRaw = String(formData.get("startsAt") ?? "");
  const endsAtRaw = String(formData.get("endsAt") ?? "");

  const startsAt = new Date(startsAtRaw);
  const endsAt = new Date(endsAtRaw);
  const now = new Date();

  if (
    !listingId ||
    Number.isNaN(startsAt.getTime()) ||
    Number.isNaN(endsAt.getTime()) ||
    startsAt < new Date(now.toDateString()) ||
    endsAt <= startsAt
  ) {
    throw new Error("Choose a valid check-in and check-out date.");
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { id: true, ownerId: true },
  });

  if (!listing) {
    throw new Error("Listing not found.");
  }

  if (listing.ownerId === user.id) {
    throw new Error("You cannot reserve your own listing.");
  }

  const booked = await prisma.$transaction(
    async (tx) => {
      const conflict = await tx.trip.findFirst({
        where: {
          listingId,
          AND: [
            { startsAt: { lt: endsAt } },
            { endsAt: { gt: startsAt } },
          ],
        },
      });

      if (conflict) {
        return false;
      }

      await tx.trip.create({
        data: {
          userId: user.id,
          listingId,
          startsAt,
          endsAt,
        },
      });

      return true;
    },
    {
      isolationLevel: "Serializable",
    }
  );

  if (!booked) {
    redirect(`/listing/${listingId}?error=Those%20dates%20are%20not%20available`);
  }

  revalidatePath("/trips");
  redirect("/trips");
}

export async function cancelTrip(formData) {
  const user = await requireUser();
  const tripId = String(formData.get("tripId") ?? "");

  await prisma.trip.deleteMany({
    where: {
      id: tripId,
      userId: user.id,
    },
  });

  revalidatePath("/trips");
}
