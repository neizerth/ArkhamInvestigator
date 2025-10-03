import {
	selectBoardAbilityValue,
	setBoardAbilityValue,
} from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { newTurnStarted } from "@modules/mechanics/phase/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";

const abilityId = AbilityCode.PrestonFairmont.familyInheritance;

function* worker({ payload }: ReturnType<typeof newTurnStarted>) {
	console.log("Family Inheritance Update");
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { code } = board.investigator;

	if (code !== InvesigatorCode.PrestonFairmont) {
		return;
	}

	const valueSelector = selectBoardAbilityValue({
		boardId,
		abilityId,
	});

	const currentValue: ReturnType<typeof valueSelector> =
		yield select(valueSelector);

	console.log({
		currentValue,
	});

	yield put(
		setBoardAbilityValue({
			boardId,
			abilityId,
			value: currentValue + 4,
		}),
	);
}

export function* PrestonFairmontFamilyInheritanceUpdateSaga() {
	yield takeEvery(newTurnStarted.match, worker);
}
