import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cheaper than",
  description: "どっちの方が安いか比較します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={montserrat.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
