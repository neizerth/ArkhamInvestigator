import {
	type boardSelectModalConfirmed,
	createConfirmBoardSelectModalFilter,
} from "@modules/core/modal/entities/board-select/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../config";
import { processReaction } from "../processReaction";

const filterAction = createConfirmBoardSelectModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof boardSelectModalConfirmed>) {
	yield put(
		processReaction({
			...payload,
			abilityId: AbilityCode.ReynauldDeChatillon,
			targetBoardId: payload.value,
		}),
	);
}

export function* ReynauldDeChatillonProcessModalConfirmSaga() {
	yield takeEvery(filterAction, worker);
}
