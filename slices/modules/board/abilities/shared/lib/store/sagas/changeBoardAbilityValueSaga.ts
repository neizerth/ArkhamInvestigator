import {
	selectBoardAbilityValues,
	setBoardProp,
} from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { boardAbilityValueChanged, changeBoardAbilityValue } from "../actions";
import { selectBoardAbilityById } from "../selectors";

export function* changeBoardAbilityValueSaga() {
	const payload: ActionCreatorPayload<typeof changeBoardAbilityValue> =
		yield take(changeBoardAbilityValue.match);

	const { boardId, abilityId } = payload;
	const abilityValuesSelector = selectBoardAbilityValues(boardId);

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

	const value = {
		...abilityValues,
		[abilityId]: payload.value,
	};

	yield put(
		setBoardProp({
			...payload,
			prop: "abilityValues",
			value,
		}),
	);

	const prevValue = abilityValues[abilityId];

	yield put(
		boardAbilityValueChanged({
			...payload,
			value: payload.value,
			prevValue,
		}),
	);
}
