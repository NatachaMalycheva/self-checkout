"use client";
import styles from "../weight.module.css";
import Button from "@/ui/components/Button";

export default function ScaleStep({ onNext, onCancel }) {
  const handleContainerClick = () => {
    const randomWeight = Math.random() * 1.9 + 0.1;
    onNext(randomWeight);
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <div className={styles.centerContent}>
        <h1 className={styles.instructionText}>
          Please place your product on the plate...
        </h1>
        <div className={styles.helpText}>
          (Click anywhere to simulate scale detection)
        </div>
      </div>
      <div className={styles.bottomButtons}>
        <Button 
          className={styles.cancelButton}
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}