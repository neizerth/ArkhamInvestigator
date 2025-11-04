import {
	createAbilitySetFilter,
	type setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { openPrompt } from "@modules/core/modal/shared/prompt/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";
import { selectTokenGroups } from "../../lib";
import { getActions } from "./getActions";

const filterAction = createAbilitySetFilter({
	abilityId: AbilityCode.WendyAdams.parallel,
});

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const groupSelector = selectTokenGroups(boardId);
	const tokenGroups: ReturnType<typeof groupSelector> =
		yield select(groupSelector);

	const actions = getActions(tokenGroups);

	if (actions.length === 0) {
		return;
	}

	yield put(
		openPrompt({
			id: modalId,
			data: {
				faction: "survivor",
				title: "ability.wendy.parallel.title",
				subtitle: board.investigator.name,
				text: "ability.wendy.parallel.text",
				actions,
				placeholder: "ability.wendy.parallel.placeholder",
				inputProps: {
					maxLength: 7,
				},
			},
		}),
	);
}

export function* ParallelWendyAdamsReactionAbilitySaga() {
	yield takeEvery(filterAction, worker);
}
