import { modalPrefix } from "@modules/core/modal/shared/base/config";

import { createAction } from "@reduxjs/toolkit";
import type {
	BaseModalAction,
	BaseModalData,
	ModalType,
} from "../../../../model";

type CloseModalSource<A extends BaseModalAction> =
	| {
			source: "action";
			modalAction: A;
	  }
	| {
			source: "ui" | "effect" | "backButton";
	  };

export type CloseModalPayload<A extends BaseModalAction> = {
	id?: string;
} & CloseModalSource<A>;

export const closeModal = createAction<CloseModalPayload<BaseModalAction>>(
	`${modalPrefix}/close`,
);

export type ModalClosedPayload<
	A extends BaseModalAction,
	D extends BaseModalData<A>,
> = CloseModalSource<A> & {
	modalType: ModalType;
	modalId: string;
	modalAction?: A;
	data: D | null;
};

export const modalClosed = createAction<
	ModalClosedPayload<BaseModalAction, BaseModalData<BaseModalAction>>
>(`${modalPrefix}/closed`);
