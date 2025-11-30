import { selectBoardById } from "@modules/board/base/shared/lib";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import {
	type chaosTokensRevealed,
	createRevealedTokenFilterAction,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { createCancelModalAction } from "@modules/core/modal/shared/actions/cancel/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openCustomModal } from "@modules/core/modal/shared/custom/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createRevealedTokenFilterAction({
	code: InvesigatorCode.WendyAdams.parallel,
	tokens: ["elderSign"],
});

function* worker({ payload }: ReturnType<typeof chaosTokensRevealed>) {
	const { boardId } = payload;

	const contents: ReturnType<typeof selectChaosBagContents> = yield select(
		selectChaosBagContents,
	);

	const getCount = (tokenType: ChaosTokenType) => {
		const data = contents.filter(
			({ type, sealed }) => type === tokenType && !sealed,
		);
		return data.length;
	};

	const blessCount = getCount("bless");
	const curseCount = getCount("curse");

	if (blessCount === 0 && curseCount === 0) {
		return;
	}

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	yield put(
		openCustomModal({
			id: CustomModalId.ParallelWendyAdams,
			data: {
				title: "ability.wendy.parallel.elderSign.title",
				subtitle: board.investigator.name,
				faction: "survivor",
				actions: [
					createCancelModalAction(),
					createConfirmModalAction({
						id: "parallel-wendy-adams-elder-sign-modal-action",
						title: "ability.wendy.parallel.elderSign.confirm.title",
						close: false,
					}),
				],
			},
		}),
	);
}

export function* ParallelWendyAdamsOpenModalSaga() {
	yield takeEvery(filterAction, worker);
}
