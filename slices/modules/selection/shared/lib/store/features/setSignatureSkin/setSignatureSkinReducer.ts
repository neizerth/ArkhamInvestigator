import type { SelectionReducer } from "@modules/selection/shared/model";
import {
	type SetSignatureSkinPayload,
	handleSetSignatureSkin,
} from "./handleSetSignatureSkin";

export const setSignatureSkinReducer: SelectionReducer<
	SetSignatureSkinPayload
> = (state, { payload }) => {
	handleSetSignatureSkin(state, payload);
};
