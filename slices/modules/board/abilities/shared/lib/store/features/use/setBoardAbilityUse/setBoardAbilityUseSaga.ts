import {
	selectBoardUsedAbilities,
	setBoardProp,
} from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { UsedAbilitiesService } from "../../../../UsedAbilitiesService";
import { selectBoardAbilityById } from "../../../selectors";
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

	const selectAbility = selectBoardAbilityById(payload);
	const selectUsedAbilities = selectBoardUsedAbilities(payload.boardId);

	const ability: ReturnType<typeof selectAbility> = yield select(selectAbility);
	const usedAbilities: ReturnType<typeof selectUsedAbilities> =
		yield select(selectUsedAbilities);

	let boardId: number | undefined;

	if (abilityTargetBoardId) {
		const boardIdSelector = selectTargetBoardId(abilityTargetBoardId);

		boardId = yield select(boardIdSelector);
	}

	if (!ability || ability.toggle === false) {
		return;
	}

	const value = UsedAbilitiesService.setAbilityUsed({
		boardId,
		usedAbilities,
		ability,
	});

	if (!value) {
		return;
	}

	yield put(
		setBoardProp({
			...payload,
			prop: "usedAbilities",
			value,
		}),
	);

	yield put(boardAbilityUseSet(payload));
}

export function* setBoardAbilityUseSaga() {
	yield takeEvery(filterAction, worker);
}
