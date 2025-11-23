import { selectBoardById } from "@modules/board/base/shared/lib";
import {
	setBoardChaosTokenOptionInternal,
	setChaosTokenOptionInternal,
} from "@modules/chaos-bag/effect/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectReferenceCardChaosTokenOptions } from "../../selectors";
import { selectCurrentChaosTokenOption } from "../../selectors/selectCurrentChaosTokenOption";
import {
	chaosTokenOptionUpdated,
	updateChaosTokenOption,
} from "./updateChaosTokenOption";

function* worker({ payload }: ReturnType<typeof updateChaosTokenOption>) {
	const { boardId, type, index, selected } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const optionsSelector = selectReferenceCardChaosTokenOptions(type);
	const options: ReturnType<typeof optionsSelector> =
		yield select(optionsSelector);

	const option = options?.[index];

	if (!option) {
		return;
	}

	const { personal = false } = option;

	const optionIndex = selected ? index : null;

	if (personal) {
		yield put(
			setBoardChaosTokenOptionInternal({
				boardId: board.id,
				type,
				optionIndex,
			}),
		);

		yield put(chaosTokenOptionUpdated(payload));
		return;
	}

	const currentOptionSelector = selectCurrentChaosTokenOption({
		boardId,
		type,
	});
	const currentOption: ReturnType<typeof currentOptionSelector> = yield select(
		currentOptionSelector,
	);

	if (currentOption?.personal) {
		yield put(
			setBoardChaosTokenOptionInternal({
				boardId: board.id,
				type,
				optionIndex: null,
			}),
		);
	}

	yield put(
		setChaosTokenOptionInternal({
			type,
			optionIndex,
		}),
	);

	yield put(chaosTokenOptionUpdated(payload));
}

export function* updateChaosTokenOptionSaga() {
	yield takeEvery(updateChaosTokenOption.match, worker);
}
