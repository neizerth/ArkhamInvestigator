import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { renderWithStore } from "@shared/lib/test/createTestStore";
import { screen } from "@testing-library/react-native";
import { range } from "ramda";
import { Text } from "react-native";
import { ActionsValue } from "../ActionsValue";
import { CluesValue } from "../CluesValue";
import { DoomValue } from "../DoomValue";
import { ResourcesValue } from "../ResourcesValue";

jest.mock("@modules/core/control/entities/picker/ui", () =>
	require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock(),
);

const getPicker = () =>
	screen.getByTestId("picker").props.pickerProps as PickerProps<number>;

describe.each([
	["clues", CluesValue],
	["resources", ResourcesValue],
	["actions", ActionsValue],
	["doom", DoomValue],
] as const)("%s value", (_stat, Component) => {
	it("renders the value without picker by default", async () => {
		await renderWithStore(<Component value={7} />);

		expect(screen.getAllByText("7").length).toBeGreaterThan(0);
		expect(screen.queryByTestId("picker")).not.toBeOnTheScreen();
	});

	it("uses the default data in picker mode", async () => {
		await renderWithStore(<Component type="picker" value={7} />);

		expect(getPicker().data).toEqual(range(0, 101));
		expect(getPicker().value).toBe(7);
	});

	it("takes the data from props", async () => {
		await renderWithStore(
			<Component type="picker" value={2} data={[1, 2, 3]} />,
		);

		expect(getPicker().data).toEqual([1, 2, 3]);
	});

	it("passes the change handler through", async () => {
		const onValueChanged = jest.fn();
		await renderWithStore(
			<Component type="picker" value={7} onValueChanged={onValueChanged} />,
		);

		getPicker().onValueChanged?.({ value: 8, index: 8 });

		expect(onValueChanged).toHaveBeenCalledWith({ value: 8, index: 8 });
	});

	it("renders children over the background", async () => {
		await renderWithStore(
			<Component value={7}>
				<Text>child</Text>
			</Component>,
		);

		expect(screen.getByText("child")).toBeOnTheScreen();
	});
});
