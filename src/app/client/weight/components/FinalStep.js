"use client";
import styles from "../weight.module.css";
import Button from "@/ui/components/Button";

export default function FinalStep({ product, weight, onBack, onCancel, onDone }) {
  const finalPrice = product ? (product.price * weight).toFixed(2) : 0;

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
        <div className={styles.summaryContainer}>
          <div className={styles.itemHeader}>
            <span className={styles.itemSelectedLabel}>Item selected: </span>
            <span className={styles.productName}><b>{product ? product.name : ''}</b></span>
            <span className={styles.productUnitPrice}> ({product ? product.price.toFixed(2) : 0} €/kg)</span>
          </div>
        
          <div className={styles.weightDisplay}>
            <div className={styles.fieldLabel}>Weight:</div>
            <div className={styles.fieldValue}>{weight.toFixed(2)} kg</div>
          </div>
        
          <div className={styles.priceDisplay}>
            <span className={styles.fieldLabel}>Price:</span>
            <span className={styles.totalPrice}>{finalPrice} €</span>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomButtons}>
        <div className={styles.centeredButtonsContainer}>
          <Button 
            className={`${styles.doneButton} ${styles.w100}`}
            onClick={onDone}
          >
            Done
          </Button>
          <Button 
            className={`${styles.cancelButton} ${styles.w100}`}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}