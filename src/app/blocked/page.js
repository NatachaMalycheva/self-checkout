import styles from "./styles.module.css";

import { CiWarning } from "react-icons/ci";

export default function BlockedSystem() {
  return (
    <div className={styles.blockedContainer}>
      <CiWarning className={styles.warningIcon} />
      <h1 className={styles.blockedTitle}>System Blocked</h1>
      <p className={styles.blockedMessage}>Please use another machine</p>
    </div>
  );
}