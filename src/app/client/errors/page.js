"use client";

import { Suspense } from "react";
import ReasonError from "./components/ReasonError";
import ItemBack from "./components/ItemBack";
import ItemBefore from "./components/ItemBefore";
import styles from "./errors.module.css";
import Spinner from "@/ui/components/Spinner";

function ErrorContent() {
  const { useSearchParams } = require('next/navigation');
  const searchParams = useSearchParams();
  const errorType = searchParams.get("type");
  const reason = searchParams.get("reason");

  switch (errorType) {
    case "reason":
      return <ReasonError reason={reason || "Unknown error"} />;
    case "itemBack":
      return <ItemBack />;
    case "itemBefore":
      return <ItemBefore />;
    default:
      return (
        <div className={styles.unknownError}>
          <h1>Error</h1>
          <p>Unknown error type.</p>
        </div>
      );
  }
}

export default function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <img src="/warning.png" alt="Warning" className={styles.warningIcon}/>
      <Suspense fallback={<Spinner />}>
        <ErrorContent />
      </Suspense>
    </div>
  );
}