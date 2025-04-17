"use client";

import { useBarcodeScanner } from "@/context/BarcodeScannerContext";
import BarcodeScanner from "@/ui/components/BarcodeScanner";

export default function GlobalBarcodeScanner() {
  const { handleScan } = useBarcodeScanner();
  
  return <BarcodeScanner onScan={handleScan} />;
}