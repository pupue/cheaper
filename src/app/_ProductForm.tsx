"use client";

import React, { ChangeEvent, FocusEvent } from "react";
import { Product } from "@/types";
import { Input } from "./_Input";

type Props = {
  title: string;
  product: Product;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
};

export const ProductForm = ({ title, product, onChange, onBlur }: Props) => {
  return (
    <div className="border-2 border-black rounded-[4px]">
      <div className="border-b-2 border-black p-2 text-center">{title}</div>
      <div className="grid gap-2 p-2 pb-4">
        <Input label="金額" name="amount" inputMode="tel" value={product.amount} onChange={onChange} onBlur={onBlur} />
        <Input label="容量" name="volume" inputMode="tel" value={product.volume} onChange={onChange} onBlur={onBlur} />
        <Input
          label="個数"
          name="quantity"
          inputMode="tel"
          value={product.quantity}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};
