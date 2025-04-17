"use client";
import styles from "../weight.module.css";
import Button from "@/ui/components/Button";

export default function TypeStep({ onNext, onBack, onCancel }) {
  return (
    <div className={styles.container}>
      <div className={styles.topNav}>
        <Button 
          className={styles.backButton}
          onClick={onBack}
        >
          Back
        </Button>
      </div>
      
      <div className={styles.centerContent}>
        <h1 className={styles.instructionText}>
          Choose your product
        </h1>
      </div>
      
      <div className={`${styles.optionsGrid} ${styles.twoOptions}`}>
        <Button 
          className={`${styles.optionButton} ${styles.fruitButton}`}
          onClick={() => onNext('fruit')}
        >
          Fruit
        </Button>
        
        <Button 
          className={`${styles.optionButton} ${styles.vegetableButton}`}
          onClick={() => onNext('vegetable')}
        >
          Vegetable
        </Button>
      </div>
      
      <div className={styles.bottomButtons}>
        <Button 
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}