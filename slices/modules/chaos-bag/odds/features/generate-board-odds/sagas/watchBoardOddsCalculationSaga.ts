import {
	boardChanged,
	setCurrentInvestigatorIndex,
} from "@modules/board/base/shared/lib";
import { chaosBagUpdated } from "@modules/chaos-bag/base/shared/lib";
import {
	setStoryCode,
	setStoryDifficultyId,
} from "@modules/stories/shared/lib";
import { debounce, put } from "redux-saga/effects";
import { generateBoardOdds } from "../generateBoardOdds";

function* worker() {
	yield put(generateBoardOdds());
}

function takeDebouncedAction(match: (action: unknown) => boolean) {
	// Increased debounce time to reduce frequency of calculations
	return debounce(300, match, worker);
}

export function* watchBoardOddsCalculationSaga() {
	// on board change
	yield takeDebouncedAction(setCurrentInvestigatorIndex.match);
	// on chaos bag updates
	yield takeDebouncedAction(chaosBagUpdated.match);
	// on board updates
	yield takeDebouncedAction(boardChanged.match);

	// on story code change
	yield takeDebouncedAction(setStoryCode.match);
	// on story difficulty id change
	yield takeDebouncedAction(setStoryDifficultyId.match);
}
