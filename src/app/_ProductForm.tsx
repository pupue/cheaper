"use client";

import React, { ChangeEvent, FocusEvent } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Input } from "./_Input";

type Props = {
  type: "a" | "b";
  active?: boolean;
  product: Product;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
};

export const ProductForm = ({ type, active, product, onChange, onBlur }: Props) => {
  return (
    <div className="relative">
      <div
        className={`${active ? "opacity-1" : "opacity-0"} ${type === "a" ? "left-0" : "right-0"} relative top-1 w-12`}
      >
        <Image src="/icon.png" width={311} height={250} alt="" />
      </div>

      <div className="relative z-10 border-2 border-black rounded-[4px] overflow-hidden">
        <div className="border-b-2  border-black bg-[#f1f2f3] p-2 text-center uppercase">商品{type}</div>
        <div className="grid gap-2 p-2 pb-4">
          <Input
            label="金額（円）"
            name="amount"
            inputMode="tel"
            value={product.amount}
            onChange={onChange}
            onBlur={onBlur}
            required
          />
          <Input
            label="容量（g,ml,個など）"
            name="volume"
            inputMode="tel"
            value={product.volume}
            onChange={onChange}
            onBlur={onBlur}
            required
          />
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
    </div>
  );
};
