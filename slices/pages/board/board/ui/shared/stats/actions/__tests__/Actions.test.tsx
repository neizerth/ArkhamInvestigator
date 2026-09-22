import { boardBaseSharedSaga } from "@modules/board/base/shared/lib/store/features/sagas";
import {
	selectTestBoard,
	withCurrentBoard,
} from "@modules/board/base/shared/lib/test/boardState";
import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { makeActionSaga } from "@modules/mechanics/phase/features/lib/store/features/effects/investigation/makeAction/makeActionSaga";
import { renderWithStore } from "@shared/lib/test/createTestStore";
import { act, screen } from "@testing-library/react-native";
import { range } from "ramda";
import { spawn } from "redux-saga/effects";
import { Actions } from "../Actions";

jest.mock("@modules/core/control/entities/picker/ui", () =>
	require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock(),
);

function* saga() {
	yield spawn(boardBaseSharedSaga);
	yield spawn(makeActionSaga);
}

const setup = (values: { value: number; base?: number; initial?: number }) => {
	const { value, base = 3, initial = base } = values;

	return renderWithStore(<Actions />, {
		patch: withCurrentBoard({
			value: { actions: value },
			baseValue: { actions: base },
			initialValue: { actions: initial },
		}),
		saga,
	});
};

const picker = () =>
	screen.getByTestId("actions-picker").props.pickerProps as PickerProps<number>;

const actions = (state: ReturnType<typeof selectTestBoard>) =>
	state.value.actions;

describe("board actions", () => {
	it("renders the current value", async () => {
		await setup({ value: 3 });

		expect(picker().value).toBe(3);
		expect(picker().data).toEqual(range(0, 100));
	});

	it("sets the picked value", async () => {
		const { store } = await setup({ value: 3 });

		await act(() => picker().onValueChanged?.({ value: 1, index: 1 }));

		expect(actions(selectTestBoard(store.getState()))).toBe(1);
	});

	it("spends an action on press", async () => {
		const { store } = await setup({ value: 3 });

		await act(() => picker().onPress?.());

		expect(actions(selectTestBoard(store.getState()))).toBe(2);
	});

	describe("long press", () => {
		it("increases value and base when base equals initial", async () => {
			const { store } = await setup({ value: 3 });

			await act(() => picker().onLongPress?.());

			const board = selectTestBoard(store.getState());
			expect(board.value.actions).toBe(4);
			expect(board.baseValue.actions).toBe(4);
		});

		it("resets base to initial when they differ", async () => {
			const { store } = await setup({ value: 3, base: 4, initial: 3 });

			await act(() => picker().onLongPress?.());

			const board = selectTestBoard(store.getState());
			expect(board.value.actions).toBe(2);
			expect(board.baseValue.actions).toBe(3);
		});
	});

	describe("swipe", () => {
		it("left increases value and base", async () => {
			const { store } = await setup({ value: 3 });

			await act(() => picker().onSwipeLeft?.());

			const board = selectTestBoard(store.getState());
			expect(board.value.actions).toBe(4);
			expect(board.baseValue.actions).toBe(4);
		});

		it("right decreases value and base", async () => {
			const { store } = await setup({ value: 3 });

			await act(() => picker().onSwipeRight?.());

			const board = selectTestBoard(store.getState());
			expect(board.value.actions).toBe(2);
			expect(board.baseValue.actions).toBe(2);
		});
	});

	describe("base value difference", () => {
		it("is hidden when base equals initial", async () => {
			await setup({ value: 3 });

			expect(screen.queryByTestId("actions-base-picker")).not.toBeOnTheScreen();
		});

		it("shows the signed difference", async () => {
			await setup({ value: 3, base: 4, initial: 3 });

			const basePicker = screen.getByTestId("actions-base-picker").props
				.pickerProps as PickerProps<number>;
			expect(basePicker.value).toBe(1);
		});
	});
});
