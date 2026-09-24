import { boardBaseSharedSaga } from "@modules/board/base/shared/lib/store/features/sagas";
import {
	selectTestBoard,
	withCurrentBoard,
} from "@modules/board/base/shared/lib/test/boardState";
import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { renderWithStore } from "@shared/lib/test/createTestStore";
import { act, screen } from "@testing-library/react-native";
import { range } from "ramda";
import { InvestigatorDoom } from "../InvestigatorDoom";
import { ScenarioDoom } from "../ScenarioDoom";

jest.mock("@modules/core/control/entities/picker/ui", () =>
	require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock(),
);

const setup = (
	element: React.ReactElement,
	{ investigator = 0, scenario = 0 } = {},
) =>
	renderWithStore(element, {
		patch: (state) => {
			withCurrentBoard({ value: { doom: investigator } })(state);
			state.board.doom = scenario;
		},
		saga: boardBaseSharedSaga,
	});

const picker = (testID: string) =>
	screen.getByTestId(`${testID}-picker`).props
		.pickerProps as PickerProps<number>;

const investigatorPicker = () => picker("investigator-doom");
const scenarioPicker = () => picker("scenario-doom");

describe("investigator doom", () => {
	const doom = (state: ReturnType<typeof selectTestBoard>) => state.value.doom;

	it("renders the investigator value", async () => {
		await setup(<InvestigatorDoom />, { investigator: 2 });

		expect(investigatorPicker().value).toBe(2);
		expect(investigatorPicker().data).toEqual(range(0, 101));
	});

	it("sets the picked value", async () => {
		const { store } = await setup(<InvestigatorDoom />, { investigator: 2 });

		await act(() =>
			investigatorPicker().onValueChanged?.({ value: 5, index: 5 }),
		);

		expect(doom(selectTestBoard(store.getState()))).toBe(5);
	});

	it("increases the value on press", async () => {
		const { store } = await setup(<InvestigatorDoom />, { investigator: 2 });

		await act(() => investigatorPicker().onPress?.());

		expect(doom(selectTestBoard(store.getState()))).toBe(3);
	});

	it("resets the value on long press", async () => {
		const { store } = await setup(<InvestigatorDoom />, { investigator: 2 });

		await act(() => investigatorPicker().onLongPress?.());

		expect(doom(selectTestBoard(store.getState()))).toBe(0);
	});
});

describe("scenario doom", () => {
	it("renders the scenario value", async () => {
		await setup(<ScenarioDoom />, { scenario: 4 });

		expect(scenarioPicker().value).toBe(4);
		expect(scenarioPicker().data).toEqual(range(0, 101));
	});

	it("sets the picked value", async () => {
		const { store } = await setup(<ScenarioDoom />, { scenario: 4 });

		await act(() => scenarioPicker().onValueChanged?.({ value: 9, index: 9 }));

		expect(store.getState().board.doom).toBe(9);
	});

	it("increases the value on press", async () => {
		const { store } = await setup(<ScenarioDoom />, { scenario: 4 });

		await act(() => scenarioPicker().onPress?.());

		expect(store.getState().board.doom).toBe(5);
	});

	it("resets the value on long press", async () => {
		const { store } = await setup(<ScenarioDoom />, { scenario: 4 });

		await act(() => scenarioPicker().onLongPress?.());

		expect(store.getState().board.doom).toBe(0);
	});
});
