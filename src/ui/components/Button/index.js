"use client";

import styles from "./button.module.css";

export default function Button ({ children, onClick, className, ...props }) {
  return (
    <button 
      onClick={onClick} 
      className={`${styles.btn} ${className || ''}`} 
      {...props}
    >
      {children}
    </button>
  );
}