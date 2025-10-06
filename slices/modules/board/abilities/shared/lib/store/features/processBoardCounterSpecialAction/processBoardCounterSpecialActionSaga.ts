import { specialCounterAbilityCodes } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectBoardAbilityById } from "../../selectors";
import { setBoardAbilityValue } from "../setBoardAbilityValue";
import { processBoardCounterSpecialAction } from "./processBoardCounterSpecialAction";

function* worker({
	payload,
}: ReturnType<typeof processBoardCounterSpecialAction>) {
	const { abilityId, boardId } = payload;

	const abilitySelector = selectBoardAbilityById({
		boardId,
		abilityId,
	});

	const ability: ReturnType<typeof abilitySelector> =
		yield select(abilitySelector);

	if (ability?.type !== "counter") {
		return;
	}

	const skip = specialCounterAbilityCodes.includes(abilityId);

	if (skip) {
		return;
	}

	const value = ability.defaultValue ?? 0;

	yield put(
		setBoardAbilityValue({
			boardId,
			abilityId,
			value,
		}),
	);
}

export function* processBoardCounterSpecialActionSaga() {
	yield takeEvery(processBoardCounterSpecialAction.match, worker);
}
