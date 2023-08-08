import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StockOverflow",
  description: "A portfolio tracker for the masses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex h-16 items-center border-b px-4">
              <MainNav />
            </div>
            {children}
          </ThemeProvider>
          <TailwindIndicator />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
