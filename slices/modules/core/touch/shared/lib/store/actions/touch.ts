import { createAction } from "@reduxjs/toolkit";
import type { TouchType } from "../../../model";

export type TouchPayload = {
	type?: string;
	canceled?: boolean;
	touchType: TouchType;
};

export const touch = createAction<TouchPayload>("touch/touch");
