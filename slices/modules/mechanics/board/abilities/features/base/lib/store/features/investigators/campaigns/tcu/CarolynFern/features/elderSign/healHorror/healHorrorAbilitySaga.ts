import {
	increaseBoardActualPropValue,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { i18next } from "@modules/core/i18n/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { healHorror } from "./healHorror";

function* worker({ payload }: ReturnType<typeof healHorror>) {
	const { targetBoardId, boardId } = payload;

	const boardSelector = selectBoardById(targetBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.value.sanity >= board.baseValue.sanity) {
		return;
	}

	yield put(
		increaseBoardActualPropValue({
			boardId: targetBoardId,
			prop: "sanity",
		}),
	);

	const healSelf = targetBoardId === boardId;

	const i18nKey = healSelf ? "action.heal.self" : "action.heal";

	const value = i18next.t("plural.accusative.horror", {
		count: 1,
	});

	const message = i18next.t(i18nKey, {
		value,
	});

	const sourceBoardId = healSelf ? null : boardId;

	yield put(
		sendInvestigatorNotification({
			boardId: targetBoardId,
			sourceBoardId,
			message,
		}),
	);
}

export function* CarolynFernHealHorrorAbilitySaga() {
	yield takeEvery(healHorror.match, worker);
}
