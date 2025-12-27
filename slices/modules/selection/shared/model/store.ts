import type { CaseReducer, Draft, PayloadAction } from "@reduxjs/toolkit";
import type { SelectionState } from "../lib/store/selection";

export type SelectionReducer<Payload = void> = CaseReducer<
	SelectionState,
	PayloadAction<Payload>
>;

export type SelectionDraft = Draft<SelectionState>;

export type SelectionHandler<Payload = void> = (
	state: SelectionDraft,
	payload: Payload,
) => void;
