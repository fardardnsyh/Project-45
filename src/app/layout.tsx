import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import SessionProvider from "@/components/SessionProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Jobtrackr",
  description:
    "Simple job tracker app built with Next.js, powered by Xata, Vercel, and Cloudflare",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <SessionProvider session={session}>
            <main
              className={`flex flex-col min-h-screen ${inter.className} antialiased`}
            >
              <Nav />
              {children}
              <Footer />
            </main>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
