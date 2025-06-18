import { selectBoardProp, setBoardProp } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { omit } from "ramda";
import { put, select, take } from "redux-saga/effects";
import { changeBoardAbilityValue } from "../actions";
import { selectBoardAbilityById } from "../selectors";
import { canSetBoardAbilityValue } from "../validation";

export function* changeBoardAbilityValueSaga() {
	const payload: ActionCreatorPayload<typeof changeBoardAbilityValue> =
		yield take(changeBoardAbilityValue.match);

	const { boardId, abilityId } = payload;
	const abilityValuesSelector = selectBoardProp({
		boardId,
		prop: "abilityValues",
	});

	const abilityValues: ReturnType<typeof abilityValuesSelector> = yield select(
		abilityValuesSelector,
	);

	const abilitySelector = selectBoardAbilityById({
		boardId,
		abilityId,
	});

	const ability: ReturnType<typeof abilitySelector> =
		yield select(abilitySelector);

	if (!ability || !abilityValues) {
		return;
	}

	const allowed = canSetBoardAbilityValue({
		ability,
		value: payload.value,
	});

	if (!allowed) {
		return;
	}

	const value = {
		...abilityValues,
		[abilityId]: payload.value,
	};
	const boardPayload = omit(["value"], payload);

	yield put(
		setBoardProp({
			...boardPayload,
			prop: "abilityValues",
			value,
		}),
	);
}
