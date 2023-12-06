import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZEAT",
  description: "Valorant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="w-screen h-screen">
        <main>{children}</main>
      </body>
    </html>
  );
}
