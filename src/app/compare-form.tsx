"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { z } from "zod";
import { Result } from "@/types";
import { ceilToSecondDecimal, getCostPerUnit } from "@/utils/price";
import { ProductForm } from "./_components/ProductForm";
import { useProductForm } from "./_hooks/useProductForm";

const productSchema = z.object({
	amount: z
		.string()
		.min(1)
		.regex(/^(?!0\d)/),
	volume: z
		.string()
		.min(1)
		.regex(/^(?!0\d)/),
	quantity: z
		.string()
		.regex(/^(?!0\d)/)
		.optional(),
});

export const CompareForm = () => {
	const {
		product: productA,
		resetValue: resetValueA,
		handleChange: handleChangeA,
	} = useProductForm();
	const {
		product: productB,
		resetValue: resetValueB,
		handleChange: handleChangeB,
	} = useProductForm();

	const [result, setResult] = useState<Result>({
		cheaperProduct: null,
		savings: null,
	});

	// 「比較する」ボタンdisabled判定
	const isProductAValid = productSchema.safeParse(productA).success;
	const isProductBValid = productSchema.safeParse(productB).success;
	const disabled = !(isProductAValid && isProductBValid);

	const handleCompare = () => {
		const costPerUnitA = getCostPerUnit(productA);
		const costPerUnitB = getCostPerUnit(productB);

		if (costPerUnitA < costPerUnitB) {
			setResult({
				cheaperProduct: "a",
				savings: ceilToSecondDecimal(costPerUnitB - costPerUnitA),
			});
		} else if (costPerUnitA > costPerUnitB) {
			setResult({
				cheaperProduct: "b",
				savings: ceilToSecondDecimal(costPerUnitA - costPerUnitB),
			});
		} else {
			setResult({
				cheaperProduct: "none",
				savings: null,
			});
		}
	};

	const handleReset = () => {
		if (window.confirm("入力内容をリセットしますか？")) {
			resetValueA();
			resetValueB();
			setResult({
				cheaperProduct: null,
				savings: null,
			});
		}
	};

	return (
		<div>
			<p
				data-testid="result"
				data-cheaper={result.cheaperProduct}
				className={clsx(
					result.cheaperProduct ? "opacity-1" : "opacity-0",
					"text-center",
					"tracking-wider",
					"mb-2",
				)}
			>
				{result.cheaperProduct === "none" ? (
					<span>どちらを買っても同じです！</span>
				) : (
					<span className="text-xs uppercase">
						商品{result.cheaperProduct}のほうが1単位あたり
						<span className="text-md font-bold">
							{result.savings?.toLocaleString()}円
						</span>
						お得！
					</span>
				)}
			</p>

			<div className="grid grid-cols-2 gap-1">
				<ProductForm
					type="a"
					active={
						result.cheaperProduct === "a" || result.cheaperProduct === "none"
					}
					onChange={handleChangeA}
					product={productA}
					testId="product-a"
				/>
				<ProductForm
					type="b"
					active={
						result.cheaperProduct === "b" || result.cheaperProduct === "none"
					}
					onChange={handleChangeB}
					product={productB}
					testId="product-b"
				/>
			</div>

			<div className="grid gap-4 justify-center">
				<button
					type="button"
					disabled={disabled}
					onClick={handleCompare}
					className={clsx(
						disabled ? "bg-gray-400" : "bg-[#2E2E2E]",
						"text-white rounded-full p-2 px-4 mt-4",
					)}
				>
					比較する
				</button>
				<button
					type="button"
					onClick={handleReset}
					className="text-sm underline"
				>
					リセット
				</button>
			</div>
		</div>
	);
};
