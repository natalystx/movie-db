import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/contexts/StoreProvider";
import { Toaster } from "sonner";
import AuthWrapper from "@/app/components/base/AuthWrapper";
import { cx } from "@emotion/css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie App",
  description: "Movie App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cx(inter.className)}>
        <Toaster expand={false} position="top-right" richColors />
        <StoreProvider>
          <AuthWrapper>
            <Suspense>{children} </Suspense>
          </AuthWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
