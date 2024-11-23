import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/userContext";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const userData = headersList.get("x-user-data");
  const initialUser = userData ? JSON.parse(userData) : null;
  return (
    <AuthProvider initialUser={initialUser}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
