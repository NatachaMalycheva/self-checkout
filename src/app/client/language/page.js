"use client";

import { useState, useEffect } from "react";
import styles from "./language.module.css";
import { useRouter } from "next/navigation";
import Button from "@/ui/components/Button";
import LanguageModal, { setLanguage } from "@/ui/modals/LanguageModal";
import { useBarcodeScanner } from "@/context/BarcodeScannerContext";
import { useStore } from "@/context/StoreContext";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { registerHandler } = useBarcodeScanner();
  const { addProduct } = useStore();

  useEffect(() => {
    const unregister = registerHandler((item, type) => {
      if (type === "product") {
        setLanguage("en");
        addProduct(item);
        router.push("/client/scan");
      }
    });

    return unregister;
  }, [registerHandler]);

  function setLanguageAndRedirect(lang) {
    setLanguage(lang);
    router.push("/client/fidelity");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose the language:</h1>
      <div className={styles.languages}>
        <Button onClick={() => setLanguageAndRedirect("en")}>English</Button>
        <Button onClick={() => setLanguageAndRedirect("fr")}>Français</Button>
        <Button onClick={() => setIsModalOpen(true)}>Other...</Button>
      </div>

      <span className={styles.scan}>Or scan directly your items</span>

      <LanguageModal 
        isOpen={isModalOpen}
        onClose={(languageSelected) => {
          setIsModalOpen(false);

          if (languageSelected) router.push("/client/fidelity");
        }}
      />
    </div>
  );
}
