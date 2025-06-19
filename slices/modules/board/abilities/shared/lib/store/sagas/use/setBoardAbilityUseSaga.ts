import type { ActionCreatorPayload } from "@shared/model";
import { take } from "redux-saga/effects";
import { setBoardAbilityUseAction } from "../../actions";

export function* setBoardAbilityUseSaga() {
	const payload: ActionCreatorPayload<typeof setBoardAbilityUseAction> =
		yield take(setBoardAbilityUseAction.match);
}
