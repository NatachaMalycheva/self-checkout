"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/ui/components/Modal";
import styles from "./styles.module.css";

export default function Inactivity({ isOpen, onClose, onTimeout, timeLeft = 30 }) {
  const [countdown, setCountdown] = useState(timeLeft);
  const router = useRouter();
  const shouldNavigateRef = useRef(false);
  
  // Reset countdown when modal opens
  useEffect(() => {
    if (isOpen) {
      setCountdown(timeLeft);
      shouldNavigateRef.current = false;
    }
  }, [isOpen, timeLeft]);

  // Handle countdown
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          shouldNavigateRef.current = true;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (countdown === 0 && shouldNavigateRef.current) {
      shouldNavigateRef.current = false;
      onTimeout();
    }
  }, [countdown, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h1 className={styles.title}>Are you still here?</h1>
        <button className={styles.button} onClick={onClose}>
          Yes
        </button>
        <p className={styles.timer}>Time left: 0:{countdown.toString().padStart(2, "0")}</p>
      </div>
    </Modal>
  );
}