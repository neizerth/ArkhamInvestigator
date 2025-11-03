import {
	selectBoardAbilityValue,
	setBoardAbilityValue,
} from "@modules/board/abilities/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.LukeRobinson,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;

	const valueSelector = selectBoardAbilityValue({
		boardId,
		abilityId: AbilityCode.LukeRobinson,
	});
	const value: ReturnType<typeof valueSelector> = yield select(valueSelector);

	yield put(
		setBoardAbilityValue({
			boardId,
			abilityId: AbilityCode.LukeRobinson,
			value: value + 1,
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "ability.luke.gateBox",
			data: {
				count: 1,
			},
		}),
	);
}

export function* LukeRobinsonAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
