import { ChangeEvent, useState } from "react";
import { Product } from "@/types";

const initialProduct: Product = {
	amount: "",
	volume: "",
	quantity: "",
	purchaseCount: "",
	discount: "",
	discountType: "yen",
};

export const useProductForm = () => {
	const [product, setProduct] = useState<Product>(initialProduct);
	const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setProduct((prev) => ({ ...prev, [name]: value }));
	};

	const resetValue = () => {
		setProduct(initialProduct);
	};

	return {
		product,
		handleChange,
		errors,
		resetValue,
	};
};
