"use client";

import { useState, useCallback } from "react";
import styles from "./styles.module.css";
import Button from "@/ui/components/Button";
import Modal from "@/ui/components/Modal";
import { useKeyboard } from "@/context/KeyboardContext";

export function setLanguage(lang) {
  localStorage.setItem("language", lang);
}

export default function LanguageModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { setupKeyboard, hideKeyboard } = useKeyboard();

  const handleInputFocus = useCallback(() => {
    setupKeyboard(searchQuery, setSearchQuery);
  }, [searchQuery, setupKeyboard]);

  const handleLanguageSelect = useCallback((lang) => {
    hideKeyboard();
    setLanguage(lang);
    onClose(true);
  }, [hideKeyboard, onClose]);

  const close = () => {
    setSearchQuery("");
    hideKeyboard();
    onClose(false);
  }

  const additionalLanguages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "nl", name: "Nederlands" },
    { code: "pl", name: "Polski" },
    { code: "ru", name: "Русский" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
  ];

  const filteredLanguages = additionalLanguages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Select a language</h2>
          <button 
            className={styles.closeButton} 
            onClick={close}
          >
            ✕
          </button>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="search"
            placeholder="Search language..."
            className={styles.searchInput}
            value={searchQuery}
            readOnly
            onFocus={handleInputFocus}
          />
        </div>
        <div className={styles.languageGrid}>
          {filteredLanguages.map((lang) => (
            <Button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {lang.name}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
}