/// <reference types="jest" />

import { createTestStore } from "@shared/lib/test/createTestStore";
import type { RootState } from "@shared/model";
import { renderHook } from "@testing-library/react-native";
import { range } from "ramda";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { useMainStatPicker } from "../useMainStatPicker";

type Settings = Partial<
	Pick<
		RootState["board"],
		"showDamageAndHorror" | "allowNegativeHealthAndSanity"
	>
>;

const setup = async (
	values: { value: number; baseValue: number },
	settings: Settings = {},
) => {
	const store = createTestStore({
		patch: (state) => {
			Object.assign(state.board, settings);
		},
	});

	const wrapper = ({ children }: PropsWithChildren) => (
		<Provider store={store}>{children}</Provider>
	);

	return await renderHook(() => useMainStatPicker(values), { wrapper });
};

describe("useMainStatPicker", () => {
	describe("by value", () => {
		it("lists every value up to the base one", async () => {
			const { result } = await setup({ value: 5, baseValue: 7 });

			expect(result.current.data).toEqual(range(0, 8));
			expect(result.current.value).toBe(5);
			expect(result.current.min).toBe(0);
			expect(result.current.showWounds).toBe(false);
		});

		it("goes down to -20 when negative values are allowed", async () => {
			const { result } = await setup(
				{ value: 5, baseValue: 7 },
				{ allowNegativeHealthAndSanity: true },
			);

			expect(result.current.data).toEqual(range(-20, 8));
			expect(result.current.min).toBe(-20);
		});

		it("takes the picked item as the value", async () => {
			const { result } = await setup({ value: 5, baseValue: 7 });

			expect(result.current.toValue(3)).toBe(3);
			expect(result.current.toValue()).toBe(0);
		});
	});

	describe("by wounds", () => {
		const damage = { showDamageAndHorror: true };

		it("shows the wounds taken", async () => {
			const { result } = await setup({ value: 5, baseValue: 7 }, damage);

			expect(result.current.value).toBe(2);
			expect(result.current.wounds).toBe(2);
			expect(result.current.data).toEqual(range(0, 8));
			expect(result.current.showWounds).toBe(true);
		});

		it("never reports negative wounds", async () => {
			const { result } = await setup({ value: 9, baseValue: 7 }, damage);

			expect(result.current.wounds).toBe(0);
		});

		it("allows up to 20 wounds when negative values are allowed", async () => {
			const { result } = await setup(
				{ value: 5, baseValue: 7 },
				{
					...damage,
					allowNegativeHealthAndSanity: true,
				},
			);

			expect(result.current.data).toEqual(range(0, 20));
		});

		it("turns the picked wounds back into the value", async () => {
			const { result } = await setup({ value: 5, baseValue: 7 }, damage);

			expect(result.current.toValue(3)).toBe(4);
			expect(result.current.toValue()).toBe(7);
		});
	});
});
