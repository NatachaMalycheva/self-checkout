"use client";

import styles from "../errors.module.css";

export default function ItemBack() {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Please put the item back in the basket</h1>
    </div>
  );
}