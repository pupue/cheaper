"use client";

import React, { ChangeEvent } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Product } from "@/types";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Input } from "../../components/Input";

type Props = {
	type: "a" | "b";
	active?: boolean;
	product: Product;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	testId?: string;
};

export const ProductForm = ({
	type,
	active,
	product,
	onChange,
	testId,
}: Props) => {
	const [showOptions, setShowOptions] = React.useState(false);

	return (
		<div data-testid={testId} className="relative">
			<div
				className={clsx(
					"relative top-1 w-12",
					active ? "opacity-1" : "opacity-0",
					type === "a" ? "left-0" : "right-0",
				)}
			>
				<Image src="/icon.png" width={311} height={250} alt="" />
			</div>
			<div
				className={clsx(
					"relative z-10 border-2 rounded-[4px] overflow-hidden",
					active ? "border-orange-500" : "border-black",
				)}
			>
				<div className="border-b-2  border-black bg-[#f1f2f3] p-2 text-center uppercase">
					商品{type}
				</div>
				<div className="grid gap-2 p-2 pb-4">
					<Input
						aria-label="金額"
						label="金額"
						name="amount"
						inputMode="decimal"
						value={product.amount}
						onChange={onChange}
						required
						placeholder="例: 1000(円)"
					/>
					<Input
						aria-label="1個あたりの容量"
						label="1個あたりの容量"
						name="volume"
						inputMode="decimal"
						value={product.volume}
						onChange={onChange}
						required
						placeholder="例: 3(g), 12(m), 500(ml)"
					/>
					<button
						onClick={() => setShowOptions((prev) => !prev)}
						type="button"
						className="flex items-center gap-1 text-sm"
					>
						<ArrowIcon dirction={showOptions ? "bottom" : "right"} />
						オプションを表示
					</button>

					{showOptions && (
						<>
							<Input
								label="個数"
								name="quantity"
								inputMode="decimal"
								value={product.quantity}
								onChange={onChange}
								placeholder="例: 2(個), 6(ロール), 24(本)"
							/>
							<Input
								label="購入個数"
								name="purchaseCount"
								inputMode="decimal"
								value={product.purchaseCount}
								onChange={onChange}
								placeholder="例: 3(個)"
							/>
							<div className="grid grid-cols-3 items-end gap-2">
								<Input
									label="割引"
									name="discount"
									inputMode="decimal"
									value={product.discount}
									onChange={onChange}
									className="col-span-2"
									placeholder="例: 5(%), 100(円)"
								/>
								<select
									onChange={onChange}
									name="discountType"
									value={product.discountType}
								>
									<option value="yen">円</option>
									<option value="percent">%</option>
								</select>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
