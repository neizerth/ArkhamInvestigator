import { selectBoardById } from "@modules/board/base/shared/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	addElderSignModalActionId,
	cancelAutoFailModalId,
} from "../../../config";
import { openFatherMateoConfirm } from "./openConfirm";

function* worker({ payload }: ReturnType<typeof openFatherMateoConfirm>) {
	const { sourceBoardId } = payload;

	const boardSelector = selectBoardById(sourceBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const title = "Добавить [elder_sign]?";
	const subtitle = board.investigator.name;

	yield put(
		openConfirm({
			id: cancelAutoFailModalId,
			data: {
				title,
				subtitle,
				faction: "mystic",
				text: "ability.mateo.base.confirm.text",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: addElderSignModalActionId,
						title: "ability.mateo.base.confirm.submit",
					}),
				],
			},
		}),
	);
}

export function* FatherMateoOpenConfirmSaga() {
	yield takeEvery(openFatherMateoConfirm.match, worker);
}
