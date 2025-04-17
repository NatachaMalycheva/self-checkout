"use client";

import { createContext, useContext, useState, useCallback } from "react";

const KeyboardContext = createContext({});

export function KeyboardProvider({ children }) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [keyboardValue, setKeyboardValue] = useState("");
  const [onKeyboardInput, setOnKeyboardInput] = useState(null);

  const setupKeyboard = useCallback((initialValue, onInput) => {
    setKeyboardValue(initialValue);
    setOnKeyboardInput(() => onInput);
    setShowKeyboard(true);
  }, []);

  const hideKeyboard = useCallback(() => {
    setShowKeyboard(false);
    setOnKeyboardInput(null);
  }, []);

  return (
    <KeyboardContext.Provider 
      value={{
        showKeyboard,
        keyboardValue,
        onKeyboardInput,
        setupKeyboard,
        hideKeyboard
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
}

export const useKeyboard = () => useContext(KeyboardContext);