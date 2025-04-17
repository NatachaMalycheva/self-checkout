"use client";
import styles from "../payment.module.css";
import Button from "@/ui/components/Button";

export default function BagPaymentStep({ onNext, onBack }) {
  return (
    <div className={styles.container}>
      <Button className={styles.backButton} onClick={onBack}>
        Back
      </Button>
      <div className={styles.topContent}>
        <h1 className={styles.title}>Do you want a bag?</h1>
      </div>
      <div className={styles.optionsGrid}>
        <Button className={styles.optionButton} onClick={() => onNext(0.15)}>
          Yes
          <div className={styles.optionSubtext}>+ 0.15 €</div>
        </Button>
        <Button className={styles.optionButton} onClick={() => onNext(0)}>
          No
        </Button>
      </div>
    </div>
  );
}