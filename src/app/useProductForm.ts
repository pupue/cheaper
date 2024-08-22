import { ChangeEvent, FocusEvent, useState } from "react";
import { Product } from "@/types";

export const useProductForm = () => {
  const [product, setProduct] = useState<Product>({ amount: "", volume: "", quantity: "" });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const halfWidthValue = value.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));

    if (isNaN(Number(halfWidthValue))) {
      setErrors((prev) => ({ ...prev, [name]: "数値を入力してください" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: null }));
      setProduct((prev) => ({ ...prev, [name]: halfWidthValue }));
    }
  };

  const resetValue = () => {
    setProduct({ amount: "", volume: "", quantity: "" });
  };

  return {
    product,
    handleChange,
    handleBlur,
    errors,
    resetValue,
  };
};
