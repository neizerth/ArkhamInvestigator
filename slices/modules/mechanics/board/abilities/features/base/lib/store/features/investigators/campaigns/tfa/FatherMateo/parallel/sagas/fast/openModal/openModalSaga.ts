import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import {
	selectBoardById,
	selectBoardIds,
} from "@modules/board/base/shared/lib";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { openBoardSelectModal } from "@modules/core/modal/entities/board-select/lib";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { isNotNil } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalActionId, modalId } from "../../../config";
import { sealBlessOnBoard } from "../sealBlessOnBoard";

const filterAction = (action: unknown) => {
	if (!setBoardAbilityUse.match(action)) {
		return false;
	}

	const { payload } = action;

	return (
		payload.abilityId === AbilityCode.FatherMateo.parallel &&
		payload.canUse === false &&
		!payload.force
	);
};

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const boardIds: ReturnType<typeof selectBoardIds> =
		yield select(selectBoardIds);
	const contents: ReturnType<typeof selectChaosBagContents> = yield select(
		selectChaosBagContents,
	);

	const bless = contents.filter(
		({ type, sealed }) => type === "bless" && !sealed,
	);

	const haveBless = bless.length > 0;

	if (!haveBless) {
		return;
	}

	const sealedBlessBoards = contents
		.map(
			({ sealData, type }) =>
				type === "bless" &&
				sealData?.type === "investigator" &&
				sealData.boardId,
		)
		.filter(isNotNil);

	const availableBoardIds = boardIds.filter((boardId) => {
		return !sealedBlessBoards.includes(boardId);
	});

	if (availableBoardIds.length === 0) {
		return;
	}

	if (availableBoardIds.length === 1) {
		const targetBoardId = availableBoardIds[0];
		yield put(
			sealBlessOnBoard({
				boardId,
				targetBoardId,
			}),
		);
		return;
	}

	yield put(
		openBoardSelectModal({
			id: modalId,
			data: {
				title: "ability.mateo.parallel.modal.title",
				subtitle: board.investigator.name,
				boardIds: availableBoardIds,
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: modalActionId,
					}),
				],
			},
		}),
	);
}

export function* ParallelFatherMateoOpenModalSaga() {
	yield takeEvery(filterAction, worker);
}
