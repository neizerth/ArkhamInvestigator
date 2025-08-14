import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";

import type { RoundTimingState } from "../lib";

export type RoundTimingReducer<Payload = void> = StateReducer<
	RoundTimingState,
	Payload
>;
export type RoundTimingDraft = Draft<RoundTimingState>;

export type RoundTimingHandler<Payload = void> = (
	state: RoundTimingDraft,
	payload: Payload,
) => void;
