"use client";

import { useState } from "react";
import Modal from "@/ui/components/Modal";
import styles from "./addPromotion.module.css";

export default function AddPromotion({isOpen, onClose, onSubmit}) {
  const [offerCode, setOfferCode] = useState("");

  const handleKeyPress = (key) => {
    if (key === "clear") {
      setOfferCode("");
    } else if (key === "submit") {
      handleSubmit();
    } else if (offerCode.length < 10) {
      setOfferCode((prev) => prev + key);
    }
  };

  const handleSubmit = () => {
    if (offerCode.length > 0) {
      onSubmit(offerCode);
      setOfferCode("");
    } else {
      alert("Please enter a valid offer code.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h1 className={styles.title}>Enter the Offer Code</h1>
        <input
          type="text"
          value={offerCode}
          readOnly
          className={styles.input}
          placeholder="Enter code"
        />
        <div className={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "clear", 0, "submit"].map((key) => (
            <button
              key={key}
              className={`${styles.key} ${
                key === "clear" ? styles.clear : key === "submit" ? styles.submit : ""
              }`}
              onClick={() => handleKeyPress(key)}
            >
              {key === "clear" ? "✗" : key === "submit" ? "✓" : key}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}