import type { ActionCreatorPayload } from "@shared/model";
import { take } from "redux-saga/effects";
import { changeBoardAbilityValue } from "../actions";

export function* changeBoardAbilityValueSaga() {
	const payload: ActionCreatorPayload<typeof changeBoardAbilityValue> =
		yield take(changeBoardAbilityValue.match);

	// payload.

	// yield put()
}
