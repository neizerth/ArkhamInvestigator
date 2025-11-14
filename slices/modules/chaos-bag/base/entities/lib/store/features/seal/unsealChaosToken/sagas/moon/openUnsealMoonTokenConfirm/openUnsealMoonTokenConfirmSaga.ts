import {
	selectAllowNegativeHealthAndSanity,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { compact } from "ramda-adjunct";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	modalId,
	unsealMoonTokenHealthActionId,
	unsealMoonTokenSanityActionId,
} from "../config";
import { openUnsealMoonTokenConfirm } from "./openUnsealMoonTokenConfirm";

function* worker({ payload }: ReturnType<typeof openUnsealMoonTokenConfirm>) {
	const { boardId, id } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const canUseNegativeValues: ReturnType<
		typeof selectAllowNegativeHealthAndSanity
	> = yield select(selectAllowNegativeHealthAndSanity);

	const canDecreaseHealth = canUseNegativeValues || board.value.health > 0;
	const canDecreaseSanity = canUseNegativeValues || board.value.sanity > 0;

	yield put(
		openConfirm({
			id: modalId,
			data: {
				title: "chaosBag.unseal.moon.title",
				text: "chaosBag.unseal.moon.text",
				actions: compact([
					canDecreaseHealth &&
						createConfirmModalAction({
							id: unsealMoonTokenHealthActionId,
							icon: "health",
							title: "chaosBag.unseal.moon.damage.text",
							data: {
								type: "health",
								boardId,
								id,
							},
						}),
					canDecreaseSanity &&
						createConfirmModalAction({
							id: unsealMoonTokenSanityActionId,
							icon: "sanity",
							title: "chaosBag.unseal.moon.horror.text",
							data: {
								type: "sanity",
								boardId,
								id,
							},
						}),
				]),
			},
		}),
	);
}

export function* openUnsealMoonTokenConfirmSaga() {
	yield takeEvery(openUnsealMoonTokenConfirm.match, worker);
}
