"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import styles from "./styles.module.css";

const BarcodeScanner = dynamic(() => {
  import("react-barcode-scanner/polyfill")
  return import("react-barcode-scanner").then(mod => mod.BarcodeScanner)
}, { ssr: false })

export default function BarcodeScannerComponent({ onScan }) {
  const scanCooldownRef = useRef(false);
  const beepSfxRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(true);
  const [codeDetected, setCodeDetected] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      beepSfxRef.current = new Audio("/sounds/beep.mp3");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({
        x: window.innerWidth - 320,
        y: 20
      });
      setIsPositioned(true);
    }
    
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(window.innerWidth - 320, prev.x),
        y: prev.y
      }));
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    let timeout;
    if (codeDetected) {
      timeout = setTimeout(() => {
        setCodeDetected(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [codeDetected]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };
  
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 300, e.clientX - offset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 340, e.clientY - offset.y))
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };
  
  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length > 0) {
      const touch = e.touches[0];
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 300, touch.clientX - offset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 340, touch.clientY - offset.y))
      });
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const handleBarcodeScan = useCallback((results) => {
    if (!results || results.length === 0 || scanCooldownRef.current) {
      return;
    }
    
    const rawValue = results[0].rawValue;
  
    scanCooldownRef.current = true;
    
    const res = onScan(rawValue);
    if (res && beepSfxRef.current) {
      beepSfxRef.current.play();  
      setCodeDetected(true);
    }
    
    setTimeout(() => {
      scanCooldownRef.current = false;
    }, 2000);
  }, [onScan]);

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };
  
  return (
    <div 
      className={styles.scannerContainer} 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        visibility: isPositioned ? "visible" : "hidden"
      }}
    >
      <div 
        className={styles.dragHandle}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <span>📷 Barcode Scanner</span>
        <button 
          className={styles.minimizeButton}
          onClick={toggleMinimize}
        >
          {isMinimized ? "□" : "—"}
        </button>
      </div>
      <div 
        className={`${styles.scannerContent} ${codeDetected ? styles.detected : ""}`}
        style={{ display: isMinimized ? "none" : "block" }}
      >
        <BarcodeScanner
          key="stable-scanner"
          onCapture={handleBarcodeScan}
          options={{ formats: ["itf", "ean_13", "ean_8", "qr_code"], delay: 500 }}
          className={styles.scannerComponent}
        />
      </div>
    </div>
  );
}