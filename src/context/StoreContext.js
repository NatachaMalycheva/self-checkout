"use client";

import { createContext, useContext, useState, useCallback, useEffect, use } from "react";

const StoreContext = createContext({});
const STORAGE_KEY = "self-checkout-products";
const FIDELITY_STORAGE_KEY = "fidelity-card";
const BLOCKED_STORAGE_KEY = "system-blocked";

export function StoreProvider({ children }) {
  const [isSystemBlocked, setIsSystemBlocked] = useState(null);
  const [fidelityCard, setFidelityCard] = useState(null);
  const [products, setProducts] = useState([]);
  const [totals, setTotals] = useState({
    subtotal: 0,
    discount: 0,
    total: 0
  });

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEY);
      const storedFidelityCard = localStorage.getItem(FIDELITY_STORAGE_KEY);
      const storedIsSystemBlocked = localStorage.getItem(BLOCKED_STORAGE_KEY);

      if (storedProducts) setProducts(JSON.parse(storedProducts));
      if (storedFidelityCard) setFidelityCard(JSON.parse(storedFidelityCard));
      if (storedIsSystemBlocked) setIsSystemBlocked(JSON.parse(storedIsSystemBlocked));
    } catch (error) {
      console.error("Error loading products from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error("Error saving products to localStorage:", error);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(FIDELITY_STORAGE_KEY, fidelityCard);
    } catch (error) {
      console.error("Error saving fidelity card to localStorage:", error);
    }
  }, [fidelityCard]);

  useEffect(() => {
    try {
      localStorage.setItem(BLOCKED_STORAGE_KEY, JSON.stringify(isSystemBlocked));
    } catch (error) {
      console.error("Error saving system block status to localStorage:", error);
    }
  }, [isSystemBlocked]);

  useEffect(() => {
    const subtotal = products.reduce((sum, product) => {
      return sum + product.subtotal;
    }, 0);
    
    const discount = products.reduce((sum, product) => {
      return sum + ((product.discount || 0) * product.quantity);
    }, 0);
    
    setTotals({
      subtotal,
      discount,
      total: subtotal - discount
    });
  }, [products]);

  const addProduct = useCallback((product) => {
    setProducts(prevProducts => {
      const existingProductIndex = prevProducts.findIndex(p => p.barcode === product.barcode);
      
      if (existingProductIndex >= 0) {
        const updatedProducts = [...prevProducts];
        const existingProduct = updatedProducts[existingProductIndex];
        
        if ('weight' in product) {
          // For weight products (fruits/vegetables), update the weight
          console.log(existingProduct, product);
          updatedProducts[existingProductIndex] = {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
            weight: existingProduct.weight + (product.weight || 0),
            subtotal: (existingProduct.weight + (product.weight || 0)) * product.price
          };
        } else {
          // For regular products, update the quantity
          updatedProducts[existingProductIndex] = {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
            subtotal: (existingProduct.quantity + (product.quantity || 1)) * product.price
          };
        }
        
        return updatedProducts;
      } else {
        // Add new product
        const subtotal = 'weight' in product
          ? (product.weight || 0) * product.price 
          : product.price;
          
        return [...prevProducts, {
          ...product,
          quantity: 1,
          subtotal
        }];
      }
    });
  }, []);

  const removeProduct = useCallback((barcode) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.barcode !== barcode)
    );
  }, []);

  const clearProducts = useCallback(() => {
    setProducts([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const resetStore = useCallback(() => {
    setProducts([]);
    setTotals({
      subtotal: 0,
      discount: 0,
      total: 0
    });
    setFidelityCard(null);
    localStorage.removeItem(FIDELITY_STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const decreaseProductQuantity = useCallback((barcode) => {
    setProducts(prevProducts => {
      const productIndex = prevProducts.findIndex(product => product.barcode === barcode);
      
      if (productIndex >= 0) {
        const updatedProducts = [...prevProducts];
        const existingProduct = updatedProducts[productIndex];
        
        if (existingProduct.quantity > 1) {
          updatedProducts[productIndex] = {
            ...existingProduct,
            quantity: existingProduct.quantity - 1,
            subtotal: (existingProduct.quantity - 1) * existingProduct.price
          };
        } else {
          updatedProducts.splice(productIndex, 1);
        }
        
        return updatedProducts;
      }
      
      return prevProducts;
    });
  }, []);

  return (
    <StoreContext.Provider 
      value={{
        products,
        totals,
        addProduct,
        removeProduct,
        decreaseProductQuantity,
        clearProducts,
        resetStore,
        fidelityCard,
        setFidelityCard,
        isSystemBlocked,
        setIsSystemBlocked,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);