"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, requireUser, verifyPassword } from "@/lib/auth";

export async function updateProfile(formData) {
  const user = await requireUser();

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName: firstName || null,
      lastName: lastName || null,
    },
  });

  revalidatePath("/account");
  revalidatePath("/");
  redirect("/account?saved=profile");
}

export async function changePassword(formData) {
  const user = await requireUser();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");

  if (newPassword.length < 10) {
    redirect("/account?error=New%20password%20must%20be%20at%20least%2010%20characters");
  }

  const record = await prisma.user.findUnique({
    where: { id: user.id },
    select: { password: true },
  });

  if (!record || !(await verifyPassword(currentPassword, record.password))) {
    redirect("/account?error=Current%20password%20is%20incorrect");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: await hashPassword(newPassword) },
  });

  await prisma.session.deleteMany({
    where: {
      userId: user.id,
      id: { not: undefined },
    },
  });

  redirect("/login");
}
