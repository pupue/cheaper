import { Product } from "@/types";

/**
 * @param volume 1個あたりの容量
 * @param quantity 個数
 * @param purchaseCount 購入個数
 * @returns 総量
 */
export const getTotalQuantity = (
	volume: number,
	quantity: number,
	purchaseCount: number,
) => volume * quantity * purchaseCount;

/**
 * @param amount 金額
 * @param purchaseCount 購入個数
 * @returns 基本金額
 */
export const getBaseAmount = (amount: number, purchaseCount: number) =>
	amount * purchaseCount;

/**
 * @param baseAmount 基本金額
 * @param discount 割引
 * @param discountType 割引の種類
 * @returns 割引後の金額
 */
export const applyDiscount = (
	baseAmount: number,
	discount: number,
	discountType: Product["discountType"],
) => {
	if (discountType === "yen") return baseAmount - discount;
	if (discountType === "percent") return baseAmount * (1 - discount / 100);
	return baseAmount;
};

/**
 * @param num 小数点第二位を切り上げ
 * @returns 小数点第二位を切り上げた数
 */
export const ceilToSecondDecimal = (num: number) => Math.ceil(num * 100) / 100;

/**
 * @param product 商品
 * @returns 1単位あたりのコスト
 */
export const getCostPerUnit = (product: Product): number => {
	const amount = Number.parseFloat(product.amount);
	const volume = Number.parseFloat(product.volume);
	const quantity = Number.parseFloat(product.quantity || "1");
	const purchaseCount = Number.parseFloat(product.purchaseCount || "1");
	const discount = Number.parseFloat(product.discount || "0");
	const discountType = product.discountType;

	const totalQuantity = getTotalQuantity(volume, quantity, purchaseCount);
	const baseAmount = getBaseAmount(amount, purchaseCount);
	const discountedAmount = applyDiscount(baseAmount, discount, discountType);

	return discountedAmount / totalQuantity;
};
