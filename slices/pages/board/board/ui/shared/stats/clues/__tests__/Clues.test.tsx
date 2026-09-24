import { boardBaseSharedSaga } from "@modules/board/base/shared/lib/store/features/sagas";
import {
	selectTestBoard,
	withCurrentBoard,
} from "@modules/board/base/shared/lib/test/boardState";
import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { renderWithStore } from "@shared/lib/test/createTestStore";
import type { RootState } from "@shared/model";
import { act, fireEvent, screen } from "@testing-library/react-native";
import { range } from "ramda";
import { InvestigatorClues, ScenarioClues } from "../CluesStat";

jest.mock("@modules/core/control/entities/picker/ui", () =>
	require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock(),
);

type Values = {
	investigator?: number;
	scenario?: number;
	sync?: boolean;
};

const setup = (
	element: React.ReactElement,
	{ investigator = 0, scenario = 0, sync = false }: Values = {},
) =>
	renderWithStore(element, {
		patch: (state) => {
			withCurrentBoard({ value: { clues: investigator } })(state);
			state.board.clues = scenario;
			state.board.syncScenarioClues = sync;
		},
		saga: boardBaseSharedSaga,
	});

const picker = (testID = "investigator-clues") =>
	screen.getByTestId(`${testID}-picker`).props
		.pickerProps as PickerProps<number>;

const scenarioPicker = () => picker("scenario-clues");

const investigatorClues = (state: RootState) =>
	selectTestBoard(state).value.clues;

describe("investigator clues", () => {
	it("renders the investigator value", async () => {
		await setup(<InvestigatorClues />, { investigator: 3 });

		expect(picker().value).toBe(3);
		expect(picker().data).toEqual(range(0, 101));
	});

	it("sets the picked value", async () => {
		const { store } = await setup(<InvestigatorClues />, { investigator: 3 });

		await act(() => picker().onValueChanged?.({ value: 5, index: 5 }));

		expect(investigatorClues(store.getState())).toBe(5);
	});

	it("increases the value on press", async () => {
		const { store } = await setup(<InvestigatorClues />, { investigator: 3 });

		await act(() => picker().onPress?.());

		expect(investigatorClues(store.getState())).toBe(4);
	});

	it("resets the value on long press", async () => {
		const { store } = await setup(<InvestigatorClues />, { investigator: 3 });

		await act(() => picker().onLongPress?.());

		expect(investigatorClues(store.getState())).toBe(0);
	});

	describe("with scenario sync", () => {
		it("returns the spent clues to the scenario pool", async () => {
			const { store } = await setup(<InvestigatorClues />, {
				investigator: 3,
				scenario: 4,
				sync: true,
			});

			await act(() => picker().onValueChanged?.({ value: 1, index: 1 }));

			expect(investigatorClues(store.getState())).toBe(1);
			expect(store.getState().board.clues).toBe(6);
		});

		it("keeps the scenario pool when the value grows", async () => {
			const { store } = await setup(<InvestigatorClues />, {
				investigator: 3,
				scenario: 4,
				sync: true,
			});

			await act(() => picker().onValueChanged?.({ value: 5, index: 5 }));

			expect(store.getState().board.clues).toBe(4);
		});

		it("keeps the scenario pool when sync is off", async () => {
			const { store } = await setup(<InvestigatorClues />, {
				investigator: 3,
				scenario: 4,
			});

			await act(() => picker().onValueChanged?.({ value: 1, index: 1 }));

			expect(store.getState().board.clues).toBe(4);
		});
	});
});

describe("scenario clues", () => {
	it("renders the scenario value", async () => {
		await setup(<ScenarioClues />, { scenario: 6 });

		expect(scenarioPicker().value).toBe(6);
	});

	it("sets the picked value", async () => {
		const { store } = await setup(<ScenarioClues />, { scenario: 6 });

		await act(() => scenarioPicker().onValueChanged?.({ value: 2, index: 2 }));

		expect(store.getState().board.clues).toBe(2);
	});

	it("increases the value on press", async () => {
		const { store } = await setup(<ScenarioClues />, { scenario: 6 });

		await act(() => scenarioPicker().onPress?.());

		expect(store.getState().board.clues).toBe(7);
	});

	it("resets the value on long press", async () => {
		const { store } = await setup(<ScenarioClues />, { scenario: 6 });

		await act(() => scenarioPicker().onLongPress?.());

		expect(store.getState().board.clues).toBe(0);
	});

	describe("with investigator sync", () => {
		it("takes the added clues from the investigator", async () => {
			const { store } = await setup(<ScenarioClues />, {
				investigator: 3,
				scenario: 4,
				sync: true,
			});

			await act(() =>
				scenarioPicker().onValueChanged?.({ value: 6, index: 6 }),
			);

			expect(store.getState().board.clues).toBe(6);
			expect(investigatorClues(store.getState())).toBe(1);
		});

		it("never takes more than the investigator has", async () => {
			const { store } = await setup(<ScenarioClues />, {
				investigator: 1,
				scenario: 4,
				sync: true,
			});

			await act(() =>
				scenarioPicker().onValueChanged?.({ value: 8, index: 8 }),
			);

			expect(investigatorClues(store.getState())).toBe(0);
		});

		it("keeps the investigator clues when sync is off", async () => {
			const { store } = await setup(<ScenarioClues />, {
				investigator: 3,
				scenario: 4,
			});

			await act(() =>
				scenarioPicker().onValueChanged?.({ value: 6, index: 6 }),
			);

			expect(investigatorClues(store.getState())).toBe(3);
		});
	});
});

describe("sync lock", () => {
	it("toggles the scenario clues sync", async () => {
		const { store } = await setup(<InvestigatorClues />);

		await act(() => fireEvent.press(screen.getByTestId("clues-lock")));

		expect(store.getState().board.syncScenarioClues).toBe(true);
	});
});
