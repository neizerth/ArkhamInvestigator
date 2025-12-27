import type { SignatureSelectionReducer } from "@modules/signature/selection/shared/model";
import {
	type SetSignatureSkinPayload,
	handleSetSignatureSkin,
} from "./handleSetSignatureSkin";

export const setSignatureSkinReducer: SignatureSelectionReducer<
	SetSignatureSkinPayload
> = (state, { payload }) => {
	handleSetSignatureSkin(state, payload);
};
