import { renderWithStore } from "@shared/lib/test/createTestStore";
import { screen } from "@testing-library/react-native";
import { StyleSheet, type ViewStyle } from "react-native";
import { ActionsValue } from "../ActionsValue";
import { CluesValue } from "../CluesValue";
import { DoomValue } from "../DoomValue";
import { HealthValue, SanityValue } from "../MainStatValue";
import { ResourcesValue } from "../ResourcesValue";

/**
 * Pixel sizes of the compact stat values. Numbers are written out on purpose: they must
 * survive merging the components into one, where size becomes a variant.
 */

jest.mock("@modules/core/control/entities/picker/ui", () =>
	require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock(),
);

const style = (testID: string) => {
	const [element] = screen.getAllByTestId(testID);
	return StyleSheet.flatten(element.props.style) as ViewStyle;
};

const fontSize = (text: string) => {
	const [element] = screen.getAllByText(text);
	return StyleSheet.flatten(element.props.style).fontSize;
};

// height is the shared VALUE_HEIGHT, width follows the asset ratio
describe.each([
	["health", HealthValue, 24.3038],
	["sanity", SanityValue, 39.5833],
	["clues", CluesValue, 30],
	["resources", ResourcesValue, 30],
	["actions", ActionsValue, 39.1892],
	["doom", DoomValue, 30],
] as const)("%s value background", (stat, Component, width) => {
	it("is 30px high and keeps the asset ratio", async () => {
		await renderWithStore(<Component value={5} />);

		const background = style(`${stat}-background`);
		expect(background.height).toBe(30);
		expect(background.width).toBeCloseTo(width, 3);
	});

	it("renders the value at 24px", async () => {
		await renderWithStore(<Component value={5} />);

		expect(fontSize("5")).toBe(24);
	});
});

describe("initial value badge", () => {
	const withInitial = {
		patch: (state: { board: { showInitialHealthAndSanity: boolean } }) => {
			state.board.showInitialHealthAndSanity = true;
		},
	};

	it.each([
		["health", HealthValue, -8],
		["sanity", SanityValue, -4],
	] as const)(
		"%s sits below the right corner",
		async (stat, Component, right) => {
			await renderWithStore(
				<Component value={5} initialValue={7} />,
				withInitial,
			);

			const badge = style(`${stat}-initial`);
			expect(badge.position).toBe("absolute");
			expect(badge.right).toBe(right);
			expect(badge.bottom).toBe(-10);
		},
	);

	it("renders the initial value at 18px", async () => {
		await renderWithStore(
			<HealthValue value={5} initialValue={7} />,
			withInitial,
		);

		expect(fontSize("7")).toBe(18);
	});

	it("health is drawn behind the background", async () => {
		await renderWithStore(
			<HealthValue value={5} initialValue={7} />,
			withInitial,
		);

		expect(style("health-initial").zIndex).toBe(-1);
	});

	it("sanity is drawn behind the background", async () => {
		await renderWithStore(
			<SanityValue value={5} initialValue={7} />,
			withInitial,
		);

		expect(style("sanity-initial").zIndex).toBe(-1);
	});
});
