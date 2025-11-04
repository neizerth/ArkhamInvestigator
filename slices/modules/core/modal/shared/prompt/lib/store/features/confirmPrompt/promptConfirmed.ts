import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import { modalPrefix } from "@modules/core/modal/shared/base/config";
import type { ProcessModalActionPayload } from "@modules/core/modal/shared/base/lib";
import { createAction } from "@reduxjs/toolkit";
import type { PromptModalData } from "../../../../model";

export type PromptConfirmedPayload<
	A extends ConfirmModalAction,
	D extends PromptModalData<A>,
> = ProcessModalActionPayload<A> & {
	modalId: string;
	value: string;
	modalData: D | null;
};

export const promptConfirmed = createAction<
	PromptConfirmedPayload<
		ConfirmModalAction,
		PromptModalData<ConfirmModalAction>
	>
>(`${modalPrefix}/promptConfirmed`);
