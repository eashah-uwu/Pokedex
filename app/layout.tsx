import type { Metadata } from "next";
import "./ui/globals.css";

import TanstackProvider from "@/providers/TanstackProvider";
export const metadata: Metadata = {
  title: "Pokedex",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanstackProvider>
          <div className="m-0 p-0 box-border">{children}</div>
        </TanstackProvider>
      </body>
    </html>
  );
}
