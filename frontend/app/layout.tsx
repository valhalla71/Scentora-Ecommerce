import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scentora | Premium Perfumes & Fragrances",
  description: "Discover an exquisite collection of premium perfumes and fragrances. Shop luxury scents from top brands at competitive prices.",
  keywords: ["perfume", "fragrance", "luxury scents", "cologne", "eau de parfum"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scentora.com",
    title: "Scentora | Premium Perfumes & Fragrances",
    description: "Discover an exquisite collection of premium perfumes and fragrances.",
    images: [
      {
        url: "https://scentora.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Scentora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scentora | Premium Perfumes & Fragrances",
    description: "Discover an exquisite collection of premium perfumes and fragrances.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}