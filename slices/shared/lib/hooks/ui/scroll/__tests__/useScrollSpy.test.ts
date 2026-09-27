/// <reference types="jest" />

import { act, renderHook } from "@testing-library/react-native";
import type { ViewToken } from "react-native";
import { useScrollSpy } from "../useScrollSpy";

const token = (index: number): ViewToken => ({
	item: { index },
	key: String(index),
	index,
	isViewable: true,
	section: undefined,
});

describe("useScrollSpy", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("keeps the same onChange reference once an item was reported", async () => {
		const { result } = await renderHook(() =>
			useScrollSpy<{ index: number }>(),
		);

		const firstOnChange = result.current[1];

		await act(async () => {
			result.current[1]({ viewableItems: [token(0)], changed: [] });
			jest.runAllTimers();
		});

		const secondOnChange = result.current[1];

		// FlatList warns/recreates its viewability watcher when this identity
		// changes on rerender, which is the stutter reported in reference.
		expect(secondOnChange).toBe(firstOnChange);
	});

	it("does not throw when no item is viewable", async () => {
		const { result } = await renderHook(() =>
			useScrollSpy<{ index: number }>(),
		);

		await expect(
			act(async () => {
				result.current[1]({ viewableItems: [], changed: [] });
				jest.runAllTimers();
			}),
		).resolves.not.toThrow();
	});
});
