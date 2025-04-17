"use client";

import styles from "./modal.module.css";

export default function Modal({ isOpen, unclosable, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => {if (!unclosable) onClose();}}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}