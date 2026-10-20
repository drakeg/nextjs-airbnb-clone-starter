import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logout } from "@/app/auth/actions";
import "./globals.css";

export const metadata = {
  title: "Roost",
  description: "Find memorable places to stay.",
};

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
            <Link href="/" className="text-2xl font-black tracking-tight">
              Roost
            </Link>
            <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
              <Link href="/search" className="hover:text-slate-950">
                Explore
              </Link>
              {user ? (
                <>
                  <Link href="/wishlist" className="hover:text-slate-950">
                    Wishlist
                  </Link>
                  <Link href="/trips" className="hover:text-slate-950">
                    Trips
                  </Link>
                  <Link href="/my-listings" className="hover:text-slate-950">
                    My listings
                  </Link>
                  <Link
                    href="/new-listing"
                    className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-800"
                  >
                    Host a stay
                  </Link>
                  <span className="text-slate-400">@{user.username}</span>
                  <form action={logout}>
                    <button className="hover:text-slate-950">Sign out</button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-slate-950">
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-800"
                  >
                    Create account
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-500">
            Roost · A simpler place to discover and host memorable stays.
          </div>
        </footer>
      </body>
    </html>
  );
}
