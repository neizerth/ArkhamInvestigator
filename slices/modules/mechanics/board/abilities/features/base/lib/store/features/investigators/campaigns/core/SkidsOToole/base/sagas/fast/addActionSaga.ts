import {
	type changeBoardHistoryAbilityUse,
	createAbilityUseFilter,
} from "@modules/board/abilities/shared/lib";
import {
	decreaseBoardActualPropValue,
	increaseBoardActualPropValue,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.SkidsOToole.base.fast,
	isUsed: false,
});

function* worker({ payload }: ReturnType<typeof changeBoardHistoryAbilityUse>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);

	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.value.resources < 2) {
		return;
	}

	const historyGroupId = v4();
	yield put(
		decreaseBoardActualPropValue({
			boardId,
			prop: "resources",
			value: 2,
			history: {
				type: "group",
				id: historyGroupId,
			},
		}),
	);

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "actions",
			history: {
				type: "group",
				id: historyGroupId,
			},
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "actions.get",
			data: {
				count: 1,
			},
		}),
	);
}

export function* BaseSkidsOTooleAddActionSaga() {
	yield takeEvery(filterAction, worker);
}
