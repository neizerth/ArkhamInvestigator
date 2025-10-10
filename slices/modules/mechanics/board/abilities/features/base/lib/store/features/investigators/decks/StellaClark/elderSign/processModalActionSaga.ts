import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import {
	increaseBoardActualPropValue,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { i18next } from "@modules/core/i18n/shared/config";
import {
	createConfirmModalFilter,
	type modalConfirmed,
} from "@modules/core/modal/shared/actions/confirm/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import {
	getBoardDamage,
	getBoardHorror,
} from "@modules/mechanics/board/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { modalId } from "../config";

const filterAction = createConfirmModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof modalConfirmed>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const damage = getBoardDamage(board);
	const horror = getBoardHorror(board);

	const historyGroupId = v4();

	const healDamage = damage > 0;
	const healHorror = horror > 0;

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId: AbilityCode.StellaClark.elderSign,
			canUse: false,
		}),
	);

	if (healDamage) {
		yield put(
			increaseBoardActualPropValue({
				boardId,
				prop: "health",
				history: {
					type: "group",
					id: historyGroupId,
				},
			}),
		);
	}

	if (healHorror) {
		yield put(
			increaseBoardActualPropValue({
				boardId,
				prop: "sanity",
				history: {
					type: "group",
					id: historyGroupId,
				},
			}),
		);
	}

	if (!healDamage && !healHorror) {
		return;
	}

	const t = {
		and: i18next.t("preposition.and"),
		damage: i18next.t("plural.accusative.damage", {
			count: 1,
		}),
		horror: i18next.t("plural.accusative.horror", {
			count: 1,
		}),
	};

	const value =
		healDamage && healHorror
			? `${t.damage} ${t.and} ${t.horror}`
			: healDamage
				? t.damage
				: t.horror;

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "action.heal.self",
			data: {
				value,
			},
		}),
	);
}

export function* StellaClarkProcessModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
