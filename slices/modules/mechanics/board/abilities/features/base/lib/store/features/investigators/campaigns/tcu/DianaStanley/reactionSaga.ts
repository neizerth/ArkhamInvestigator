import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
	selectBoardAbilityValue,
	setBoardAbilityValue,
} from "@modules/board/abilities/shared/lib";
import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

const abilityId = AbilityCode.DianaStanley.reaction;

const filterAction = createAbilityUseFilter({
	id: abilityId,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId } = payload;

	const countSelector = selectBoardAbilityValue({
		boardId,
		abilityId: AbilityCode.DianaStanley.counter,
	});

	const dianaCardsCount: ReturnType<typeof countSelector> =
		yield select(countSelector);

	if (dianaCardsCount > 4) {
		return;
	}

	yield put(
		setBoardAbilityValue({
			boardId,
			abilityId: AbilityCode.DianaStanley.counter,
			value: dianaCardsCount + 1,
		}),
	);

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "resources",
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "ability.diana.reaction",
		}),
	);
}

export function* DianaStanleyAbilityReactionSaga() {
	yield takeEvery(filterAction, worker);
}
