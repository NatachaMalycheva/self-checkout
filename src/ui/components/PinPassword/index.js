"use client";
import { useState } from "react";
import styles from "./pinPassword.module.css";

export default function PinPassword({ name, onSubmit }) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleKeyPress = (key) => {
    if (key === "clear") {
      setPassword("");
      setErrorMessage("");
    } else if (key === "submit") {
      handleSubmit();
    } else if (password.length < 6) {
      setPassword((prev) => prev + key);
      setErrorMessage("");
    }
  };

  const handleSubmit = () => {
    if (password.length === 6) {
      setErrorMessage("");
      const res = onSubmit(password);

      if (!res) setErrorMessage("Incorrect password. Please try again.");
    } else {
      setErrorMessage("Password must be 6 digits long.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.greeting}>Hello, {name}!</h1>
      <h2 className={styles.passwordLabel}>Password</h2>
      <input
        type="password"
        value={password}
        readOnly
        className={styles.passwordInput}
        placeholder="******"
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} {/* Display error message */}
      <div className={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "clear", 0, "submit"].map((key) => (
          <button
            key={key}
            className={`${styles.key} ${
              key === "clear" ? styles.clear : key === "submit" ? styles.submit : ""
            }`}
            onClick={() => handleKeyPress(key)}
          >
            {key === "clear" ? "✗" : key === "submit" ? "✓" : key}
          </button>
        ))}
      </div>
    </div>
  );
}