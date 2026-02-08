import {
	boardChanged,
	setCurrentInvestigatorIndex,
} from "@modules/board/base/shared/lib";
import { chaosBagUpdated } from "@modules/chaos-bag/base/shared/lib";
import {
	selectShowChaosBagOdds,
	setShowChaosBagOdds,
} from "@modules/chaos-bag/odds/shared/lib";
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

const actionCreators = [
	setCurrentInvestigatorIndex,
	chaosBagUpdated,
	boardChanged,
	setStoryCode,
	setStoryDifficultyId,
	setShowChaosBagOdds,
];

/** Matches any action that should trigger board odds recalculation */
function isOddsTriggerAction(action: unknown): boolean {
	return actionCreators.some((actionCreator) => actionCreator.match(action));
}

export function* watchBoardOddsCalculationSaga() {
	// Single debounce for all triggers: chaosBagUpdated + boardChanged (e.g. on token remove)
	// fire together; we want one recalculation after 500ms, not two
	yield debounce(500, isOddsTriggerAction, worker);
}
