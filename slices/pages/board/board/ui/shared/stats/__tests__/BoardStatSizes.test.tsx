import { boardBaseSharedSaga } from "@modules/board/base/shared/lib/store/features/sagas";
import { withCurrentBoard } from "@modules/board/base/shared/lib/test/boardState";
import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { renderWithStore } from "@shared/lib/test/createTestStore";
import type { RootState } from "@shared/model";
import { screen } from "@testing-library/react-native";
import { StyleSheet, type ViewStyle } from "react-native";
import { Health, Sanity } from "../MainStat";

/**
 * Pixel sizes of the board stats. Numbers are written out on purpose: they must survive
 * merging the board and the compact components into one, where size becomes a variant.
 * The picker size setting is the scale: medium = 1, small = 0.8.
 */

jest.mock("@modules/core/control/entities/picker/ui", () =>
	require("@modules/core/control/entities/picker/lib/test/pickerMock").pickerUiMock(),
);

const setup = (
	Component: typeof Health,
	pickerSize?: RootState["picker"]["pickerSize"],
) =>
	renderWithStore(<Component />, {
		patch: (state) => {
			withCurrentBoard({
				value: { health: 5, sanity: 5 },
				baseValue: { health: 7, sanity: 7 },
				initialValue: { health: 6, sanity: 6 },
			})(state);
			if (pickerSize) {
				state.picker.pickerSize = pickerSize;
			}
		},
		saga: boardBaseSharedSaga,
	});

const style = (testID: string) => {
	const [element] = screen.getAllByTestId(testID);
	return StyleSheet.flatten(element.props.style) as ViewStyle;
};

const picker = (testID: string) =>
	screen.getByTestId(testID).props.pickerProps as PickerProps<number>;

describe.each([
	["health", Health, 57, 45],
	["sanity", Sanity, 92, 74],
] as const)("board %s background", (stat, Component, medium, small) => {
	it("is 70px high at the medium picker size", async () => {
		await setup(Component);

		const background = style(`${stat}-background`);
		expect(background.height).toBe(70);
		expect(background.width).toBe(medium);
	});

	it("shrinks to 56px at the small picker size", async () => {
		await setup(Component, "small");

		const background = style(`${stat}-background`);
		expect(background.height).toBe(56);
		expect(background.width).toBe(small);
	});

	// the picker item height is not scaled with the background
	it("keeps the picker item height at 70px in both sizes", async () => {
		await setup(Component, "small");

		expect(picker(`${stat}-picker`).itemHeight).toBe(70);
	});
});

describe("board initial value badge", () => {
	it.each([
		["health", Health, -10],
		["sanity", Sanity, 8],
	] as const)(
		"%s sits below the right corner",
		async (stat, Component, right) => {
			await renderWithStore(<Component />, {
				patch: (state) => {
					withCurrentBoard({
						value: { health: 5, sanity: 5 },
						baseValue: { health: 7, sanity: 7 },
						initialValue: { health: 6, sanity: 6 },
					})(state);
					state.board.showInitialHealthAndSanity = true;
				},
				saga: boardBaseSharedSaga,
			});

			const badge = style(`${stat}-initial`);
			expect(badge.position).toBe("absolute");
			expect(badge.right).toBe(right);
			expect(badge.bottom).toBe(-12);
		},
	);
});

describe("base value difference", () => {
	it.each([
		["health", Health, -25],
		["sanity", Sanity, 0],
	] as const)(
		"%s is placed above the right corner",
		async (stat, Component, right) => {
			await renderWithStore(<Component />, {
				patch: withCurrentBoard({
					value: { health: 5, sanity: 5 },
					baseValue: { health: 9, sanity: 9 },
					initialValue: { health: 7, sanity: 7 },
				}),
				saga: boardBaseSharedSaga,
			});

			const container = style(`${stat}-base-container`);
			expect(container.position).toBe("absolute");
			expect(container.right).toBe(right);
			expect(container.top).toBe(-10);
		},
	);
});
