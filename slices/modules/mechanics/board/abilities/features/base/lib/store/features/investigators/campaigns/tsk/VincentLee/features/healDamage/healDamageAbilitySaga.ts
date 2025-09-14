import {
	increaseBoardActualPropValue,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { i18next } from "@modules/core/i18n/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { healDamage } from "./healDamage";

function* worker({ payload }: ReturnType<typeof healDamage>) {
	const { targetBoardId, boardId } = payload;

	const boardSelector = selectBoardById(targetBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.value.health >= board.baseValue.health) {
		return;
	}

	yield put(
		increaseBoardActualPropValue({
			boardId: targetBoardId,
			prop: "health",
		}),
	);

	const healSelf = targetBoardId === boardId;

	const i18nKey = healSelf ? "action.heal.self" : "action.heal";

	const value = i18next.t("plural.accusative.damage", {
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

export function* VincentLeeHealDamageAbilitySaga() {
	yield takeEvery(healDamage.match, worker);
}
