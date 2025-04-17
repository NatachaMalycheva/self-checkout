"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";

export default function CallCashierModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Please wait.</h2>
        <p className={styles.subtitle}>The cashier is coming</p>
        <div className={styles.buttonContainer}>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}