import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StepContextProvider from "@/React Context/stepContext";
import "./globals.css";
import Sidebar from "@/Components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multi-Step Form",
  description: "A Frontend Mentor Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-fullBackground min-h-screen flex md:items-center md:justify-center`}
      >
        <StepContextProvider>
          <main className="w-full md:max-w-4xl md:bg-white md:shadow-xl md:p-4 md:rounded-xl md:min-h-[600px] flex md:flex-row flex-col md:gap-10">
            <section className="w-full md:w-1/4">
              <Sidebar />
            </section>
            <section className="w-full md:w-3/4">{children}</section>
          </main>
        </StepContextProvider>
      </body>
    </html>
  );
}
