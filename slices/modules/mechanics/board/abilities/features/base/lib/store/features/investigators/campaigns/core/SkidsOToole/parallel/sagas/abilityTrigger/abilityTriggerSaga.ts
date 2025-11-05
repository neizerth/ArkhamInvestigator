import {
	createAbilitySetFilter,
	type setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { range } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";
import { startResourcesTest } from "../startResourcesTest";

const filterAction = createAbilitySetFilter({
	abilityId: AbilityCode.SkidsOToole.parallel,
	canUse: false,
});

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);
	const { resources } = board.value;

	if (resources < 1) {
		yield put(startResourcesTest({ boardId }));
		return;
	}

	const max = Math.min(resources, 3);

	const actions = range(1, max + 1).map((count) =>
		createConfirmModalAction({
			id: `skids-resources-casino-${count}`,
			title: {
				i18nKey: "ability.skids.parallel.action",
				data: {
					count,
				},
			},
			icon: "",
			style: {
				justifyContent: "center",
			},
			data: {
				count,
			},
		}),
	);

	yield put(
		openConfirm({
			id: modalId,
			data: {
				faction: "rogue",
				title: "ability.skids.parallel.title",
				text: "ability.skids.parallel.text",
				subtitle: board.investigator.name,
				actions,
			},
		}),
	);
}

export function* ParallelSkidsOTooleAbilityTriggerSaga() {
	yield takeEvery(filterAction, worker);
}
