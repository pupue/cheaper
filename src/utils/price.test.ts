import { describe, it, expect } from "vitest";
import { Product } from "@/types";
import {
	getTotalQuantity,
	applyDiscount,
	ceilToSecondDecimal,
	getCostPerUnit,
} from "./price";

describe("getTotalQuantity", () => {
	it("volume × quantity × purchaseCount の積を返す", () => {
		const result = getTotalQuantity(100, 2, 3);
		expect(result).toBe(600);
	});
});

describe("applyDiscount", () => {
	it("yen割引を適用できる", () => {
		expect(applyDiscount(1000, 200, "yen")).toBe(800);
	});

	it("percent割引を適用できる", () => {
		expect(applyDiscount(1000, 20, "percent")).toBe(800);
	});

	it("割引が0の場合、そのまま返す", () => {
		expect(applyDiscount(1000, 0, "yen")).toBe(1000);
		expect(applyDiscount(1000, 0, "percent")).toBe(1000);
	});
});

describe("ceilToSecondDecimal", () => {
	it("小数第3位を切り上げる", () => {
		expect(ceilToSecondDecimal(1.234)).toBe(1.24);
	});

	it("ちょうど2桁ならそのまま返す", () => {
		expect(ceilToSecondDecimal(1.2)).toBe(1.2);
	});

	it("負の数も正しく処理する", () => {
		expect(ceilToSecondDecimal(-1.236)).toBe(-1.23);
	});
});

describe("getCostPerUnit", () => {
	it("割引なしの場合、(amount×purchaseCount)/(volume×quantity×purchaseCount) を返す", () => {
		const product: Product = {
			amount: "200", // 金額
			volume: "100", // 容量
			quantity: "1", // 個数
			purchaseCount: "1", // 購入回数
			discount: "0",
			discountType: "yen",
		};
		const result = getCostPerUnit(product);
		expect(result).toBeCloseTo(2.0, 3); // 200 ÷ 100 = 2
	});

	it("yen割引の場合、金額から直接引かれる", () => {
		const product: Product = {
			amount: "1000",
			volume: "500",
			quantity: "1",
			purchaseCount: "1",
			discount: "200",
			discountType: "yen",
		};
		const result = getCostPerUnit(product);
		expect(result).toBeCloseTo(1.6, 3); // (1000-200)/500 = 1.6
	});

	it("percent割引の場合、金額に割合が適用される", () => {
		const product: Product = {
			amount: "1000",
			volume: "500",
			quantity: "1",
			purchaseCount: "1",
			discount: "20",
			discountType: "percent",
		};
		const result = getCostPerUnit(product);
		expect(result).toBeCloseTo(1.6, 3); // 1000*(1-0.2)/500 = 1.6
	});
});
