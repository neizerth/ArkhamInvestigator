import { modalPrefix } from "@modules/core/modal/shared/base/config";
import type { OpenModalPayload } from "@modules/core/modal/shared/base/lib";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import { createAction } from "@reduxjs/toolkit";
import type { ConfirmModalData } from "../../../../model";

export type OpenConfirmPayload<
	Action extends BaseModalAction,
	Data extends ConfirmModalData<Action>,
> = Omit<OpenModalPayload<Action, Data>, "type">;

export const openConfirm = createAction<
	OpenConfirmPayload<BaseModalAction, ConfirmModalData<BaseModalAction>>
>(`${modalPrefix}/openConfirm`);
