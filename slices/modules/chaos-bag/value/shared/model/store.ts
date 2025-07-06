import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { ChaosTokenValueState } from "../lib";

export type ChaosTokenValueReducer<Payload = void> = StateReducer<
	ChaosTokenValueDraft,
	Payload
>;
export type ChaosTokenValueDraft = Draft<ChaosTokenValueState>;

export type ChaosTokenValueHandler<Payload = void> = (
	state: ChaosTokenValueDraft,
	payload: Payload,
) => void;
