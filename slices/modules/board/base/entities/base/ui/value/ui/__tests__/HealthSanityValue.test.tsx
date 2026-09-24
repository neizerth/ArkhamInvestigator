import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { renderWithStore } from "@shared/lib/test/createTestStore";
import { screen } from "@testing-library/react-native";
import { StyleSheet, Text } from "react-native";
import { HealthValue, SanityValue } from "../MainStatValue";

jest.mock("@modules/core/control/entities/picker/ui", () =>
	require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock(),
);

type Stat = "health" | "sanity";

const withInitialSetting = {
	patch: (state: { board: { showInitialHealthAndSanity: boolean } }) => {
		state.board.showInitialHealthAndSanity = true;
	},
};

const getFontSize = (text: string) => {
	const [element] = screen.getAllByText(text);
	return StyleSheet.flatten(element.props.style).fontSize;
};

describe.each([
	["health", HealthValue],
	["sanity", SanityValue],
] as const)("%s value", (stat: Stat, Component) => {
	it("renders the value without picker by default", async () => {
		await renderWithStore(<Component value={5} />);

		expect(screen.getAllByText("5").length).toBeGreaterThan(0);
		expect(screen.queryByTestId("picker")).not.toBeOnTheScreen();
	});

	it("passes picker props in picker mode", async () => {
		const onValueChanged = jest.fn();
		await renderWithStore(
			<Component
				type="picker"
				value={3}
				data={[1, 2, 3, 4]}
				onValueChanged={onValueChanged}
			/>,
		);

		const picker = screen.getByTestId("picker").props
			.pickerProps as PickerProps<number>;
		expect(picker.value).toBe(3);
		expect(picker.data).toEqual([1, 2, 3, 4]);

		picker.onValueChanged?.({ value: 4, index: 3 });
		expect(onValueChanged).toHaveBeenCalledWith({ value: 4, index: 3 });
	});

	it("renders children over the background", async () => {
		await renderWithStore(
			<Component value={5}>
				<Text>child</Text>
			</Component>,
		);

		expect(screen.getByText("child")).toBeOnTheScreen();
	});

	describe("initial value", () => {
		it("is hidden by default", async () => {
			await renderWithStore(<Component value={5} initialValue={7} />);

			expect(screen.queryByTestId(`${stat}-initial`)).not.toBeOnTheScreen();
		});

		it("is shown by the setting", async () => {
			await renderWithStore(
				<Component value={5} initialValue={7} />,
				withInitialSetting,
			);

			expect(screen.getByTestId(`${stat}-initial`)).toHaveTextContent("7", {
				exact: false,
			});
		});

		it("is hidden without initial value even with the setting", async () => {
			await renderWithStore(<Component value={5} />, withInitialSetting);

			expect(screen.queryByTestId(`${stat}-initial`)).not.toBeOnTheScreen();
		});
	});

	it("uses the regular font for one digit", async () => {
		await renderWithStore(<Component value={5} />);

		expect(getFontSize("5")).toBe(24);
	});
});
