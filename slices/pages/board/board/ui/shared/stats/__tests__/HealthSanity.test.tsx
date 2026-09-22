import { boardBaseSharedSaga } from "@modules/board/base/shared/lib/store/features/sagas";
import {
	type TestBoardOptions,
	selectTestBoard,
	withCurrentBoard,
} from "@modules/board/base/shared/lib/test/boardState";
import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { renderWithStore } from "@shared/lib/test/createTestStore";
import type { RootState } from "@shared/model";
import { act, screen } from "@testing-library/react-native";
import { range } from "ramda";
import { StyleSheet } from "react-native";
import { Health } from "../Health";
import { Sanity } from "../Sanity";

jest.mock("@modules/core/control/entities/picker/ui", () =>
	require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock(),
);

type Settings = Partial<
	Pick<
		RootState["board"],
		| "showDamageAndHorror"
		| "allowNegativeHealthAndSanity"
		| "showInitialHealthAndSanity"
		| "showAdditionalInformation"
	>
>;

type Stat = "health" | "sanity";

const getPicker = (testID: string) =>
	screen.getByTestId(testID).props.pickerProps as PickerProps<number>;

describe.each([
	["health", Health],
	["sanity", Sanity],
] as const)("board %s", (stat: Stat, Component) => {
	const setup = (
		values: { value: number; base: number; initial?: number },
		settings: Settings = {},
	) => {
		const { value, base, initial = base } = values;
		const board: TestBoardOptions = {
			value: { [stat]: value },
			baseValue: { [stat]: base },
			initialValue: { [stat]: initial },
		};

		return renderWithStore(<Component />, {
			patch: (state) => {
				withCurrentBoard(board)(state);
				Object.assign(state.board, settings);
			},
			saga: boardBaseSharedSaga,
		});
	};

	const picker = () => getPicker(`${stat}-picker`);

	it("renders the current value", async () => {
		await setup({ value: 5, base: 7 });

		expect(screen.getByTestId(`board-${stat}`)).toBeOnTheScreen();
		expect(picker().value).toBe(5);
		expect(picker().data).toEqual(range(0, 8));
		expect(screen.getByTestId(`${stat}-picker`)).toHaveTextContent("5", {
			exact: false,
		});
	});

	it("extends the range below zero when negative values are allowed", async () => {
		await setup({ value: 5, base: 7 }, { allowNegativeHealthAndSanity: true });

		expect(picker().data).toEqual(range(-20, 8));
	});

	describe("damage/horror mode", () => {
		it("shows wounds instead of the value", async () => {
			await setup({ value: 5, base: 7 }, { showDamageAndHorror: true });

			expect(picker().value).toBe(2);
			expect(picker().data).toEqual(range(0, 8));
		});

		it("allows up to 20 wounds when negative values are allowed", async () => {
			await setup(
				{ value: 5, base: 7 },
				{ showDamageAndHorror: true, allowNegativeHealthAndSanity: true },
			);

			expect(picker().data).toEqual(range(0, 20));
		});

		it("converts picked wounds to the value", async () => {
			const { store } = await setup(
				{ value: 5, base: 7 },
				{ showDamageAndHorror: true },
			);

			await act(() => picker().onValueChanged?.({ value: 3, index: 3 }));

			expect(selectTestBoard(store.getState()).value[stat]).toBe(4);
		});
	});

	it("sets the picked value", async () => {
		const { store } = await setup({ value: 5, base: 7 });

		await act(() => picker().onValueChanged?.({ value: 1, index: 1 }));

		expect(selectTestBoard(store.getState()).value[stat]).toBe(1);
		expect(picker().value).toBe(1);
	});

	describe("press", () => {
		it("decreases the value", async () => {
			const { store } = await setup({ value: 5, base: 7 });

			await act(() => picker().onPress?.());

			expect(selectTestBoard(store.getState()).value[stat]).toBe(4);
		});

		it("stops at zero", async () => {
			const { store } = await setup({ value: 0, base: 7 });

			await act(() => picker().onPress?.());

			expect(selectTestBoard(store.getState()).value[stat]).toBe(0);
		});

		it("goes below zero when negative values are allowed", async () => {
			const { store } = await setup(
				{ value: 0, base: 7 },
				{ allowNegativeHealthAndSanity: true },
			);

			await act(() => picker().onPress?.());

			expect(selectTestBoard(store.getState()).value[stat]).toBe(-1);
		});
	});

	describe("long press", () => {
		it("increases value and base when base equals initial", async () => {
			const { store } = await setup({ value: 5, base: 7 });

			await act(() => picker().onLongPress?.());

			const board = selectTestBoard(store.getState());
			expect(board.value[stat]).toBe(6);
			expect(board.baseValue[stat]).toBe(8);
		});

		it("resets base to initial when they differ", async () => {
			const { store } = await setup({ value: 5, base: 9, initial: 7 });

			await act(() => picker().onLongPress?.());

			const board = selectTestBoard(store.getState());
			expect(board.value[stat]).toBe(3);
			expect(board.baseValue[stat]).toBe(7);
		});
	});

	describe("swipe", () => {
		it("left increases value and base", async () => {
			const { store } = await setup({ value: 5, base: 7 });

			await act(() => picker().onSwipeLeft?.());

			const board = selectTestBoard(store.getState());
			expect(board.value[stat]).toBe(6);
			expect(board.baseValue[stat]).toBe(8);
		});

		it("right decreases value and base", async () => {
			const { store } = await setup({ value: 5, base: 7 });

			await act(() => picker().onSwipeRight?.());

			const board = selectTestBoard(store.getState());
			expect(board.value[stat]).toBe(4);
			expect(board.baseValue[stat]).toBe(6);
		});
	});

	describe("initial value", () => {
		it("is hidden by default", async () => {
			await setup({ value: 5, base: 7, initial: 6 });

			expect(screen.queryByTestId(`${stat}-initial`)).not.toBeOnTheScreen();
		});

		it("is shown by the setting", async () => {
			await setup(
				{ value: 5, base: 7, initial: 6 },
				{ showInitialHealthAndSanity: true },
			);

			expect(screen.getByTestId(`${stat}-initial`)).toHaveTextContent("6", {
				exact: false,
			});
		});

		it("is shown with additional information", async () => {
			await setup(
				{ value: 5, base: 7, initial: 6 },
				{ showAdditionalInformation: true },
			);

			expect(screen.getByTestId(`${stat}-initial`)).toBeOnTheScreen();
		});
	});

	describe("additional information", () => {
		it("hides the picker and shows wounds", async () => {
			await setup({ value: 5, base: 7 }, { showAdditionalInformation: true });

			expect(
				StyleSheet.flatten(screen.getByTestId(`${stat}-picker`).props.style),
			).toMatchObject({ opacity: 0 });
			expect(screen.getAllByTestId(`${stat}-additional`)[0]).toHaveTextContent(
				"-2",
				{ exact: false },
			);
		});

		it("shows base value in damage/horror mode", async () => {
			await setup(
				{ value: 5, base: 7 },
				{ showAdditionalInformation: true, showDamageAndHorror: true },
			);

			expect(screen.getAllByTestId(`${stat}-additional`)[0]).toHaveTextContent(
				"7",
				{ exact: false },
			);
		});

		it("is hidden by default", async () => {
			await setup({ value: 5, base: 7 });

			expect(
				StyleSheet.flatten(screen.getByTestId(`${stat}-picker`).props.style),
			).toMatchObject({ opacity: 1 });
			expect(screen.queryByTestId(`${stat}-additional`)).not.toBeOnTheScreen();
		});
	});

	describe("base value difference", () => {
		it("is hidden when base equals initial", async () => {
			await setup({ value: 5, base: 7 });

			expect(screen.queryByTestId(`${stat}-base-picker`)).not.toBeOnTheScreen();
		});

		it("shows the signed difference", async () => {
			await setup({ value: 5, base: 9, initial: 7 });

			const basePicker = getPicker(`${stat}-base-picker`);
			expect(basePicker.value).toBe(2);
			expect(screen.getByTestId(`${stat}-base-picker`)).toHaveTextContent(
				"+2",
				{ exact: false },
			);
		});
	});
});
