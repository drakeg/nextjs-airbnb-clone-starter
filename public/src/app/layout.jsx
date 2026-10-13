import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Roost",
  description: "Find memorable places to stay.",
};

export default function RootLayout({ children }) {
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
              <Link href="/my-listings" className="hover:text-slate-950">
                My listings
              </Link>
              <Link
                href="/new-listing"
                className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-800"
              >
                Host a stay
              </Link>
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
