import { modalPrefix } from "@modules/core/modal/shared/base/config";
import type { OpenModalPayload } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import { createAction } from "@reduxjs/toolkit";
import type { ConfirmModalData } from "../../../../model";

export type OpenConfirmPayloadData<Action extends BaseModalAction> =
	ConfirmModalData<Action>;

export type OpenConfirmPayload<Action extends BaseModalAction> = Omit<
	OpenModalPayload<OpenConfirmPayloadData<Action>>,
	"type"
>;

export const openConfirm = createAction<OpenConfirmPayload<BaseModalAction>>(
	`${modalPrefix}/openConfirm`,
);
