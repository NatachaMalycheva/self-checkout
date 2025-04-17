"use client";
import styles from "../weight.module.css";
import Button from "@/ui/components/Button";

export default function BagStep({ onNext, onCancel }) {
  const handleBagSelection = (bagType) => {
    if (bagType === "Fabric") onNext(bagType, 0.2);
    else onNext(bagType, 0.0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContent}>
        <h1 className={styles.instructionText}>
          Which bag are you using?
        </h1>
      </div>
      
      <div className={styles.optionsGrid}>
        <Button 
          className={styles.optionButton}
          onClick={() => handleBagSelection('Plastic')}
        >
          Plastic bag
        </Button>
        
        <Button 
          className={styles.optionButton}
          onClick={() => handleBagSelection('Fabric')}
        >
          Fabric bag
          <div className={styles.optionSubtext}>+0.20 €</div>
        </Button>
        
        <Button 
          className={styles.optionButton}
          onClick={() => handleBagSelection('Paper')}
        >
          Paper bag
        </Button>
        
        <Button 
          className={styles.optionButton}
          onClick={() => handleBagSelection('None')}
        >
          No bag
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
