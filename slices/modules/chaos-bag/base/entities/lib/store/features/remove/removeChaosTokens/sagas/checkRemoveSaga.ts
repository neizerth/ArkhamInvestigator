import { selectUnrevealedChaosTokensByType } from "@modules/chaos-bag/reveal/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectCanRemoveChaosTokens,
	selectChaosTokenCountByType,
} from "../../../../selectors";
import {
	openRemoveChaosTokenConfirm,
	procesChaosTokenRemove,
	removeChaosTokens,
} from "../../removeChaosTokens";
import { cantRemoveChaosTokens } from "../cantRemoveChaosTokens";

type Action = ReturnType<typeof removeChaosTokens>;
type Payload = Action["payload"];

function* worker(action: Action) {
	const { payload } = action;
	const { boardId } = payload;

	const type = getTokenType(payload);
	const removeCount: number = yield getRemoveCount(payload);

	const canRemoveSelector = selectCanRemoveChaosTokens({
		type,
		count: removeCount,
	});
	const validation: ReturnType<typeof canRemoveSelector> =
		yield select(canRemoveSelector);

	if (!validation.canRemove) {
		yield put(
			cantRemoveChaosTokens({
				...validation,
				type,
				boardId,
			}),
		);
		return;
	}

	const availableSelector = selectUnrevealedChaosTokensByType(type);
	const availableTokensByType: ReturnType<typeof availableSelector> =
		yield select(availableSelector);

	const availableToRemoveCount = availableTokensByType.length;

	if (removeCount > availableToRemoveCount) {
		yield put(
			openRemoveChaosTokenConfirm({
				...payload,
				type,
				availableToRemoveCount,
				removeCount,
			}),
		);
		return;
	}

	yield put(procesChaosTokenRemove(payload));
}

function* getRemoveCount(payload: Payload) {
	switch (payload.removeType) {
		case "single":
		case "type":
			return 1;
		case "multiple":
			return payload.count;
		case "all": {
			const total: number = yield select(
				selectChaosTokenCountByType(payload.type),
			);

			return total;
		}
	}
}

const getTokenType = (payload: Payload) => {
	if (payload.removeType === "single") {
		return payload.token.type;
	}
	return payload.type;
};

export function* checkRemoveChaosTokenConfirmSaga() {
	yield takeEvery(removeChaosTokens.match, worker);
}
