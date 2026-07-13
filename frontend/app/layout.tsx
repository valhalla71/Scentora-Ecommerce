import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${fontVariables} antialiased`}>
      <body>{children}</body>
    </html>
  );
}