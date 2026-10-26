"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function cancelHostedReservation(formData) {
  const host = await requireUser();
  const tripId = String(formData.get("tripId") ?? "");

  if (!tripId) return;

  await prisma.trip.deleteMany({
    where: {
      id: tripId,
      listing: {
        ownerId: host.id,
      },
    },
  });

  revalidatePath("/host/reservations");
}
