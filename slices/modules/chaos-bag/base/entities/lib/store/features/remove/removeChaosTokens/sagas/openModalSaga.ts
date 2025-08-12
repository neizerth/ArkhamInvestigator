import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import { openConfirm } from "@modules/core/modal/shared/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";
import {
	confirmRemoveModalActionId,
	modalId,
	returnToSkillTestModalActionId,
} from "../config";
import { openRemoveChaosTokenConfirm } from "../removeChaosTokens";

function* worker({ payload }: ReturnType<typeof openRemoveChaosTokenConfirm>) {
	const { removeCount, availableToRemoveCount, type } = payload;

	const count = removeCount - availableToRemoveCount;
	const tokenCharacter = chaosToken.character[type];
	const data = {
		token: tokenCharacter,
		count,
	};

	yield put(
		openConfirm({
			id: modalId,
			data: {
				title: {
					i18nKey: "chaosToken.remove.confirm.title",
					data,
				},
				text: {
					i18nKey: "chaosToken.remove.confirm.text",
					data,
				},
				actions: [
					createConfirmModalAction({
						id: returnToSkillTestModalActionId,
						title: "chaosToken.remove.confirm.return",
						icon: "chaos-bag-thin",
						primary: false,
					}),
					createConfirmModalAction({
						id: confirmRemoveModalActionId,
						title: "Remove",
						data: payload,
					}),
				],
			},
		}),
	);
}

export function* openRemoveChaosTokenConfirmSaga() {
	yield takeEvery(openRemoveChaosTokenConfirm.match, worker);
}
