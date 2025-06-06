"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "../weight.module.css";
import Image from "next/image";
import Button from "@/ui/components/Button";
import AlphabetScroll from "@/ui/components/AlphabeticalScroller";
import { useKeyboard } from "@/context/KeyboardContext";

export default function ListStep({ productType, onNext, onBack, onCancel }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setupKeyboard, hideKeyboard } = useKeyboard();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const jsonFile = productType === 'fruit' ? '/fruits.json' : '/vegetables.json';
        const response = await fetch(jsonFile);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${productType} data`);
        }
        
        const data = await response.json();
        // Sort products alphabetically
        data.sort((a, b) => a.name.localeCompare(b.name));
        
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productType]);

  const handleSearch = useCallback((searchValue) => {
    setSearchTerm(searchValue);
    
    if (searchValue.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products]);

  const handleInputFocus = useCallback(() => {
    setupKeyboard(searchTerm, handleSearch);
  }, [searchTerm, setupKeyboard, handleSearch]);


  const handleProductSelect = (product) => {
    hideKeyboard();
    onNext(product);
  };

  const closeKeyboard = useCallback(() => {
    hideKeyboard();
  }, [hideKeyboard]);

  const renderProductItem = (product) => (
    <div 
      key={product.id}
      className={styles.productItem}
      onClick={() => handleProductSelect(product)}
    >
      <div className={styles.productImageContainer}>
        <Image
          width={100}
          height={100} 
          src={product.image} 
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productName}>{product.name}</div>
      <div className={styles.productPrice}>{product.price.toFixed(2)} €/kg</div>
    </div>
  );

  const enhancedProducts = filteredProducts.map(product => ({
    ...product,
    render: () => renderProductItem(product)
  }));

  return (
    <div className={styles.container}>
      <div className={styles.topNav}>
        <Button 
          className={styles.backButton}
          onClick={() => {
            closeKeyboard();
            onBack();
          }}
        >
          Back
        </Button>
        <h1 className={styles.instructionText}>
          Choose your {productType}
        </h1>
      </div>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder={`Search ${productType}s...`}
          value={searchTerm}
          readOnly
          onClick={handleInputFocus}
          onFocus={handleInputFocus}
        />
      </div>
      
      <div className={styles.productsContainer}>
        {loading ? (
          <div className={styles.loadingIndicator}>Loading...</div>
        ) : enhancedProducts.length > 0 ? (
          <AlphabetScroll items={enhancedProducts} />
        ) : (
          <div className={styles.noProducts}>
            No {productType}s found. Please try a different search.
          </div>
        )}
      </div>
      
      <div className={styles.bottomButtons}>
        <Button 
          className={styles.cancelButton}
          onClick={() => {
            closeKeyboard();
            onCancel();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}