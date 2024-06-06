export type Product = {
  amount: string;
  volume: string;
  quantity: string;
};

export type Result = {
  cheaperProduct: "a" | "b" | "none" | null;
  savings: number | null;
};
