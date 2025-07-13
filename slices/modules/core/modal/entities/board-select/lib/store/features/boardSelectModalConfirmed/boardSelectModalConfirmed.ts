import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import { modalPrefix } from "@modules/core/modal/shared/base/config";
import type { ModalActionProcessedPayload } from "@modules/core/modal/shared/base/lib";
import { createAction } from "@reduxjs/toolkit";
import type { BoardSelectModalData } from "../../../../model";

export type BoardSelectModalConfirmed<
	A extends ConfirmModalAction,
	D extends BoardSelectModalData<A> = BoardSelectModalData<A>,
> = ModalActionProcessedPayload<A, D> & {
	value: number;
};

export const boardSelectModalConfirmed = createAction<
	BoardSelectModalConfirmed<ConfirmModalAction>
>(`${modalPrefix}/boardSelectConfirmed`);
