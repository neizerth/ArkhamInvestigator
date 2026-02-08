import { selectBoardById } from "@modules/board/base/shared/lib";
import {
	getReferencePartTokens,
	removeBoardChaosTokenOptionInternal,
	setBoardChaosTokenOptionInternal,
	setChaosTokenOptionInternal,
} from "@modules/chaos-bag/effect/shared/lib";
import { selectReferenceCardTokenEffectsByType } from "@modules/stories/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectCurrentChaosTokenOption,
	selectReferenceCardChaosTokenOptions,
} from "../../selectors";
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

	const referenceTokenSelector = selectReferenceCardTokenEffectsByType(type);
	const referenceTokenEffect: ReturnType<typeof referenceTokenSelector> =
		yield select(referenceTokenSelector);

	const tokenTypes = referenceTokenEffect
		? getReferencePartTokens(referenceTokenEffect)
		: [type];

	const { personal = false } = option;

	const optionIndex = selected ? index : null;

	if (personal) {
		for (const type of tokenTypes) {
			yield put(
				setBoardChaosTokenOptionInternal({
					boardId: board.id,
					type,
					optionIndex,
				}),
			);

			yield put(
				chaosTokenOptionUpdated({
					...payload,
					type,
				}),
			);
		}

		return;
	}

	const currentOptionSelector = selectCurrentChaosTokenOption({
		boardId,
		type,
	});
	const currentOption: ReturnType<typeof currentOptionSelector> = yield select(
		currentOptionSelector,
	);

	for (const type of tokenTypes) {
		// remove board option if last option was personal

		if (currentOption?.personal) {
			yield put(
				removeBoardChaosTokenOptionInternal({
					boardId: board.id,
					type,
				}),
			);
		}
		yield put(
			setChaosTokenOptionInternal({
				type,
				optionIndex,
			}),
		);
	}
}

export function* updateChaosTokenOptionSaga() {
	yield takeEvery(updateChaosTokenOption.match, worker);
}
