import { setBoardPart } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { changeBoardAbilityValue } from "../actions";
import { selectBoardAbilityById } from "../selectors";

export function* changeBoardAbilityValueSaga() {
	const payload: ActionCreatorPayload<typeof changeBoardAbilityValue> =
		yield take(changeBoardAbilityValue.match);

	const { boardId, abilityId } = payload;

	const abilitySelector = selectBoardAbilityById({
		boardId,
		abilityId,
	});

	const ability: ReturnType<typeof abilitySelector> =
		yield select(abilitySelector);

	if (!ability) {
		return;
	}

	const abilityValues = {
		[abilityId]: payload.value,
	};

	yield put(
		setBoardPart({
			...payload,
			data: {
				abilityValues,
			},
		}),
	);

	// const prevValue = abilityValues[abilityId];

	// yield put(
	// 	boardAbilityValueChanged({
	// 		...payload,
	// 		value: payload.value,
	// 		prevValue,
	// 	}),
	// );
}
