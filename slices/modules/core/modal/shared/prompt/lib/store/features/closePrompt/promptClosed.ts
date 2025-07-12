import { modalPrefix } from "@modules/core/modal/shared/base/config";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";
import { createAction } from "@reduxjs/toolkit";
import type { PromptModalData } from "../../../../model";

export type PromptClosedPayload<A extends BaseModalAction> = {
	modalId: string;
	modalAction?: A;
	data: PromptModalData<A>;
};

export const promptClosed = createAction<PromptClosedPayload<BaseModalAction>>(
	`${modalPrefix}/promptClosed`,
);
