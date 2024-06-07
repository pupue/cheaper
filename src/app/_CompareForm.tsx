"use client";

import React, { useState } from "react";
import { Result } from "@/types";
import { ProductForm } from "./_ProductForm";
import { useProductForm } from "./useProductForm";

export const CompareForm = () => {
  const { product: productA, handleChange: handleChangeA, handleBlur: handleBlurA } = useProductForm();
  const { product: productB, handleChange: handleChangeB, handleBlur: handleBlurB } = useProductForm();

  const [result, setResult] = useState<Result>({
    cheaperProduct: null,
    savings: null,
  });

  const handleCompare = () => {
    const costPerUnitA =
      parseFloat(productA.amount) / (parseFloat(productA.volume) * parseFloat(productA.quantity || "1"));
    const costPerUnitB =
      parseFloat(productB.amount) / (parseFloat(productB.volume) * parseFloat(productB.quantity || "1"));

    if (costPerUnitA < costPerUnitB) {
      setResult({
        cheaperProduct: "a",
        savings: Math.floor(
          (costPerUnitB - costPerUnitA) * (parseFloat(productA.volume) * parseFloat(productA.quantity || "1"))
        ),
      });
    } else if (costPerUnitA > costPerUnitB) {
      setResult({
        cheaperProduct: "b",
        savings: Math.floor(
          (costPerUnitA - costPerUnitB) * (parseFloat(productB.volume) * parseFloat(productB.quantity || "1"))
        ),
      });
    } else {
      setResult({
        cheaperProduct: "none",
        savings: null,
      });
    }
  };

  return (
    <div>
      <p className={`${result.cheaperProduct ? "opacity-1" : "opacity-0"} text-center tracking-wider mb-2`}>
        {result.cheaperProduct === "none" ? (
          <span>どちらを買っても同じです！</span>
        ) : (
          <span className="text-xs uppercase">
            商品{result.cheaperProduct}のほうが
            <span className="text-md font-bold">{result.savings}円</span>お得！
          </span>
        )}
      </p>

      <div className="grid grid-cols-2 gap-1">
        <ProductForm
          type="a"
          active={result.cheaperProduct === "a" || result.cheaperProduct === "none"}
          onChange={handleChangeA}
          onBlur={handleBlurA}
          product={productA}
        />
        <ProductForm
          type="b"
          active={result.cheaperProduct === "b" || result.cheaperProduct === "none"}
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
