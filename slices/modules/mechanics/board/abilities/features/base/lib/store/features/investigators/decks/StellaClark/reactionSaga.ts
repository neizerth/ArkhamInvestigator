import {
	selectIsBoardAbilityUsed,
	setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import {
	increaseBoardActualPropValue,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { chaosBagRevealEnd } from "@modules/chaos-bag/reveal/base/entities/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!chaosBagRevealEnd.match(action)) {
		return false;
	}

	const { failed, skillCheckBoardId } = action.payload;

	console.log({
		failed,
		skillCheckBoardId,
	});

	return failed === true && Boolean(skillCheckBoardId);
};

function* worker({ payload }: ReturnType<typeof chaosBagRevealEnd>) {
	const { skillCheckBoardId } = payload;

	if (!skillCheckBoardId) {
		console.log("no skillCheckBoardId");
		return;
	}

	const boardSelector = selectBoardById(skillCheckBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.investigator.code !== InvesigatorCode.StellaClark) {
		return;
	}

	const isUsedSelector = selectIsBoardAbilityUsed({
		boardId: skillCheckBoardId,
		abilityId: "reaction",
	});

	const isUsed: ReturnType<typeof isUsedSelector> =
		yield select(isUsedSelector);

	if (isUsed) {
		console.log("isUsed");
		return;
	}

	yield put(
		setBoardAbilityUse({
			boardId: skillCheckBoardId,
			abilityId: "reaction",
			canUse: false,
		}),
	);

	yield put(
		increaseBoardActualPropValue({
			boardId: skillCheckBoardId,
			prop: "actions",
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId: skillCheckBoardId,
			message: "actions.get",
			data: {
				count: 1,
			},
		}),
	);
}

export function* StellaClarkReactionSaga() {
	yield takeEvery(filterAction, worker);
}
