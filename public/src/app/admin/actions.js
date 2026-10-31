"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function setListingFeatured(formData) {
  await requireAdmin();

  const listingId = String(formData.get("listingId") ?? "");
  const featured = String(formData.get("featured") ?? "") === "true";

  if (!listingId) return;

  await prisma.listing.update({
    where: { id: listingId },
    data: { featured },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function setUserRole(formData) {
  const admin = await requireAdmin();

  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");

  if (!userId || !["USER", "ADMIN"].includes(role) || userId === admin.id) {
    return;
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/admin");
}
