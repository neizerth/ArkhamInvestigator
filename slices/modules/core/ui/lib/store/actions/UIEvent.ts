import type { UIEventType } from "@modules/core/ui/model";
import { createAction } from "@reduxjs/toolkit";

export type UIEventPayload = {
	id?: string;
	source: string;
	type: UIEventType;
	canceled?: boolean;
};

export const UIEvent = createAction<UIEventPayload>("ui/event");
