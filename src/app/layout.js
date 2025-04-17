import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { KeyboardProvider } from "@/context/KeyboardContext";
import { BarcodeScannerProvider } from "@/context/BarcodeScannerContext";
import { StoreProvider } from "@/context/StoreContext";
import GlobalBarcodeScanner from "@/ui/components/GlobalBarcodeScanner";
import GlobalKeyboard from "@/ui/components/GlobalKeyboard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Self-Checkout System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <KeyboardProvider>
          <BarcodeScannerProvider>
            <StoreProvider>
              {children}
              <GlobalBarcodeScanner />
              <GlobalKeyboard />
            </StoreProvider>
          </BarcodeScannerProvider>
        </KeyboardProvider>
      </body>
    </html>
  );
}
