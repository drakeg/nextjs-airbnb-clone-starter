"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function setListingActive(formData) {
  const user = await requireUser();
  const listingId = String(formData.get("listingId") ?? "");
  const active = String(formData.get("active") ?? "") === "true";

  if (!listingId) return;

  await prisma.listing.updateMany({
    where: {
      id: listingId,
      ownerId: user.id,
    },
    data: { active },
  });

  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath("/my-listings");
  revalidatePath(`/listing/${listingId}`);
}
