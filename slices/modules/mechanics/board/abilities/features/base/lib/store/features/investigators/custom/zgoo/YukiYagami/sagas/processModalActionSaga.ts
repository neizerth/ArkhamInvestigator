import { removeChaosTokens } from "@modules/chaos-bag/base/entities/lib";
import {
	createConfirmModalFilter,
	type modalConfirmed,
} from "@modules/core/modal/shared/actions/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../config";

const filterAction = createConfirmModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof modalConfirmed>) {
	const { boardId } = payload;
	yield put(
		removeChaosTokens({
			boardId,
			removeType: "type",
			type: "curse",
			source: "effect",
		}),
	);
}

export function* YukiYagamiProcessModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
