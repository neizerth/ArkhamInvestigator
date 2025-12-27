import type { CaseReducer, Draft, PayloadAction } from "@reduxjs/toolkit";
import type { SignatureSelectionState } from "../lib/store/signatureSelection";

export type SignatureSelectionReducer<Payload = void> = CaseReducer<
	SignatureSelectionState,
	PayloadAction<Payload>
>;

export type SignatureSelectionDraft = Draft<SignatureSelectionState>;

export type SignatureSelectionHandler<Payload = void> = (
	state: SignatureSelectionDraft,
	payload: Payload,
) => void;
