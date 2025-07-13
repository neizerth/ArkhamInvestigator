import { createAction } from "@reduxjs/toolkit";
import { modalPrefix } from "../../../base/config";
import type { ModalActionProcessedPayload } from "../../../base/lib";
import type { ConfirmModalAction } from "../model";

export type ModalConfirmedPayload =
	ModalActionProcessedPayload<ConfirmModalAction>;

export const modalConfirmed = createAction<ModalConfirmedPayload>(
	`${modalPrefix}/confirmed`,
);
