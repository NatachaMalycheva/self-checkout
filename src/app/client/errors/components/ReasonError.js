"use client";

import styles from "../errors.module.css";

export default function ReasonError({ reason }) {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Please wait!</h1>
      <h2 className={styles.errorSubtitle}>The cashier is coming</h2>
      <h3 className={styles.errorReason}>
        Reason: <span className={styles.errorReasonText}>{reason}</span>
      </h3>
    </div>
  );
}