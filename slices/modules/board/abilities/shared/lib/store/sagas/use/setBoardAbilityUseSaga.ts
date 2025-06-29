import {
	selectBoardId,
	selectBoardUsedAbilities,
	setBoardProp,
} from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { UsedAbilitiesService } from "../../../UsedAbilitiesService";
import { setBoardAbilityUse } from "../../actions";
import { selectBoardAbilityById } from "../../selectors";

const filterAction = (action: unknown) =>
	setBoardAbilityUse.match(action) && action.payload.use === false;

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const selectAbility = selectBoardAbilityById(payload);
	const selectUsedAbilities = selectBoardUsedAbilities(payload.boardId);
	const selectId = selectBoardId(payload.boardId);

	const ability: ReturnType<typeof selectAbility> = yield select(selectAbility);
	const usedAbilities: ReturnType<typeof selectUsedAbilities> =
		yield select(selectUsedAbilities);
	const boardId: ReturnType<typeof selectId> = yield select(selectId);

	if (!ability || !usedAbilities || typeof boardId !== "number") {
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
