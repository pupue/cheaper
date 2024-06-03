"use client";

import React, { useState } from "react";
import { ProductForm } from "./_ProductForm";
import { useProductForm } from "./useProductForm";

export const CompareForm = () => {
  const { product: productA, handleChange: handleChangeA, handleBlur: handleBlurA } = useProductForm();
  const { product: productB, handleChange: handleChangeB, handleBlur: handleBlurB } = useProductForm();

  const [result, setResult] = useState<"a" | "b" | "none" | undefined>(undefined);

  const handleCompare = () => {
    const costPerUnitA =
      parseFloat(productA.amount) / (parseFloat(productA.volume) * parseFloat(productA.quantity || "1"));
    const costPerUnitB =
      parseFloat(productB.amount) / (parseFloat(productB.volume) * parseFloat(productB.quantity || "1"));

    if (costPerUnitA < costPerUnitB) {
      setResult("a");
    } else if (costPerUnitA > costPerUnitB) {
      setResult("b");
    } else {
      setResult("none");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-1">
        <ProductForm
          type="a"
          active={result === "a"}
          onChange={handleChangeA}
          onBlur={handleBlurA}
          product={productA}
        />
        <ProductForm
          type="b"
          active={result === "b"}
          onChange={handleChangeB}
          onBlur={handleBlurB}
          product={productB}
        />
      </div>

      <div className="flex justify-center">
        <button type="button" onClick={handleCompare} className="bg-[#2E2E2E] text-white rounded-full p-2 px-4 mt-4">
          比較する
        </button>
      </div>
    </div>
  );
};
