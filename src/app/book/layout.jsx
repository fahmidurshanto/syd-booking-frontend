import Link from "next/link";

export const metadata = {
  title: "Book Airport Transfer | SYD Airport Transfer",
  description:
    "Book premium Chauffeur and Taxi airport transfer services in Sydney.",
};

export default function BookLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#f8fafc] text-slate-900 font-sans select-none overflow-x-hidden">
      {/* Background subtle light gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50/70 via-slate-50 to-transparent" />
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Header (Clean Hughes Light Header) */}
      <header className="relative z-20 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Logo SYD Airport Transfer */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full border border-[#c8a05c] flex items-center justify-center bg-slate-900 text-[#e8c683] shadow-sm">
              <span className="font-sans font-black text-xs tracking-wider">
                SYD
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-base font-serif tracking-[0.16em] text-slate-900 font-bold uppercase leading-tight">
                SYD Airport
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#b8860b] uppercase font-semibold">
                Chauffeur Services
              </span>
            </div>
          </Link>

          {/* Contact / Back to Home */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:+61404410000"
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              <svg
                className="w-3.5 h-3.5 text-slate-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
              <span>+61 404 410 000</span>
            </a>

            <Link
              href="/"
              className="text-xs font-semibold px-4 py-2 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 transition-all bg-white hover:bg-slate-50 shadow-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}
