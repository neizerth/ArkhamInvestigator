import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { SignatureState } from "../lib";

export type SignatureReducer<Payload = void> = StateReducer<
	SignatureDraft,
	Payload
>;
export type SignatureDraft = Draft<SignatureState>;

export type SignatureHandler<Payload = void> = (
	state: SignatureDraft,
	payload: Payload,
) => void;
