import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ali & Sons Real Estate | ASRE",
  description:
    "Ali & Sons Real Estate — trusted property management across Abu Dhabi and Dubai. A division of Ali & Sons Holding, est. 1979.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=DM+Sans:500,400"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-charcoal dark:bg-charcoal dark:text-cream transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SmoothScroll>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Chatbot />
            <CustomCursor />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
