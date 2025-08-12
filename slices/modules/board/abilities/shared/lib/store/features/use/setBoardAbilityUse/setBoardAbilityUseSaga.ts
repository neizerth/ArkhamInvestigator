import {
	selectBoardId,
	selectBoardUsedAbilities,
	setBoardProp,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { put, select, takeEvery } from "redux-saga/effects";
import { UsedAbilitiesService } from "../../../../UsedAbilitiesService";
import { selectBoardAbilityById } from "../../../selectors";
import { setBoardAbilityUse } from "./setBoardAbilityUse";

const filterAction = (action: unknown) => {
	if (!setBoardAbilityUse.match(action)) {
		return false;
	}

	return action.payload.canUse === false;
};

function* selectTargetBoardId(boardId?: BoardId) {
	if (!boardId) {
		return;
	}

	const selectId = selectBoardId(boardId);
	const targetBoardId: ReturnType<typeof selectId> = yield select(selectId);

	return targetBoardId;
}

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const selectAbility = selectBoardAbilityById(payload);
	const selectUsedAbilities = selectBoardUsedAbilities(payload.boardId);

	const ability: ReturnType<typeof selectAbility> = yield select(selectAbility);
	const usedAbilities: ReturnType<typeof selectUsedAbilities> =
		yield select(selectUsedAbilities);

	const boardId: number | undefined = yield selectTargetBoardId(
		payload.abilityTargetBoardId,
	);

	if (!ability || ability.toggle === false) {
		return;
	}

	const value = UsedAbilitiesService.setAbilityUsed({
		boardId,
		usedAbilities,
		ability,
	});

	yield put(
		setBoardProp({
			...payload,
			prop: "usedAbilities",
			value,
		}),
	);
}

export function* setBoardAbilityUseSaga() {
	yield takeEvery(filterAction, worker);
}
