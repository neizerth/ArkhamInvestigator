import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { ChaosBagState } from "../lib";

export type ChaosBagReducer<Payload> = StateReducer<ChaosBagDraft, Payload>;
export type ChaosBagDraft = Draft<ChaosBagState>;

export type ChaosBagHandlerOptions<Payload> = Payload & {
	state: ChaosBagDraft;
};

export type ChaosBagHandler<Payload> = (
	state: ChaosBagDraft,
	payload: Payload,
) => void;
