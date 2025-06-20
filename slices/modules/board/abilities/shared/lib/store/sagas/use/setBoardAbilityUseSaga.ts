import {
	changeBoardProp,
	selectBoardId,
	selectBoardUsedAbilities,
} from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { UsedAbilitiesService } from "../../../UsedAbilitiesService";
import { resetBoardAbilityUseAction } from "../../actions";
import { selectBoardAbilityById } from "../../selectors";

export function* setBoardAbilityUseSaga() {
	const payload: ActionCreatorPayload<typeof resetBoardAbilityUseAction> =
		yield take(resetBoardAbilityUseAction.match);

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
		changeBoardProp({
			...payload,
			prop: "usedAbilities",
			value,
		}),
	);
}
