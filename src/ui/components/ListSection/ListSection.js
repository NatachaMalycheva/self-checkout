"use client";

import React from "react";
import styles from "./ListSection.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";

import { useStore } from "@/context/StoreContext";

export default function ListSection({ products, subtotal, discount, total, isCashierEditing }) {
  const { removeProduct, decreaseProductQuantity } = useStore();

  return (
    <div className={styles.listSection}>
      <h2 className={styles.listTitle}>Your List</h2>
      <ul className={styles.itemList}>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <li key={product.barcode || index} className={styles.item}>
              <div className={styles.productInfo}>
                <span className={styles.productName}>
                  {product.name} 
                  {product.quantity > 1 ? ` x${product.quantity}` : ""} 
                  {product.weight ? ` (${product.weight.toFixed(2)} kg)` : ""}
                </span>
                
                <div className={styles.priceContainer}>
                  {product.discount ? (
                    <>
                      <span className={styles.originalPrice}>{product.subtotal.toFixed(2)} €</span>
                      <span className={styles.discountedPrice}>{(product.subtotal - (product.quantity * product.discount)).toFixed(2)} €</span>
                    </>
                  ) : (
                    <span className={styles.price}>{product.subtotal.toFixed(2)} €</span>
                  )}
                </div>

                {isCashierEditing && (
                  <div className={styles.controlButtons}>
                    {product.quantity > 1 && !("weight" in product) && (
                      <button className={styles.minusButton} onClick={() => decreaseProductQuantity(product.barcode)}><TiMinus /></button>
                    )}
                    <button className={styles.removeButton} onClick={() => removeProduct(product.barcode)}><FaTrashAlt /></button>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <li className={styles.emptyList}>No items in your cart</li>
        )}
      </ul>
      <div className={styles.summary}>
        <div>
          Subtotal: <span>{subtotal.toFixed(2)} €</span>
        </div>
        <div>
          Discount: <span className={styles.discount}>- {discount.toFixed(2)} €</span>
        </div>
        <div>
          Total: <span className={styles.total}>{total.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
}