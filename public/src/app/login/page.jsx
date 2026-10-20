import Link from "next/link";
import { login } from "@/app/auth/actions";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  return (
    <section className="mx-auto max-w-md px-6 py-14">
      <h1 className="text-4xl font-bold">Sign in</h1>
      {params?.error ? <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{params.error}</p> : null}
      <form action={login} className="mt-8 space-y-5 rounded-3xl bg-white p-7 shadow-sm">
        <input name="username" required placeholder="Username" className="w-full rounded-xl border px-4 py-3" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-xl border px-4 py-3" />
        <button className="w-full rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white">Sign in</button>
      </form>
      <p className="mt-5 text-sm text-slate-600">New to Roost? <Link href="/register" className="font-semibold text-sky-700">Create an account</Link></p>
    </section>
  );
}
