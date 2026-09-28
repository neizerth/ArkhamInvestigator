import {
	chaosBag,
	selectUnlimitedChaosTokens,
} from "@modules/chaos-bag/base/shared/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import {
	selectStoryCode,
	setStoryCode,
	stories,
} from "@modules/stories/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { prepareMultiplayerOnStartSaga } from "../prepareMultiplayerOnStartSaga";

const reducer = combineReducers({
	chaosBag: chaosBag.reducer,
	stories: stories.reducer,
});

describe("prepareMultiplayerOnStartSaga", () => {
	it("clears the chaos bag, disables unlimited tokens, and clears the story code when starting a multiplayer game", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setStoryCode("core" as never));
		const tester = createSagaTester({ reducer, state });
		tester.run(prepareMultiplayerOnStartSaga);

		tester.dispatch(startNewGame({ type: "multiplayer" }));

		expect(selectUnlimitedChaosTokens(tester.getState())).toBe(false);
		expect(selectStoryCode(tester.getState())).toBeNull();
	});

	it("does nothing for a single-player game start", () => {
		const tester = createSagaTester({ reducer });
		tester.run(prepareMultiplayerOnStartSaga);

		tester.dispatch(startNewGame({ type: "single" }));

		expect(tester.actions).toHaveLength(1); // only the startNewGame dispatch itself
	});
});
