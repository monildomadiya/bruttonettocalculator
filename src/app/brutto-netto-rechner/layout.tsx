import type { Metadata } from "next";
import { CALCULATOR_SEO } from "@/lib/seo";

const s = CALCULATOR_SEO.home;

export const metadata: Metadata = {
  title: s.title,
  description: s.description,
  keywords: s.keywords.join(", "),
  alternates: {
    canonical: "/brutto-netto-rechner",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
