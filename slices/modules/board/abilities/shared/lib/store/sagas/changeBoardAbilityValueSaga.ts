import { selectBoardAbilityValues } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { omit } from "ramda";
import { put, select, take } from "redux-saga/effects";
import { setBoardAbilityValues } from "../actionCreators";
import { changeBoardAbilityValue } from "../actions";
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

	const data = {
		...abilityValues,
		[abilityId]: payload.value,
	};

	const boardPayload = omit(["value"], payload);

	yield put(
		setBoardAbilityValues({
			...boardPayload,
			data,
		}),
	);
}
