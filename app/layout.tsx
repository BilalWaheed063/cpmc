import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Central Park Medical College | Medical Education & Patient Care in Lahore",
  description: "Discover medical education, nursing, allied health and clinical training at Central Park Medical College, Lahore. Explore our campus, teaching hospital and admissions.",
  robots: { index: false, follow: false },
  icons: { icon: "/assets/logo.png", shortcut: "/assets/logo.png" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
