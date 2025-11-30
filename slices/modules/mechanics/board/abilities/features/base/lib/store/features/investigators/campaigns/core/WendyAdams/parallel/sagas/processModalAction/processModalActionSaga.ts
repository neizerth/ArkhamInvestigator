import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import {
	addSingleChaosToken,
	updateChaosToken,
} from "@modules/chaos-bag/base/entities/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { selectChaosBagTokenById } from "@modules/chaos-bag/base/shared/lib";
import type {
	ChaosBagToken,
	ChaosBagTokenData,
	ChaosBagTokenSealData,
} from "@modules/chaos-bag/base/shared/model";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import { closeModal } from "@modules/core/modal/shared/base/lib";
import {
	type PromptConfirmedPayload,
	createPromptModalActionFilter,
} from "@modules/core/modal/shared/prompt/lib";
import type { PromptModalData } from "@modules/core/modal/shared/prompt/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, select, takeEvery } from "redux-saga/effects";
import { modalId } from "../../config";

const filterAction = createPromptModalActionFilter({
	modalId,
});

type ModalActionPayload = {
	token: ChaosBagToken;
	sourceType: "chaosBag" | "history";
};

type ModalAction = ConfirmModalAction<ModalActionPayload>;
type ModalData = PromptModalData<ModalAction>;
type Payload = PromptConfirmedPayload<ModalAction, ModalData>;

type Action = PayloadAction<Payload>;

function* worker({ payload }: Action) {
	const { modalAction, boardId, value } = payload;

	if (!modalAction) {
		return;
	}

	yield put(
		closeModal({
			id: modalId,
			source: "effect",
		}),
	);

	const { data } = modalAction;

	const { token, sourceType } = data;

	const sealData: ChaosBagTokenSealData = {
		type: "enemy",
		title: value,
	};

	const tokenPayload: Partial<ChaosBagTokenData> = {
		sealed: true,
		sealData,
		afterReveal: {
			type: "return",
			count: 1,
		},
	};

	const tokenSelector = selectChaosBagTokenById(token.id);

	const existedToken: ReturnType<typeof tokenSelector> =
		yield select(tokenSelector);

	// returning a revealed bless/curse token to the chaos bag
	if (sourceType === "history" && !existedToken) {
		yield put(
			addSingleChaosToken({
				...token,
				...tokenPayload,
			}),
		);
	}

	yield put(
		updateChaosToken({
			id: token.id,
			data: tokenPayload,
		}),
	);

	const tokenCharacter = chaosToken.character[token.type];

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "chaosBag.sealToken",
			data: {
				token: tokenCharacter,
			},
		}),
	);
}

export function* ParallelWendyAdamsProcessModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
