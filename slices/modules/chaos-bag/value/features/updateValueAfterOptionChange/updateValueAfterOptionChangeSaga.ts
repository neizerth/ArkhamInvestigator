import {
	chaosTokenOptionUpdated,
	selectReferenceCardChaosTokenOptions,
} from "@modules/chaos-bag/effect/entities/lib";
import { select, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof chaosTokenOptionUpdated>) {
	const { boardId, type } = payload;

	const optionsSelector = selectReferenceCardChaosTokenOptions(type);
	const options: ReturnType<typeof optionsSelector> =
		yield select(optionsSelector);
}

export function* updateValueAfterOptionChangeSaga() {
	yield takeEvery(chaosTokenOptionUpdated.match, worker);
}
