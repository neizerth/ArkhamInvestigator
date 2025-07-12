import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { modalPrefix } from "../../../../config";
import type {
	BaseModalAction,
	BaseModalData,
	ModalType,
} from "../../../../model";

export type ProcessModalActionPayload<Action extends BaseModalAction> =
	Partial<PropsWithBoardId> & {
		modalAction: Action;
	};

export const processModalAction = createAction<
	ProcessModalActionPayload<BaseModalAction>
>(`${modalPrefix}/processAction`);

export type ModalActionProcessedPayload<
	Action extends BaseModalAction,
	Data extends BaseModalData<Action> = BaseModalData<Action>,
> = ProcessModalActionPayload<Action> & {
	modalId: string;
	modalType: ModalType;
	modalData: Data;
};

export const modalActionProcessed = createAction<
	ModalActionProcessedPayload<BaseModalAction, BaseModalData<BaseModalAction>>
>(`${modalPrefix}/actionProcessed`);
