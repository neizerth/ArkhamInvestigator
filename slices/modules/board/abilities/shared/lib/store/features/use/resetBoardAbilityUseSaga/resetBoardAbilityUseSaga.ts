import {
	selectBoardId,
	selectBoardUsedAbilities,
	selectBoardsCount,
	setBoardProp,
} from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { UsedAbilitiesService } from "../../../../UsedAbilitiesService";
import { selectBoardAbilityById } from "../../../selectors";
import { setBoardAbilityUse } from "../setBoardAbilityUse";

const filterAction = (action: unknown) =>
	setBoardAbilityUse.match(action) && action.payload.canUse === true;

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { active } = payload;
	const selectAbility = selectBoardAbilityById(payload);
	const selectUsedAbilities = selectBoardUsedAbilities(payload.boardId);
	const selectId = selectBoardId(payload.boardId);

	const ability: ReturnType<typeof selectAbility> = yield select(selectAbility);
	const usedAbilities: ReturnType<typeof selectUsedAbilities> =
		yield select(selectUsedAbilities);
	const targetBoardId: ReturnType<typeof selectId> = yield select(selectId);
	const boardsCount: ReturnType<typeof selectBoardsCount> =
		yield select(selectBoardsCount);

	if (!ability) {
		console.log("reset ability not found", payload);
		return;
	}

	const value = UsedAbilitiesService.resetAbilityUse({
		boardsCount,
		targetBoardId,
		usedAbilities,
		ability,
		active,
	});

	yield put(
		setBoardProp({
			...payload,
			prop: "usedAbilities",
			value,
		}),
	);
}

export function* resetBoardAbilityUseSaga() {
	yield takeEvery(filterAction, worker);
}
