import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { CompareForm } from "./compare-form";

describe("CompareForm", () => {
	test("初期状態では『比較する』ボタンがdisabled", () => {
		render(<CompareForm />);
		const compareBtn = screen.getByRole("button", { name: "比較する" });
		expect(compareBtn).toBeDisabled();
	});

	test("必須項目が埋まると『比較する』ボタンが有効になる", async () => {
		render(<CompareForm />);
		const user = userEvent.setup();
		const [amountA, amountB] = screen.getAllByLabelText(/金額/i);
		const [volumeA, volumeB] = screen.getAllByLabelText(/1個あたりの容量/i);

		await user.type(amountA, "100");
		await user.type(volumeA, "50");
		await user.type(amountB, "200");
		await user.type(volumeB, "100");

		expect(screen.getByRole("button", { name: "比較する" })).toBeEnabled();
	});

	test("リセットボタンをクリックすると、入力内容がリセットされる", async () => {
		if (!window.confirm) {
			Object.defineProperty(window, "confirm", {
				value: vi.fn(), // ダミー関数
				writable: true,
			});
		}

		render(<CompareForm />);
		vi.spyOn(window, "confirm").mockReturnValue(true);

		const user = userEvent.setup();

		const productA = screen.getByTestId("product-a");
		const productB = screen.getByTestId("product-b");

		await user.type(within(productA).getByLabelText(/金額/i), "100");
		await user.type(within(productA).getByLabelText(/1個あたりの容量/i), "50");
		await user.type(within(productB).getByLabelText(/金額/i), "200");
		await user.type(within(productB).getByLabelText(/1個あたりの容量/i), "100");

		await user.click(screen.getByRole("button", { name: "リセット" }));

		expect(within(productA).getByLabelText(/金額/i)).toHaveValue("");
		expect(within(productA).getByLabelText(/1個あたりの容量/i)).toHaveValue("");
		expect(within(productB).getByLabelText(/金額/i)).toHaveValue("");
		expect(within(productB).getByLabelText(/1個あたりの容量/i)).toHaveValue("");

		const result = screen.getByTestId("result");
		expect(result).not.toHaveAttribute("data-cheaper");
	});

	it.each([
		{ a: [100, 200], b: [120, 200], expected: "a" },
		{ a: [200, 100], b: [100, 100], expected: "b" },
		{ a: [100, 100], b: [200, 200], expected: "none" },
	])("比較結果 %p", async ({ a, b, expected }) => {
		render(<CompareForm />);
		const user = userEvent.setup();

		const productA = screen.getByTestId("product-a");
		const productB = screen.getByTestId("product-b");

		await user.type(within(productA).getByLabelText(/金額/i), String(a[0]));
		await user.type(
			within(productA).getByLabelText(/1個あたりの容量/i),
			String(a[1]),
		);
		await user.type(within(productB).getByLabelText(/金額/i), String(b[0]));
		await user.type(
			within(productB).getByLabelText(/1個あたりの容量/i),
			String(b[1]),
		);

		await user.click(screen.getByRole("button", { name: "比較する" }));

		const result = await screen.findByTestId("result");
		expect(result).toHaveAttribute("data-cheaper", expected);
	});
});
