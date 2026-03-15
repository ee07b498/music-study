import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meya Conservatory of Chinese Music | 芈雅中乐学院",
  description: "Sydney's premier Chinese music school offering traditional instrument lessons, orchestra programs, and cultural events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
