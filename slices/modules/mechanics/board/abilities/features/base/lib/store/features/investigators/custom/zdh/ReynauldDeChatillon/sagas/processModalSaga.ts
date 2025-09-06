import { boardSelectModalConfirmed } from "@modules/core/modal/entities/board-select/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { processReaction } from "../processReaction";

const filterAction = (action: unknown) => {
	if (!boardSelectModalConfirmed.match(action)) {
		return false;
	}

	const { payload } = action;

	return payload.modalAction.id === AbilityCode.ReynauldDeChatillon;
};

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
