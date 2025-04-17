"use client";
import styles from "../payment.module.css";
import Button from "@/ui/components/Button";

import { useStore } from "@/context/StoreContext";

export default function TicketStep({ onDone }) {
  const { fidelityCard } = useStore();

  return (
    <div className={styles.container}>
      <div className={styles.ticketContent}>
        <h1 className={styles.thankYouText}>Thank you for buying at IGRoceries!</h1>
        <h2 className={styles.ticketQuestion}>Would you like a ticket?</h2>
        <div className={styles.ticketButtons}>
          <Button className={styles.ticketButton} onClick={onDone}>
            Ticket & Receipt
          </Button>
          <Button className={styles.ticketButton} onClick={onDone}>
            Only Ticket
          </Button>
          {fidelityCard && (
            <Button className={styles.ticketButton} onClick={() => onDone(false)}>
              Digital Ticket (Email)
            </Button>
          )}
          <Button className={styles.ticketButton} onClick={() => onDone(false)}>
            No Ticket &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}