import { chaosTokenOptionUpdated } from "@modules/chaos-bag/effect/entities/lib";
import { selectCurrentChaosTokenOption } from "@modules/chaos-bag/effect/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	formatChaosTokenValue,
	selectReferenceChaosChaosTokenValue,
	setChaosTokenValue,
} from "../../entities/lib";
import type { ChaosTokenValue } from "../../shared/model";

const filterAction = (action: unknown) => {
	if (!chaosTokenOptionUpdated.match(action)) {
		return false;
	}

	return action.payload.source === "ui";
};

function* worker({ payload }: ReturnType<typeof chaosTokenOptionUpdated>) {
	const { boardId, type } = payload;

	const optionSelector = selectCurrentChaosTokenOption({ boardId, type });
	const option: ReturnType<typeof optionSelector> =
		yield select(optionSelector);

	let value: ChaosTokenValue = 0;

	if (option) {
		value = formatChaosTokenValue(option.modified_value.modifier);
	} else {
		const valueSelector = selectReferenceChaosChaosTokenValue(type);
		value = yield select(valueSelector);
	}

	yield put(
		setChaosTokenValue({
			boardId,
			type,
			value,
		}),
	);
}

export function* updateValueAfterOptionChangeSaga() {
	yield takeEvery(filterAction, worker);
}
