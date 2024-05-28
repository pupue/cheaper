"use client";

import React, { useState } from "react";
import { ProductForm } from "./_ProductForm";
import { useProductForm } from "./useProductForm";

export const CompareForm = () => {
  const { product: productA, handleChange: handleChangeA, handleBlur: handleBlurA } = useProductForm();
  const { product: productB, handleChange: handleChangeB, handleBlur: handleBlurB } = useProductForm();

  const [result, setResult] = useState<string>("");

  const handleCompare = () => {
    console.log(productA.amount);
    console.log(productB.amount);
    const costPerUnitA =
      parseFloat(productA.amount) / (parseFloat(productA.volume) * parseFloat(productA.quantity || "1"));
    const costPerUnitB =
      parseFloat(productB.amount) / (parseFloat(productB.volume) * parseFloat(productB.quantity || "1"));

    if (costPerUnitA < costPerUnitB) {
      setResult("商品Aの方が安いです");
    } else if (costPerUnitA > costPerUnitB) {
      setResult("商品Bの方が安いです");
    } else {
      setResult("両方の商品は同じ値段です");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-1">
        <ProductForm title="商品A" onChange={handleChangeA} onBlur={handleBlurA} product={productA} />
        <ProductForm title="商品B" onChange={handleChangeB} onBlur={handleBlurB} product={productB} />
      </div>
      <button type="button" onClick={handleCompare} className="flex w-full justify-center bg-black text-white p-2 mt-4">
        比較する
      </button>
      {result && <p>{result}</p>}
    </div>
  );
};
