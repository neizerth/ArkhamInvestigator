import { goToPage } from "@modules/core/router/shared/lib";
import { game, selectGameStatus } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { startMultiplayerGame } from "../startMultiplayerGame";
import { startMultiplayerGameSaga } from "../startMultiplayerGameSaga";

const reducer = combineReducers({ game: game.reducer });

describe("startMultiplayerGameSaga", () => {
	it("moves gameStatus to 'selecting' and navigates to investigator selection", () => {
		const tester = createSagaTester({ reducer });
		tester.run(startMultiplayerGameSaga);

		tester.dispatch(startMultiplayerGame());

		expect(selectGameStatus(tester.getState())).toBe("selecting");
		expect(tester.ofType(goToPage.type)).toHaveLength(1);
	});
});
