"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

const BarcodeScannerContext = createContext({});

export function BarcodeScannerProvider({ children }) {
  const router = useRouter();

  const [barcodeDatabase, setBarcodeDatabase] = useState([]);
  const [handlers, setHandlers] = useState([]);
  
  const databaseRef = useRef([]);
  const handlersRef = useRef([]);
  
  useEffect(() => {
    databaseRef.current = barcodeDatabase;
  }, [barcodeDatabase]);
  
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    const loadBarcodeDatabase = async () => {
      try {
        const response = await fetch('/barcodes.json');
        if (!response.ok) {
          throw new Error('Failed to fetch barcode database');
        }
        const data = await response.json();
        setBarcodeDatabase(data);
      } catch (error) {
        console.error('Error loading barcode database:', error);
      }
    };

    loadBarcodeDatabase();
  }, []);

  const registerHandler = useCallback((handler) => {
    setHandlers(prev => [...prev, handler]);
    return () => {
      setHandlers(prev => prev.filter(h => h !== handler));
    };
  }, []);

  const handleScan = useCallback((barcode) => {
    const currentDatabase = databaseRef.current;

    const item = currentDatabase.find(item => item.barcode == barcode);
    
    if (!item) {
      console.log("Barcode not found in database:", barcode);
      return false;
    }

    if (item.type === "manager") {
      router.push("/manager/password");
    } else {
      const currentHandlers = handlersRef.current;
      currentHandlers.forEach(handler => {
        try {
          handler(item, item.type);
        } catch (error) {
          console.error("Error in barcode scan handler:", error);
        }
      });
    }

    return true;
  }, []);

  return (
    <BarcodeScannerContext.Provider 
      value={{
        registerHandler,
        handleScan
      }}
    >
      {children}
    </BarcodeScannerContext.Provider>
  );
}

export const useBarcodeScanner = () => useContext(BarcodeScannerContext);