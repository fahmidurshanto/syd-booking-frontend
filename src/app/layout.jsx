import "./globals.css";

export const metadata = {
  title: "SYD Airport Transfer | Australia's Chauffeur Service",
  description:
    "Australia's premier chauffeur and airport transfer service. Premium airport transfers, corporate travel, tours and event transport across Australia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-[#0d0e12] text-white">
        {children}
      </body>
    </html>
  );
}
