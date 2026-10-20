"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  destroySession,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";

function normalizeUsername(value) {
  return String(value ?? "").trim().toLowerCase();
}

export async function register(formData) {
  const username = normalizeUsername(formData.get("username"));
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (username.length < 3 || password.length < 10) {
    redirect("/register?error=Username%20must%20be%203%2B%20characters%20and%20password%2010%2B");
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) redirect("/register?error=Username%20already%20exists");

  const user = await prisma.user.create({
    data: {
      username,
      firstName: firstName || null,
      lastName: lastName || null,
      password: await hashPassword(password),
    },
  });

  await createSession(user.id);
  redirect("/");
}

export async function login(formData) {
  const username = normalizeUsername(formData.get("username"));
  const password = String(formData.get("password") ?? "");

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await verifyPassword(password, user.password))) {
    redirect("/login?error=Invalid%20username%20or%20password");
  }

  await createSession(user.id);
  redirect("/");
}

export async function logout() {
  await destroySession();
  redirect("/");
}
