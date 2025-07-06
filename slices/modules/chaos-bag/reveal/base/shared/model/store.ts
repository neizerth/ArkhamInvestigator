import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { ChaosBagRevealState } from "../lib";

export type ChaosBagRevealReducer<Payload = void> = StateReducer<
	ChaosBagRevealDraft,
	Payload
>;
export type ChaosBagRevealDraft = Draft<ChaosBagRevealState>;

export type ChaosBagRevealHandler<Payload = void> = (
	state: ChaosBagRevealDraft,
	payload: Payload,
) => void;
