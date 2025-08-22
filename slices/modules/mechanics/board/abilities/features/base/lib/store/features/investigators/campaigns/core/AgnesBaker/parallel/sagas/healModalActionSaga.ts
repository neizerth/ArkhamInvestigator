import {
	increaseBoardActualPropValue,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { i18next } from "@modules/core/i18n/shared/config";
import {
	createConfirmModalFilter,
	type modalConfirmed,
} from "@modules/core/modal/shared/actions/confirm/lib";
import { getBoardDamage } from "@modules/mechanics/board/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../config";

const filterAction = createConfirmModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof modalConfirmed>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const damage = getBoardDamage(board);

	if (damage === 0) {
		return;
	}

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "health",
		}),
	);

	const value = i18next.t("plural.accusative.damage", {
		count: 1,
	});

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "action.heal.self",
			data: {
				value,
			},
		}),
	);
}

export function* ParallelAgnesBakerHealModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
