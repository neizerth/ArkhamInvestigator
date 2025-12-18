import {
	boardChanged,
	setCurrentInvestigatorIndex,
} from "@modules/board/base/shared/lib";
import {
	chaosBagUpdated,
	selectShowChaosBagOdds,
	setShowChaosBagOdds,
} from "@modules/chaos-bag/base/shared/lib";
import {
	setStoryCode,
	setStoryDifficultyId,
} from "@modules/stories/shared/lib";
import { debounce, put, select } from "redux-saga/effects";
import { generateBoardOdds } from "../generateBoardOdds";

function* worker() {
	const enabled: ReturnType<typeof selectShowChaosBagOdds> = yield select(
		selectShowChaosBagOdds,
	);

	if (!enabled) {
		return;
	}

	yield put(generateBoardOdds());
}

function takeDebouncedMatch(match: (action: unknown) => boolean) {
	// Increased debounce time to reduce frequency of calculations
	return debounce(300, match, worker);
}

export function* watchBoardOddsCalculationSaga() {
	// on board change
	yield takeDebouncedMatch(setCurrentInvestigatorIndex.match);
	// on chaos bag updates
	yield takeDebouncedMatch(chaosBagUpdated.match);
	// on board updates
	yield takeDebouncedMatch(boardChanged.match);

	// on story code change
	yield takeDebouncedMatch(setStoryCode.match);
	// on story difficulty id change
	yield takeDebouncedMatch(setStoryDifficultyId.match);

	// on enable chaos odds module
	yield takeDebouncedMatch(setShowChaosBagOdds.match);
}
