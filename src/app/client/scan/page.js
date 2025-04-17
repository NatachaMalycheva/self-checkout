"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIdleTimer } from 'react-idle-timer';
import styles from "./scan.module.css";

import { MdLanguage } from "react-icons/md";
import { BiSolidBellRing } from "react-icons/bi";

import Button from "@/ui/components/Button";
import Modal from "@/ui/components/Modal";
import ListSection from "@/ui/components/ListSection/ListSection";
import PinPassword from "@/ui/components/PinPassword";
import CallCashierModal from "@/ui/modals/CallCashierModal";
import LanguageModal from "@/ui/modals/LanguageModal";
import AddPromotion from "@/ui/modals/AddPromotion";
import Inactivity from "@/ui/modals/Inactivity";
import { useBarcodeScanner } from "@/context/BarcodeScannerContext";
import { useStore } from "@/context/StoreContext";
import { useKeyboard } from "@/context/KeyboardContext";

export default function ScanScreen() {
  const router = useRouter();
  const { products, totals, addProduct, resetStore, fidelityCard, setFidelityCard } = useStore();
  const { setupKeyboard, hideKeyboard } = useKeyboard();

  const [isCashierEditing, setIsCashierEditing] = useState(false);
  const [isCashierPasswordModalOpen, setIsCashierPasswordModalOpen] = useState(false);

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isCashierModalOpen, setIsCashierModalOpen] = useState(false);
  const [isFidelityScannedModalOpen, setIsFidelityScannedModalOpen] = useState(false);
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [isInactivityModalOpen, setIsInactivityModalOpen] = useState(false);
  
  const [isManualBarcodeModalOpen, setIsManualBarcodeModalOpen] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");

  const { registerHandler, handleScan } = useBarcodeScanner();

  // Set up idle timer
  const { reset: resetIdleTimer } = useIdleTimer({
    timeout: 120000, // 2 minutes
    onIdle: () => setIsInactivityModalOpen(true),
    debounce: 500
  });

  const handleInactivityClose = () => {
    setIsInactivityModalOpen(false);
    resetIdleTimer();
  };

  useEffect(() => {
    const unregister = registerHandler((item, type) => {
      resetIdleTimer();
      setIsInactivityModalOpen(false);
      if (type === "cashier") {
        if (isCashierEditing) return;
        setIsCashierModalOpen(false);
        setIsCashierPasswordModalOpen(true);
      } else if (type === "fidelity") {
        setFidelityCard(item.barcode);
      } else {
        addProduct(item);
      }
    });

    return unregister;
  }, [registerHandler, addProduct, isCashierEditing]);

  const handleWeightProduct = () => {
    router.push("/client/weight");
  };

  const handlePayNow = () => {
    router.push("/client/payment");
  };

  const handleAddFidelityCard = () => {
    if (fidelityCard) setIsFidelityScannedModalOpen(true);
    else router.push("/client/fidelity?redirectTo=/client/scan");
  };

  const handleBarcodeInputFocus = () => {
    setupKeyboard(manualBarcode, (input) => {
      setManualBarcode(input);
    });
  };

  const handleCloseManualBarcodeModal = () => {
    setIsManualBarcodeModalOpen(false);
    hideKeyboard();
  };

  const handleBarcodeSubmit = () => {
    if (manualBarcode.trim()) {
      handleScan(manualBarcode.trim());
      setManualBarcode("");
      setIsManualBarcodeModalOpen(false);
      hideKeyboard();
    }
  };

  return (
    <div className={styles.container}>
      <ListSection
        products={products}
        subtotal={totals.subtotal}
        discount={totals.discount}
        total={totals.total}
        isCashierEditing={isCashierEditing}
      />
      <div className={styles.actionsSection}>
        {isCashierEditing ? (
          <div className={styles.cashierButtons}>
            <Button className={styles.logoutButton} onClick={() => {
              setIsCashierEditing(false);
            }}>
              Log out
            </Button>
            <Button className={styles.promotionButton} onClick={() => {
              setIsPromotionModalOpen(true);
            }}>
              Add Promotion
            </Button>
            <Button className={styles.addItemButton} onClick={() => setIsManualBarcodeModalOpen(true)}>
              Add an Item Manually
            </Button>
            <Button className={styles.newClientButton} onClick={() => {
              resetStore(); 
              router.push("/");
            }}>
              New Client
            </Button>
          </div>
        ) : (
          <div className={styles.topButtons}>
            <Button
              className={styles.languageButton}
              onClick={() => setIsLanguageModalOpen(true)}
              disabled={isCashierEditing}
            >
              <MdLanguage size={28} />
            </Button>
            <Button
              className={styles.cashierButton}
              onClick={() => setIsCashierModalOpen(true)}
              disabled={isCashierEditing}
            >
              <BiSolidBellRing size={28} color="#f4bb44" /> Call the Cashier
            </Button>
            <Button
              className={styles.removeButton}
              onClick={() => setIsCashierModalOpen(true)}
              disabled={isCashierEditing}
            >
              Remove an Item
            </Button>
          </div>
        )}
        
        <div>
          <div className={styles.floatingTotal}>
              Total: {totals.total.toFixed(2)} €
          </div>
          
          <div className={styles.bottomButtons}>
            <Button
              className={styles.weightButton}
              onClick={handleWeightProduct}
              disabled={isCashierEditing}
            >
              Weight Your Product
            </Button>
            <Button
              className={styles.payButton}
              onClick={handlePayNow}
              disabled={isCashierEditing || products.length === 0}
            >
              Pay Now
            </Button>
            <Button
              className={styles.fidelityButton}
              onClick={handleAddFidelityCard}
              disabled={isCashierEditing}
            >
              Add Your Fidelity Card
            </Button>
          </div>
        </div>
      </div>

      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />

      <CallCashierModal
        isOpen={isCashierModalOpen}
        onClose={() => setIsCashierModalOpen(false)}
      />

      <Modal
        isOpen={isFidelityScannedModalOpen}
        onClose={() => setIsFidelityScannedModalOpen(false)}
      >
        <div className={styles.fidelityModalContent}>
          <h3>Fidelity Card already scanned</h3>
          <Button onClick={() => setIsFidelityScannedModalOpen(false)}>OK</Button>
        </div>
      </Modal>

      <AddPromotion
        isOpen={isPromotionModalOpen}
        onClose={() => setIsPromotionModalOpen(false)}
        onSubmit={(code) => {
          setIsPromotionModalOpen(false);
        }}
      />

      <Modal 
        isOpen={isCashierPasswordModalOpen} 
        onClose={() => setIsCashierPasswordModalOpen(false)}
      >
        <PinPassword
          name="Cashier"
          onSubmit={(password) => {
            if (password !== "987654") return false;
            setIsCashierEditing(true);
            setIsCashierPasswordModalOpen(false);
            return true;
          }}
        />
      </Modal>

      <Inactivity
        isOpen={isInactivityModalOpen}
        onClose={handleInactivityClose}
        onTimeout={() => {
          resetStore();
          router.push("/");
        }}
        timeLeft={30}
      />

      <Modal isOpen={isManualBarcodeModalOpen} onClose={handleCloseManualBarcodeModal}>
        <div className={styles.manualBarcodeModal}>
          <h1>Enter Barcode</h1>
          <input
            type="text"
            className={styles.barcodeInput}
            value={manualBarcode}
            placeholder="Enter barcode here"
            readOnly
            onFocus={handleBarcodeInputFocus}
          />
          <Button 
            onClick={handleBarcodeSubmit}
            disabled={manualBarcode.length === 0}
          >
            Scan
          </Button>
        </div>
      </Modal>
    </div>
  );
}