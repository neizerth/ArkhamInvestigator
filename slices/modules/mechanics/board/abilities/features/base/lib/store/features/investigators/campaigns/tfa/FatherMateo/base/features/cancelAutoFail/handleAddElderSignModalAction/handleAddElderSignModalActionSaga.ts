import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { selectBoardCode } from "@modules/board/base/shared/lib";
import { chaosTokensRevealed } from "@modules/chaos-bag/reveal/base/entities/lib";
import { addRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import {
	type ModalActionProcessedPayload,
	createModalActionFilter,
} from "@modules/core/modal/shared/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { addElderSignModalActionId, elderSignTokenId } from "../../../config";

const filterAction = createModalActionFilter({
	ids: [addElderSignModalActionId],
});

const abilityId = AbilityCode.FatherMateo.base;

type ModalAction = ConfirmModalAction<{
	sourceBoardId: number;
}>;

type Payload = ModalActionProcessedPayload<ModalAction>;
type Action = PayloadAction<Payload>;

function* worker({ payload }: Action) {
	const { boardId, modalAction } = payload;
	const { sourceBoardId } = modalAction.data;
	const valuesSelector = selectChaosBagTokenValues(boardId);
	const values: ReturnType<typeof valuesSelector> =
		yield select(valuesSelector);

	const codeSelector = selectBoardCode(boardId);
	const code: ReturnType<typeof codeSelector> = yield select(codeSelector);

	const value = values.elderSign;

	const token: RevealedChaosBagToken = {
		id: elderSignTokenId,
		revealId: v4(),
		type: "elderSign",
		virtual: true,
		value,
	};

	const tokens = [token];

	yield put(
		addRevealedTokens({
			tokens,
		}),
	);

	yield put(
		chaosTokensRevealed({
			code,
			boardId,
			tokens,
		}),
	);

	yield put(
		setBoardAbilityUse({
			boardId: sourceBoardId,
			abilityId,
			canUse: false,
		}),
	);
}

export function* handleFatherMateoAddElderSignModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
