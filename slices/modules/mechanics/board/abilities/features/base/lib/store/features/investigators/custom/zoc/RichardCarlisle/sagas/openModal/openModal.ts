import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";
import { getModalActions } from "./getModalActions";

const filterAction = (action: unknown) => {
	if (!setBoardAbilityUse.match(action)) {
		return false;
	}

	const { payload } = action;

	return (
		payload.abilityId === AbilityCode.RichardCarlisle.reaction &&
		!payload.force &&
		payload.canUse === false
	);
};

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { investigator } = board;
	const actions = getModalActions(board);

	yield put(
		openConfirm({
			id: modalId,
			data: {
				faction: "mystic",
				title: investigator.name,
				subtitle: "Choose an effect",
				text: "ability.richard.modal.text",
				actions,
			},
		}),
	);
}

export function* RichardCarlisleOpenModalSaga() {
	yield takeEvery(filterAction, worker);
}
