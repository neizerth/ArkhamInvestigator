import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { call } from "ramda";
import { takeEvery } from "redux-saga/effects";
import { sendMarieLambeauReactionNotification } from "./util";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.MarieLambeau.chapter2,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId } = payload;

	yield call(sendMarieLambeauReactionNotification, boardId);
}

export function* MarieLambeauReactionAbilityTriggerSaga() {
	yield takeEvery(filterAction, worker);
}
