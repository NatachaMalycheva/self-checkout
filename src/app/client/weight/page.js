"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import ScaleStep from "./components/ScaleStep";
import BagStep from "./components/BagStep";
import TypeStep from "./components/TypeStep";
import ListStep from "./components/ListStep";
import FinalStep from "./components/FinalStep";

export default function WeightFlow() {
  const router = useRouter();
  const { addProduct } = useStore();

  const [weight, setWeight] = useState(0);
  const [bag, setBag] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [step, setStep] = useState("scale");
  const [productType, setProductType] = useState("");

  const handleCancel = () => {
    router.push("/client/scan");
  }
  
  return (
    <div>
      {step === "scale" && <ScaleStep 
        onNext={(detectedWeight) => {
          setWeight(detectedWeight);
          setStep("bag");
        }} 
        onCancel={handleCancel} 
      />}
      
      {step === "bag" && <BagStep 
        onNext={(bagType, price) => {
          if (price > 0)
            setBag({ type: bagType, price });
          setStep("chooseType");
        }} 
        onCancel={handleCancel} 
      />}

      {step === "chooseType" && <TypeStep 
        onNext={(type) => {
          setProductType(type);
          setStep("chooseItem");
        }} 
        onBack={() => setStep("bag")} 
        onCancel={handleCancel} 
      />}

      {step === "chooseItem" && <ListStep 
        productType={productType} 
        onNext={(product) => {
          setSelectedProduct(product);
          setStep("final");
        }}
        onBack={() => setStep("chooseType")} 
        onCancel={handleCancel} 
      />}

      {step === "final" && <FinalStep 
        product={selectedProduct}
        weight={weight}
        onBack={() => setStep("chooseItem")}
        onDone={() => {
          addProduct({
            barcode: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            weight: weight,
            subtotal: selectedProduct.price * weight,
          });
          
          if (bag && bag.price > 0) {
            addProduct({
              barcode: `bag-${bag.type}`,
              name: `${bag.type} Bag (fruits/vegetables)`,
              price: bag.price,
              quantity: 1,
              subtotal: bag.price
            });
          }
          
          router.push("/client/scan");
        }}
        onCancel={handleCancel} 
      />}
    </div>
  );
}