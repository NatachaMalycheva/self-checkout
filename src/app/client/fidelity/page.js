"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./fidelity.module.css";
import Button from "@/ui/components/Button";
import Modal from "@/ui/components/Modal";
import Spinner from "@/ui/components/Spinner";
import { useKeyboard } from "@/context/KeyboardContext";
import { useBarcodeScanner } from "@/context/BarcodeScannerContext";
import { useStore } from "@/context/StoreContext";

export default function FidelityCardScreen({ searchParams }) {
  const router = useRouter();
  const { redirectTo } = use(searchParams);

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const { setupKeyboard, hideKeyboard } = useKeyboard();

  const { registerHandler } = useBarcodeScanner();
  const { fidelityCard, setFidelityCard } = useStore();

  useEffect(() => {
    if (fidelityCard) {
      if (redirectTo) router.push(redirectTo);
      else router.push("/client/scan");
    } else {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    const unregister = registerHandler((item, type) => {
      if (type === "fidelity") {
        handleCardSubmit(item.barcode);
      }
    });

    return unregister;
  }, [registerHandler]);

  const handleManualEntry = () => {
    setCardNumber("");
    setIsModalOpen(true);
  };

  const handleInputFocus = () => {
    setupKeyboard(cardNumber, (input) => {
      setCardNumber(input);
    });
  };

  const handleCardSubmit = (barcode) => {
    setIsModalOpen(false);
    hideKeyboard();

    setFidelityCard(barcode ? barcode : cardNumber);

    if (redirectTo) router.push(redirectTo);
    else router.push("/client/scan");
  };

  const handleNoCard = () => {
    if (redirectTo) router.push(redirectTo);
    else router.push("/client/scan");
  };

  if (isLoading) {
    return <div><Spinner /></div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Do you have a fidelity card?</h1>

      <div className={styles.mainSection}>
        <div className={styles.scanSection}>
          <span className={styles.scanText}>Scan your card here</span>
        </div>

        <div className={styles.divider}>
          <div className={styles.dividerLine}></div>
          <span className={styles.dividerText}>or</span>
          <div className={styles.dividerLine}></div>
        </div>

        <Button onClick={handleManualEntry}>Enter Manually</Button>
      </div>

      <div className={styles.buttonContainer}>
        <Button onClick={handleNoCard}>I don&apos;t have a fidelity card</Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); hideKeyboard();}}>
        <div className={styles.modalContent}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.input}
              value={cardNumber}
              placeholder="Enter your card number"
              readOnly
              onFocus={handleInputFocus}
            />
            <button 
              className={styles.submitButton}
              onClick={handleCardSubmit}
              disabled={cardNumber.length == 0}
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}