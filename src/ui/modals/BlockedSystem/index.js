"use client";

import Modal from "@/ui/components/Modal";
import styles from "./styles.module.css";

export default function BlockedSystem({ isOpen, onClose }) {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.blockedContainer} onClick={(e) => e.stopPropagation()}>
            <img src="/warning.png" alt="Warning" className={styles.warningIcon} />
            <h1 className={styles.blockedTitle}>System Blocked</h1>
            <p className={styles.blockedMessage}>Please use another machine</p>
        </div>
    </Modal>
    
  );
}