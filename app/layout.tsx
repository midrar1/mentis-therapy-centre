import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClinicGrowth Lab — Private practice websites that convert",
  description:
    "A live private-clinic website demo built to turn expertise into patient trust and booked consultations.",
  keywords: [
    "private clinic website",
    "doctor marketing",
    "patient acquisition",
    "healthcare branding",
  ],
  openGraph: {
    title: "ClinicGrowth Lab",
    description: "Private practice websites that turn expertise into patient trust and booked consultations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
