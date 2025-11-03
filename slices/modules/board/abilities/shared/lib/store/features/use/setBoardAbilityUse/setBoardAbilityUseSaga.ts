import {
	selectBoardId,
	selectBoardUsedAbilities,
	selectBoardsCount,
	setBoardProp,
} from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { UsedAbilitiesService } from "../../../../UsedAbilitiesService";
import {
	selectBoardAbilityById,
	selectIsBoardAbilityUsed,
} from "../../../selectors";
import { selectTargetBoardId } from "./selectTargetBoardId";
import { boardAbilityUseSet, setBoardAbilityUse } from "./setBoardAbilityUse";

const filterAction = (action: unknown) => {
	if (!setBoardAbilityUse.match(action)) {
		return false;
	}

	return action.payload.canUse === false;
};

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { abilityTargetBoardId } = payload;

	const isUsedSelector = selectIsBoardAbilityUsed(payload);
	const isUsed: ReturnType<typeof isUsedSelector> =
		yield select(isUsedSelector);

	if (isUsed) {
		return;
	}

	const selectAbility = selectBoardAbilityById(payload);
	const selectUsedAbilities = selectBoardUsedAbilities(payload.boardId);

	const ability: ReturnType<typeof selectAbility> = yield select(selectAbility);
	const usedAbilities: ReturnType<typeof selectUsedAbilities> =
		yield select(selectUsedAbilities);

	const boardSelector = selectBoardId(payload.boardId);
	const boardId: ReturnType<typeof boardSelector> = yield select(boardSelector);
	const boardsCount: ReturnType<typeof selectBoardsCount> =
		yield select(selectBoardsCount);

	let targetBoardId: number | undefined;

	if (abilityTargetBoardId) {
		const boardIdSelector = selectTargetBoardId(abilityTargetBoardId);

		targetBoardId = yield select(boardIdSelector);
	}

	if (!ability || (!payload.force && ability.toggle === false)) {
		console.log("skip", ability, payload);
		return;
	}

	const value = UsedAbilitiesService.setAbilityUsed({
		targetBoardId,
		usedAbilities,
		ability,
		boardId,
		boardsCount,
	});

	if (!value) {
		console.log("no ability value", value);
		return;
	}

	yield put(
		setBoardProp({
			...payload,
			prop: "usedAbilities",
			value,
		}),
	);

	console.log("set ability use", payload.abilityId, ability, value);

	yield put(boardAbilityUseSet(payload));
}

export function* setBoardAbilityUseSaga() {
	yield takeEvery(filterAction, worker);
}
