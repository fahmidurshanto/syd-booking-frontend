import { Suspense } from "react";
import CustomerHeader from "@/components/CustomerHeader";

export const metadata = {
  title: "Passenger Portal | SYD Airport Transfer & Chauffeur",
  description: "Manage bookings, track rides, view invoices and update profile.",
};

export default function CustomerLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#0b0c10] text-white font-sans selection:bg-[#c8a05c]/30 selection:text-white">
      {/* Background glow effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#c8a05c]/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1f2430_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      <Suspense fallback={<div className="h-16 w-full border-b border-white/10 bg-zinc-950/80" />}>
        <CustomerHeader />
      </Suspense>

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Suspense fallback={<div className="text-center py-20 text-xs text-zinc-400">Loading...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
