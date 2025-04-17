"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import BagPaymentStep from "./components/BagPaymentStep";
import PaymentMethodStep from "./components/PaymentMethodStep";
import TicketStep from "./components/TicketStep";
import Spinner from "@/ui/components/Spinner";

export function PaymentFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { totals, products, resetStore, addProduct } = useStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [step, setStep] = useState(null);

  const ticketSfx = new Audio("/sounds/ticket.mp3");

  const fromFidelity = searchParams.get("fromFidelity");

  // Handle initial routing and step determination
  useEffect(() => {
    if (isFinished) return;

    const hasBag = products.some(product => 
      product.barcode && product.barcode.toString() === "bag-payment"
    );
    const wantBag = localStorage.getItem("wantBag") == null ? 
      true : localStorage.getItem("wantBag") === "true";

    if (fromFidelity === "true") {
      // Coming back from fidelity, go to payment method
      setStep("paymentMethod");
      setIsLoading(false);
    } else if (hasBag || !wantBag) {
      // Skip bag step but need to go to fidelity first
      setIsLoading(false);
      router.push("/client/fidelity?redirectTo=/client/payment?fromFidelity=true");
    } else {
      // Show bag step
      setStep("bag");
      setIsLoading(false);
    }
  }, [products, router, fromFidelity]);

  const handleCancel = () => {
    setIsLoading(true);
    localStorage.setItem("wantBag", "true");
    router.push("/client/scan");
  };

  const handlePaymentComplete = (hasTicket = true) => {
    setIsLoading(true);
    setIsFinished(true);

    if (hasTicket) ticketSfx.play();

    localStorage.removeItem("wantBag");
    resetStore();
    router.push("/client/language");
  };

  // Only proceed when loading is complete and we know which step to show
  if (isLoading || step === null) {
    return <Spinner />;
  }

  return (
    <div>
      {step === "bag" && (
        <BagPaymentStep 
          onNext={(cost) => {
            setIsLoading(true); // Show loading during navigation
            if (cost > 0) {
              addProduct({
                barcode: `bag-payment`,
                name: `Shopping Bag`,
                price: cost,
                quantity: 1,
                subtotal: cost
              });
            } else {
              localStorage.setItem("wantBag", "false");
            }
            
            router.push("/client/fidelity?redirectTo=/client/payment?fromFidelity=true");
          }} 
          onBack={handleCancel} 
        />
      )}

      {step === "paymentMethod" && (
        <PaymentMethodStep 
          total={totals.total}
          onNext={() => setStep("ticket")}
          onCancel={handleCancel} 
        />
      )}
      
      {step === "ticket" && (
        <TicketStep 
          products={products}
          totals={totals}
          onDone={handlePaymentComplete}
        />
      )}
    </div>
  );
}

export default function WrappedPaymentFlow() {
  return (
    <Suspense fallback={<Spinner />}>
      <PaymentFlow />
    </Suspense>
  );
}
