"use client";

import { useKeyboard } from "@/context/KeyboardContext";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import styles from "./styles.module.css";

export default function GlobalKeyboard() {
  const { 
    showKeyboard, 
    setShowKeyboard,
    keyboardValue,
    onKeyboardInput 
  } = useKeyboard();

  if (!showKeyboard) return null;

  return (
    <div className={styles.keyboardWrapper}>
      <Keyboard
        onChange={input => {
          if (onKeyboardInput) onKeyboardInput(input);
        }}
        onKeyPress={button => {
          if (button === "{enter}") {
            setShowKeyboard(false);
          }
        }}
        value={keyboardValue}
      />
    </div>
  );
}