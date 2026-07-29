import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import "./globals.css";

const accent = process.env.NEXT_PUBLIC_ACCENT_COLOR ?? "#fbbf24";

export const metadata: Metadata = {
  title: "Foldwork Supply",
  description:
    "Tools and materials for hand bookbinding. A small shop with a short list.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ "--accent": accent } as CSSProperties}>
      <body>
        <div className="shell">
          <nav className="nav">
            <span className="brand">
              Foldwork <span>Supply</span>
            </span>
            <span className="tagline">Bookbinding tools and materials</span>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
