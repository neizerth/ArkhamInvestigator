import { boardBaseSharedSaga } from "@modules/board/base/shared/lib/store/features/sagas";
import {
	selectTestBoard,
	withCurrentBoard,
} from "@modules/board/base/shared/lib/test/boardState";
import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { renderWithStore } from "@shared/lib/test/createTestStore";
import { act, screen } from "@testing-library/react-native";
import { range } from "ramda";
import { InvestigatorResources, ScenarioResources } from "../ResourcesStat";

jest.mock("@modules/core/control/entities/picker/ui", () =>
	require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock(),
);

type Values = {
	investigator?: number;
	scenario?: number;
	upkeep?: boolean;
	upkeepIncrease?: number;
};

const setup = (
	element: React.ReactElement,
	{
		investigator = 0,
		scenario = 0,
		upkeep = false,
		upkeepIncrease = 0,
	}: Values = {},
) =>
	renderWithStore(element, {
		patch: (state) => {
			withCurrentBoard({
				value: { resources: investigator },
				baseValue: { upkeepResourcesIncrease: upkeepIncrease },
				initialValue: { upkeepResourcesIncrease: upkeepIncrease },
			})(state);
			state.board.resources = scenario;
			state.board.showUpkeepResources = upkeep;
		},
		saga: boardBaseSharedSaga,
	});

const picker = (type = "investigator") =>
	screen.getByTestId(`${type}-resources-picker`).props
		.pickerProps as PickerProps<number>;

const scenarioPicker = () => picker("scenario");

describe("investigator resources", () => {
	it("renders the investigator value", async () => {
		await setup(<InvestigatorResources />, { investigator: 5 });

		expect(picker().value).toBe(5);
		expect(picker().data).toEqual(range(0, 101));
	});

	it("sets the picked value", async () => {
		const { store } = await setup(<InvestigatorResources />, {
			investigator: 5,
		});

		await act(() => picker().onValueChanged?.({ value: 2, index: 2 }));

		expect(selectTestBoard(store.getState()).value.resources).toBe(2);
	});

	it("decreases the value on press", async () => {
		const { store } = await setup(<InvestigatorResources />, {
			investigator: 5,
		});

		await act(() => picker().onPress?.());

		expect(selectTestBoard(store.getState()).value.resources).toBe(4);
	});

	it("stops at zero on press", async () => {
		const { store } = await setup(<InvestigatorResources />, {
			investigator: 0,
		});

		await act(() => picker().onPress?.());

		expect(selectTestBoard(store.getState()).value.resources).toBe(0);
	});

	it("resets the value on long press", async () => {
		const { store } = await setup(<InvestigatorResources />, {
			investigator: 5,
		});

		await act(() => picker().onLongPress?.());

		expect(selectTestBoard(store.getState()).value.resources).toBe(0);
	});
});

describe("scenario resources", () => {
	it("renders the scenario value", async () => {
		await setup(<ScenarioResources />, { scenario: 7 });

		expect(scenarioPicker().value).toBe(7);
	});

	it("sets the picked value", async () => {
		const { store } = await setup(<ScenarioResources />, { scenario: 7 });

		await act(() => scenarioPicker().onValueChanged?.({ value: 3, index: 3 }));

		expect(store.getState().board.resources).toBe(3);
	});

	it("decreases the value on press", async () => {
		const { store } = await setup(<ScenarioResources />, { scenario: 7 });

		await act(() => scenarioPicker().onPress?.());

		expect(store.getState().board.resources).toBe(6);
	});

	it("stops at zero on press", async () => {
		const { store } = await setup(<ScenarioResources />, { scenario: 0 });

		await act(() => scenarioPicker().onPress?.());

		expect(store.getState().board.resources).toBe(0);
	});

	it("resets the value on long press", async () => {
		const { store } = await setup(<ScenarioResources />, { scenario: 7 });

		await act(() => scenarioPicker().onLongPress?.());

		expect(store.getState().board.resources).toBe(0);
	});
});

describe("upkeep resources", () => {
	const upkeepIncrease = (state: ReturnType<typeof selectTestBoard>) =>
		state.baseValue.upkeepResourcesIncrease;

	it("is hidden by default", async () => {
		await setup(<InvestigatorResources />);

		expect(
			screen.queryByTestId("resources-upkeep-picker"),
		).not.toBeOnTheScreen();
	});

	it("is shown by the setting", async () => {
		await setup(<InvestigatorResources />, { upkeep: true });

		const upkeep = screen.getByTestId("resources-upkeep-picker").props
			.pickerProps as PickerProps<number>;
		expect(upkeep.data).toEqual(range(0, 21));
	});

	it("grows on swipe left", async () => {
		const { store } = await setup(<InvestigatorResources />, {
			upkeep: true,
			upkeepIncrease: 1,
		});

		await act(() => picker().onSwipeLeft?.());

		expect(upkeepIncrease(selectTestBoard(store.getState()))).toBe(2);
	});

	it("shrinks on swipe right", async () => {
		const { store } = await setup(<InvestigatorResources />, {
			upkeep: true,
			upkeepIncrease: 1,
		});

		await act(() => picker().onSwipeRight?.());

		expect(upkeepIncrease(selectTestBoard(store.getState()))).toBe(0);
	});

	it("never goes below zero", async () => {
		const { store } = await setup(<InvestigatorResources />, { upkeep: true });

		await act(() => picker().onSwipeRight?.());

		expect(upkeepIncrease(selectTestBoard(store.getState()))).toBe(0);
	});

	it("ignores swipes when the setting is off", async () => {
		const { store } = await setup(<InvestigatorResources />, {
			upkeepIncrease: 1,
		});

		await act(() => picker().onSwipeLeft?.());

		expect(upkeepIncrease(selectTestBoard(store.getState()))).toBe(1);
	});
});
