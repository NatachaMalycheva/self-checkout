"use client";

import styles from "../errors.module.css";

export default function ItemBefore() {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>
        Please scan the item before putting it in the basket
      </h1>
    </div>
  );
}