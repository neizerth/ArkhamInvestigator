import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { ChaosBagRevealModalState } from "../lib";

export type ChaosBagRevealModalReducer<Payload = void> = StateReducer<
	ChaosBagRevealModalDraft,
	Payload
>;
export type ChaosBagRevealModalDraft = Draft<ChaosBagRevealModalState>;

export type ChaosBagRevealModalHandler<Payload = void> = (
	state: ChaosBagRevealModalDraft,
	payload: Payload,
) => void;
