import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "פניקס ביטוח - מערכת ניהול קמפיינים",
  description: "מערכת ניהול קמפיינים לסוכנויות ביטוח - Phoenix Insurance Campaign Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
