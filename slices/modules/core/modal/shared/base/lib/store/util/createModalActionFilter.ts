import type { PayloadAction } from "@reduxjs/toolkit";
import type { BaseModalAction, BaseModalData } from "../../../model";
import {
	type ModalActionProcessedPayload,
	modalActionProcessed,
} from "../features/processModalAction";

type Options = {
	ids: string[];
	modalId?: string;
};

export type CreateModalActionFilterAction<
	Action extends BaseModalAction,
	Data extends BaseModalData<Action> = BaseModalData<Action>,
> = PayloadAction<ModalActionProcessedPayload<Action, Data>>;

export function createModalActionFilter<
	Action extends BaseModalAction,
	Data extends BaseModalData<Action>,
>({ ids, modalId }: Options) {
	return (
		action: unknown,
	): action is CreateModalActionFilterAction<Action, Data> => {
		if (!modalActionProcessed.match(action)) {
			return false;
		}
		const { payload } = action;
		const { modalAction } = payload;

		if (modalId && payload.modalId !== modalId) {
			return false;
		}

		return ids.includes(modalAction.id);
	};
}
