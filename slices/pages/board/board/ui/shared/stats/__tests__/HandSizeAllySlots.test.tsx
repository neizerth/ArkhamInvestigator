import { boardBaseSharedSaga } from "@modules/board/base/shared/lib/store/features/sagas";
import {
	selectTestBoard,
	withCurrentBoard,
} from "@modules/board/base/shared/lib/test/boardState";
import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { renderWithStore } from "@shared/lib/test/createTestStore";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { act, screen } from "@testing-library/react-native";
import { range } from "ramda";
import { AllyStots, HandSize } from "../CapacityStat";

jest.mock("@modules/core/control/entities/picker/ui", () =>
	require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock(),
);

describe.each([
	["handSize", "hand-size", HandSize],
	["allySlots", "ally-slots", AllyStots],
] as const)(
	"board %s",
	(stat: InvestigatorBoardNumericStat, testID, Component) => {
		const setup = (values: {
			value: number;
			base: number;
			initial?: number;
		}) => {
			const { value, base, initial = base } = values;

			return renderWithStore(<Component />, {
				patch: withCurrentBoard({
					value: { [stat]: value },
					baseValue: { [stat]: base },
					initialValue: { [stat]: initial },
				}),
				saga: boardBaseSharedSaga,
			});
		};

		const picker = () =>
			screen.getByTestId(`${testID}-picker`).props
				.pickerProps as PickerProps<number>;

		it("renders the current value", async () => {
			await setup({ value: 3, base: 5 });

			expect(picker().value).toBe(3);
			expect(picker().data).toEqual(range(0, 6));
		});

		it("sets the picked value", async () => {
			const { store } = await setup({ value: 3, base: 5 });

			await act(() => picker().onValueChanged?.({ value: 1, index: 1 }));

			expect(selectTestBoard(store.getState()).value[stat]).toBe(1);
		});

		it("decreases the value on press, with no lower bound", async () => {
			const { store } = await setup({ value: 0, base: 5 });

			await act(() => picker().onPress?.());

			expect(selectTestBoard(store.getState()).value[stat]).toBe(-1);
		});

		describe("long press", () => {
			it("increases value and base when base equals initial", async () => {
				const { store } = await setup({ value: 3, base: 5 });

				await act(() => picker().onLongPress?.());

				const board = selectTestBoard(store.getState());
				expect(board.value[stat]).toBe(4);
				expect(board.baseValue[stat]).toBe(6);
			});

			it("resets base to initial when they differ", async () => {
				const { store } = await setup({ value: 3, base: 7, initial: 5 });

				await act(() => picker().onLongPress?.());

				const board = selectTestBoard(store.getState());
				expect(board.value[stat]).toBe(1);
				expect(board.baseValue[stat]).toBe(5);
			});
		});

		describe("swipe", () => {
			it("left increases value and base", async () => {
				const { store } = await setup({ value: 3, base: 5 });

				await act(() => picker().onSwipeLeft?.());

				const board = selectTestBoard(store.getState());
				expect(board.value[stat]).toBe(4);
				expect(board.baseValue[stat]).toBe(6);
			});

			it("right decreases value and base", async () => {
				const { store } = await setup({ value: 3, base: 5 });

				await act(() => picker().onSwipeRight?.());

				const board = selectTestBoard(store.getState());
				expect(board.value[stat]).toBe(2);
				expect(board.baseValue[stat]).toBe(4);
			});
		});

		describe("base value difference", () => {
			it("is hidden when base equals initial", async () => {
				await setup({ value: 3, base: 5 });

				expect(
					screen.queryByTestId(`${testID}-base-picker`),
				).not.toBeOnTheScreen();
			});

			it("shows the signed difference", async () => {
				await setup({ value: 3, base: 7, initial: 5 });

				const basePicker = screen.getByTestId(`${testID}-base-picker`).props
					.pickerProps as PickerProps<number>;
				expect(basePicker.value).toBe(2);
			});
		});
	},
);
