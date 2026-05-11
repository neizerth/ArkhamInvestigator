import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { ChaosBagState } from "../lib";

export type ChaosBagReducer<Payload = void> = StateReducer<
	ChaosBagDraft,
	Payload
>;
export type ChaosBagDraft = Draft<ChaosBagState>;

export type ChaosBagMutationParams<P extends object = Record<string, never>> = {
	state: ChaosBagDraft;
	/** True when applying an action deserialized from TCP. */
	remote: boolean;
} & P;

export type ChaosBagMutationHandler<P extends object> = (
	params: ChaosBagMutationParams<P>,
) => void;

export type ChaosBagChangeSource = "ui" | "effect";
