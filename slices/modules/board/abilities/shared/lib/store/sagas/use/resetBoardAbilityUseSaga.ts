import {
	selectBoardId,
	selectBoardUsedAbilities,
	setBoardProp,
} from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { UsedAbilitiesService } from "../../../UsedAbilitiesService";
import { setBoardAbilityUse } from "../../actions";
import { selectBoardAbilityById } from "../../selectors";

const filterAction = (action: unknown) =>
	setBoardAbilityUse.match(action) && action.payload.use === false;

export function* resetBoardAbilityUseSaga() {
	const payload: ActionCreatorPayload<typeof setBoardAbilityUse> =
		yield take(filterAction);

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

	const value = UsedAbilitiesService.resetAbilityUse({
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
