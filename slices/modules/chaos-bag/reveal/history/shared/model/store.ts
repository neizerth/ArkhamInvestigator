import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { ChaosBagRevealHistoryState } from "../lib/store/chaosBagRevealHistory";

export type ChaosBagRevealHistoryReducer<Payload = void> = StateReducer<
	ChaosBagRevealHistoryDraft,
	Payload
>;
export type ChaosBagRevealHistoryDraft = Draft<ChaosBagRevealHistoryState>;

export type ChaosBagRevealHistoryHandler<Payload = void> = (
	state: ChaosBagRevealHistoryDraft,
	payload: Payload,
) => void;
