"use client";
import { useState } from "react";
import styles from "../payment.module.css";
import ListSection from "@/ui/components/ListSection/ListSection";
import Button from "@/ui/components/Button";
import CallCashierModal from "@/ui/modals/CallCashierModal";
import Modal from "@/ui/components/Modal";
import { useStore } from "@/context/StoreContext";

export default function PaymentMethodStep({ onNext, onCancel }) {
  const { products, totals } = useStore();
  const { subtotal, discount, total } = totals;

  const [isCashierModalOpen, setIsCashierModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <ListSection 
          products={products}
          subtotal={subtotal} 
          discount={discount} 
          total={total} 
        />

        <div className={styles.actionsSection}>
          <Button
            className={styles.cashierButton}
            onClick={() => setIsCashierModalOpen(true)}
          >
            🔔 Call the Cashier
          </Button>

          <div className={styles.centerContent}>
            <h1 className={styles.title}>Choose your payment method</h1>
            <div className={styles.paymentOptionsGrid}>
              <Button
                className={styles.paymentOptionButton}
                onClick={() => {
                  setIsPaymentModalOpen(true);
                  setSelectedPaymentMethod("card");
                }}
              >
                Credit/Debit Card
              </Button>
              <Button
                className={styles.paymentOptionButton}
                onClick={() => {
                  setIsPaymentModalOpen(true);
                  setSelectedPaymentMethod("gift");
                }}
              >
                Gift Card
              </Button>
              <Button
                className={styles.paymentOptionButton}
                onClick={() => {
                  setIsPaymentModalOpen(true);
                  setSelectedPaymentMethod("voucher");
                }}
              >
                Food Voucher
              </Button>
              <Button
                className={styles.paymentOptionButton}
                onClick={() => {
                  setIsPaymentModalOpen(true);
                  setSelectedPaymentMethod("cash");
                }}
              >
                Cash
              </Button>
            </div>
          </div>
          <Button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>

      <CallCashierModal
        isOpen={isCashierModalOpen}
        onClose={() => setIsCashierModalOpen(false)}
      />
      <Modal
        isOpen={isPaymentModalOpen}
        unclosable={true}
        onClose={() => setIsPaymentModalOpen(false)}
      >
        {selectedPaymentMethod === "card" && (
          <div className={styles.modalContent}>
            <h2>Please follow the instructions on the card machine</h2>
            <div className={styles.simulatePayment} onClick={onNext}>
              Click here to simulate a payment
            </div>
          </div>
        )}
        {selectedPaymentMethod === "gift" && (
          <div className={styles.modalContent}>
            <h2>Please scan your gift card</h2>
            <div className={styles.simulatePayment} onClick={onNext}>
              Click here to simulate a payment
            </div>
          </div>
        )}
        {selectedPaymentMethod === "voucher" && (
          <div className={styles.modalContent}>
            <h2>Please scan your food voucher</h2>
            <div className={styles.simulatePayment} onClick={onNext}>
              Click here to simulate a payment
            </div>
          </div>
        )}
        {selectedPaymentMethod === "cash" && (
          <div className={styles.modalContent}>
            <h2>Please enter the cash in the machine</h2>
            <div className={styles.totalContainer}>
              <h3>Total Amount: {total.toFixed(2)} €</h3>
            </div>
            <div
              className={styles.simulatePayment}
              onClick={() => {
                setIsPaymentModalOpen(true);
                setSelectedPaymentMethod("cashExchange");
              }}
            >
              Click here to simulate a payment
            </div>
          </div>
        )}
        {selectedPaymentMethod === "cashExchange" && (
          <div className={styles.modalContent}>
            <div className={styles.totalContainer}>
              <h3>Total Amount: {total.toFixed(2)} €</h3>
              <h3>Inserted Amount: 100.00 €</h3>
              <h3>Change: {(100 - total).toFixed(2)} €</h3>
            </div>
            <h3>Please collect your change</h3>
            <div className={styles.simulatePayment} onClick={onNext}>
              Click here to simulate a payment
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}