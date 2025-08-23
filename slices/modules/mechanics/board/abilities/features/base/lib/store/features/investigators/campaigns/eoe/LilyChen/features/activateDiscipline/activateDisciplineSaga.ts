import {
	selectIsBoardAbilityUsed,
	setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { activateDiscipline } from "./activateDiscipline";

function* worker({ payload }: ReturnType<typeof activateDiscipline>) {
	const abilityUseSelector = selectIsBoardAbilityUsed(payload);

	const isUsed: ReturnType<typeof abilityUseSelector> =
		yield select(abilityUseSelector);

	if (isUsed) {
		return;
	}

	yield put(
		setBoardAbilityUse({
			...payload,
			canUse: false,
		}),
	);

	const boardSelector = selectBoardById(payload.boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const entries = Object.entries(AbilityCode.LilyChen);
	const entry = entries.find(([_, id]) => id === payload.abilityId);

	if (!entry) {
		return;
	}

	const [skillType] = entry;
	const icon = `[${skillType}]`;

	yield put(
		sendInvestigatorNotification({
			boardId: board.id,
			message: "ability.lily.discipline.flip.unbroken",
			data: {
				discipline: icon,
			},
		}),
	);
}

export function* LilyChenActivateDisciplineSaga() {
	yield takeEvery(activateDiscipline.match, worker);
}
