import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import { modalPrefix } from "@modules/core/modal/shared/base/config";
import { createAction } from "@reduxjs/toolkit";
import type { PromptModalData } from "../../../../model";

export type PromptConfirmedPayload<
	A extends ConfirmModalAction,
	D extends PromptModalData<A>,
> = {
	modalId: string;
	modalAction?: A;
	value: string;
	data: D | null;
};

export const promptConfirmed = createAction<
	PromptConfirmedPayload<
		ConfirmModalAction,
		PromptModalData<ConfirmModalAction>
	>
>(`${modalPrefix}/promptConfirmed`);
