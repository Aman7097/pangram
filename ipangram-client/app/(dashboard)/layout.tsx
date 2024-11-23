"use client";

import PageHeader from "@/components/dashboard/header";
import Navbar from "@/components/dashboard/navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="bottom-center" />
        <main className=" w-full mt-12  p-10">
          <Navbar />
          <PageHeader />
          {children}
        </main>
      </body>
    </html>
  );
}
