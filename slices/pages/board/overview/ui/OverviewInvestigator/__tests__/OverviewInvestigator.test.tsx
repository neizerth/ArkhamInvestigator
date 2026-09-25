import { boardBaseSharedSaga } from "@modules/board/base/shared/lib/store/features/sagas";
import {
	selectTestBoard,
	withCurrentBoard,
} from "@modules/board/base/shared/lib/test/boardState";
import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { makeActionSaga } from "@modules/mechanics/phase/features/lib/store/features/effects/investigation/makeAction/makeActionSaga";
import { renderWithStore } from "@shared/lib/test/createTestStore";
import type { RootState } from "@shared/model";
import { act, screen } from "@testing-library/react-native";
import { range } from "ramda";
import { spawn } from "redux-saga/effects";
import { OverviewInvestigator } from "../OverviewInvestigator";

jest.mock("@modules/core/control/entities/picker/ui", () =>
	require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock(),
);

function* saga() {
	yield spawn(boardBaseSharedSaga);
	yield spawn(makeActionSaga);
}

type Values = {
	health?: number;
	sanity?: number;
	clues?: number;
	resources?: number;
	actions?: number;
};

type Settings = Partial<
	Pick<
		RootState["board"],
		"showDamageAndHorror" | "allowNegativeHealthAndSanity"
	>
>;

const base = {
	health: 9,
	sanity: 5,
	clues: 0,
	resources: 5,
	actions: 3,
};

const setup = (values: Values = {}, settings: Settings = {}) =>
	renderWithStore(<OverviewInvestigator boardId={boardId} />, {
		patch: (state) => {
			withCurrentBoard({
				value: { ...base, ...values },
				baseValue: base,
				initialValue: base,
			})(state);
			Object.assign(state.board, settings);
		},
		saga,
	});

const boardId = 1;

const picker = (stat: string) =>
	screen.getByTestId(`overview-${boardId}-${stat}-picker`).props
		.pickerProps as PickerProps<number>;

const board = (state: RootState) => selectTestBoard(state);

describe("overview investigator", () => {
	it("renders the investigator name", async () => {
		await setup();

		expect(screen.getByText("fallback")).toBeOnTheScreen();
	});

	describe.each(["health", "sanity"] as const)("%s", (stat) => {
		it("renders the value and the whole range", async () => {
			await setup({ [stat]: 4 });

			expect(picker(stat).value).toBe(4);
			expect(picker(stat).data).toEqual(range(0, base[stat] + 1));
		});

		it("sets the picked value", async () => {
			const { store } = await setup({ [stat]: 4 });

			await act(() => picker(stat).onValueChanged?.({ value: 2, index: 2 }));

			expect(board(store.getState()).value[stat]).toBe(2);
		});

		it("decreases the value on press", async () => {
			const { store } = await setup({ [stat]: 4 });

			await act(() => picker(stat).onPress?.());

			expect(board(store.getState()).value[stat]).toBe(3);
		});

		it("stops at zero on press", async () => {
			const { store } = await setup({ [stat]: 0 });

			await act(() => picker(stat).onPress?.());

			expect(board(store.getState()).value[stat]).toBe(0);
		});

		describe("in damage and horror mode", () => {
			const wounds = { showDamageAndHorror: true };

			it("shows the wounds taken", async () => {
				await setup({ [stat]: 4 }, wounds);

				expect(picker(stat).value).toBe(base[stat] - 4);
			});

			it("turns the picked wounds back into the value", async () => {
				const { store } = await setup({ [stat]: 4 }, wounds);

				await act(() => picker(stat).onValueChanged?.({ value: 3, index: 3 }));

				expect(board(store.getState()).value[stat]).toBe(base[stat] - 3);
			});
		});

		it("extends the range below zero when negative values are allowed", async () => {
			await setup({ [stat]: 4 }, { allowNegativeHealthAndSanity: true });

			expect(picker(stat).data).toEqual(range(-20, base[stat] + 1));
		});
	});

	describe("clues", () => {
		it("renders the value", async () => {
			await setup({ clues: 2 });

			expect(picker("clues").value).toBe(2);
		});

		it("sets the picked value", async () => {
			const { store } = await setup({ clues: 2 });

			await act(() => picker("clues").onValueChanged?.({ value: 7, index: 7 }));

			expect(board(store.getState()).value.clues).toBe(7);
		});

		it("increases the value on press", async () => {
			const { store } = await setup({ clues: 2 });

			await act(() => picker("clues").onPress?.());

			expect(board(store.getState()).value.clues).toBe(3);
		});

		it("clears the value on long press", async () => {
			const { store } = await setup({ clues: 2 });

			await act(() => picker("clues").onLongPress?.());

			expect(board(store.getState()).value.clues).toBe(0);
		});
	});

	describe("resources", () => {
		it("decreases the value on press", async () => {
			const { store } = await setup({ resources: 5 });

			await act(() => picker("resources").onPress?.());

			expect(board(store.getState()).value.resources).toBe(4);
		});

		it("clears the value on long press", async () => {
			const { store } = await setup({ resources: 5 });

			await act(() => picker("resources").onLongPress?.());

			expect(board(store.getState()).value.resources).toBe(0);
		});
	});

	describe("actions", () => {
		it("renders the value", async () => {
			await setup({ actions: 3 });

			expect(picker("actions").value).toBe(3);
		});

		it("spends an action on press", async () => {
			const { store } = await setup({ actions: 3 });

			await act(() => picker("actions").onPress?.());

			expect(board(store.getState()).value.actions).toBe(2);
		});
	});
});
