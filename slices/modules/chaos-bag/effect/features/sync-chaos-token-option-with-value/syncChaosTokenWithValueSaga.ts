import { selectBoardId } from "@modules/board/base/shared/lib";
import { chaosTokenValueSet } from "@modules/chaos-bag/value/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { updateChaosTokenOption } from "../../entities/lib/store/features/updateChaosTokenOption/updateChaosTokenOption";
import { selectReferenceCardChaosTokenOptions } from "../../entities/lib/store/selectors/selectChaosBagOptions";
import { removeBoardChaosTokenOptionInternal } from "../../shared/lib";

const filterAction = (action: unknown) => {
	if (!chaosTokenValueSet.match(action)) {
		return false;
	}

	const { payload } = action;
	return payload.source === "ui";
};

function* worker({ payload }: ReturnType<typeof chaosTokenValueSet>) {
	const { type, value, boardId } = payload;
	const optionsSelector = selectReferenceCardChaosTokenOptions(type);
	const options: ReturnType<typeof optionsSelector> =
		yield select(optionsSelector);

	const optionIndex = options.findIndex(
		(option) => option.modified_value.modifier === value,
	);

	if (optionIndex === -1) {
		const boardIdSelector = selectBoardId(payload.boardId);
		const boardId: ReturnType<typeof boardIdSelector> =
			yield select(boardIdSelector);

		yield put(
			removeBoardChaosTokenOptionInternal({
				boardId,
				type,
			}),
		);
		return;
	}

	const index = Math.max(optionIndex, 0);

	yield put(
		updateChaosTokenOption({
			boardId,
			type,
			index,
			selected: true,
		}),
	);
}

export function* syncChaosTokenWithValueSaga() {
	yield takeEvery(filterAction, worker);
}
