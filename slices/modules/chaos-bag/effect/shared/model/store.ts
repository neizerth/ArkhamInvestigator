import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { ChaosBagEffectState } from "../lib";

export type ChaosBagEffectReducer<Payload = void> = StateReducer<
	ChaosBagEffectDraft,
	Payload
>;
export type ChaosBagEffectDraft = Draft<ChaosBagEffectState>;

export type ChaosBagEffectHandlerOptions<Payload> = Payload & {
	state: ChaosBagEffectDraft;
};

export type ChaosBagEffectHandler<Payload = void> = (
	state: ChaosBagEffectDraft,
	payload: Payload,
) => void;
