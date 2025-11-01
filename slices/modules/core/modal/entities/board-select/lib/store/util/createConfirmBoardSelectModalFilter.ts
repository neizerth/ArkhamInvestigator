import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	type BoardSelectModalConfirmed,
	boardSelectModalConfirmed,
} from "../features";

type Options = {
	modalId: string;
	modalActionId?: string;
};

type ModalAction = BoardSelectModalConfirmed<ConfirmModalAction>;

type ReturnAction = PayloadAction<ModalAction>;

export const createConfirmBoardSelectModalFilter = ({
	modalId,
	modalActionId,
}: Options) => {
	return (action: unknown): action is ReturnAction => {
		if (!boardSelectModalConfirmed.match(action)) {
			return false;
		}

		const { payload } = action;

		if (payload.modalId !== modalId) {
			return false;
		}

		if (modalActionId && modalActionId !== payload.modalAction.id) {
			return false;
		}

		return true;
	};
};
