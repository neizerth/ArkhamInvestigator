import type { BoardState } from "@modules/board/base/shared/lib";
import { boardRuntimeTransform } from "../transforms";

const boardState = (patch: Partial<BoardState>) =>
	({ clues: 3, ...patch }) as BoardState;

describe("boardRuntimeTransform", () => {
	it("closes the description panel when the state is restored", () => {
		const restored = boardRuntimeTransform.out(
			boardState({ showDescription: true, descriptionTransition: true }),
			"board",
			{},
		);

		expect(restored.showDescription).toBe(false);
		expect(restored.descriptionTransition).toBe(false);
	});

	it("keeps the rest of the board state", () => {
		const restored = boardRuntimeTransform.out(
			boardState({ showDescription: true }),
			"board",
			{},
		);

		expect(restored).toMatchObject({ clues: 3 });
	});

	it("stores the state as it is", () => {
		const stored = boardRuntimeTransform.in(
			boardState({ showDescription: true }),
			"board",
			{},
		);

		expect(stored.showDescription).toBe(true);
	});
});
