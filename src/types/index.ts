export type Product = {
	amount: string; // 金額
	volume: string; // 容量
	quantity: string; // 個数
	purchaseCount: string; // 購入個数
	discount: string; // 割引
	discountType: "yen" | "percent"; // 割引の種類
};

export type Result = {
	cheaperProduct: "a" | "b" | "none" | null;
	savings: number | null;
};
