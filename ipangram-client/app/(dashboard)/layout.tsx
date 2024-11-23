"use client";

import Navbar from "@/components/dashboard/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="w-full">
          <main className=" w-full mt-12  p-10">
            <Navbar />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
