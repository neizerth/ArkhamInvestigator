import {
	selectBoardAbilityById,
	setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import {
	increaseBoardActualPropValue,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { i18next } from "@modules/core/i18n/shared/config";
import { getBoardHorror } from "@modules/mechanics/board/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { processReaction } from "../processReaction";

function* worker({ payload }: ReturnType<typeof processReaction>) {
	const { targetBoardId, abilityId, boardId } = payload;

	const abiliySelector = selectBoardAbilityById({
		abilityId,
		boardId,
	});

	const ability: ReturnType<typeof abiliySelector> =
		yield select(abiliySelector);

	if (!ability) {
		return;
	}

	const boardSelector = selectBoardById(boardId);
	const targetBoardSelector = selectBoardById(targetBoardId);

	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);
	const targetBoard: ReturnType<typeof targetBoardSelector> =
		yield select(targetBoardSelector);

	yield put(
		setBoardAbilityUse({
			abilityId,
			boardId,
			abilityTargetBoardId: targetBoardId,
			canUse: false,
		}),
	);

	const self = targetBoardId === board.id;

	const horror = getBoardHorror(targetBoard);
	const canHeal = horror > 0;

	if (canHeal) {
		yield put(
			increaseBoardActualPropValue({
				boardId: targetBoardId,
				prop: "sanity",
			}),
		);
	}

	const message = self
		? "ability.reynauld.reaction.self"
		: "ability.reynauld.reaction";

	const t = {
		and: i18next.t("preposition.and"),
		horror: i18next.t("plural.accusative.horror", {
			count: 1,
		}),
		heals: i18next.t("action.heal.word"),
	};

	const value = canHeal ? `${t.and} ${t.heals} ${t.horror}` : "";

	yield put(
		sendInvestigatorNotification({
			boardId: targetBoardId,
			...(self ? {} : { sourceBoardId: boardId }),
			message,
			data: {
				value,
			},
		}),
	);
}

export function* ReynauldDeChatillonProcessReactionSaga() {
	yield takeEvery(processReaction.match, worker);
}
