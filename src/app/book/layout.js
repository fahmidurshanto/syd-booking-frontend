import Link from "next/link";

export const metadata = {
  title: "Book Airport Transfer | SYD Airport Transfer",
  description:
    "Book premium Chauffeur and Taxi airport transfer services in Sydney.",
};

export default function BookLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#0b0c10] text-white font-sans select-none overflow-x-hidden">
      {/* Background glow & subtle luxury backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c8a05c]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-900/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1f2430_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo SYD Airport Transfer */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#d3ad6b]/60 flex items-center justify-center bg-black/40 shadow-inner group-hover:border-[#e7c27d] transition-all">
              <span className="text-[#c8a05c] font-sans font-black text-xs tracking-wider drop-shadow-md">
                SYD
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-lg font-serif tracking-[0.2em] text-[#e8c683] font-bold uppercase leading-none">
                SYD Airport
              </span>
              <span className="text-base sm:text-lg font-serif tracking-[0.2em] text-white font-bold uppercase leading-none mt-1">
                Transfer
              </span>
              <span className="text-[8px] tracking-[0.36em] text-zinc-300 uppercase font-light mt-1.5 leading-none">
                Chauffeur Services
              </span>
            </div>
          </Link>

          {/* Contact / Back to Home */}
          <div className="flex items-center gap-5">
            <a
              href="tel:1300615165"
              className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition-colors font-medium"
            >
              <svg
                className="w-3.5 h-3.5 text-zinc-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
              <span>1300 615 165</span>
            </a>
            <Link
              href="/"
              className="text-xs font-semibold px-4 py-2 rounded border border-white/20 hover:border-white text-zinc-200 hover:text-white transition-all bg-white/5 hover:bg-white/10"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}
