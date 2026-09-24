import type { BoardState } from "@modules/board/base/shared/lib";
import { createTransform } from "redux-persist";

/**
 * The board description panel is runtime state: it lives in the persisted board slice,
 * so without this it stays open after a restart, covering the stats.
 */
export const boardRuntimeTransform = createTransform<BoardState, BoardState>(
	(inbound) => inbound,
	(outbound) => ({
		...outbound,
		showDescription: false,
		descriptionTransition: false,
	}),
	{ whitelist: ["board"] },
);

export const persistTransforms = [boardRuntimeTransform];
