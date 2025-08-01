import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { SoundState } from "../lib";

export type SoundReducer<Payload = void> = StateReducer<SoundDraft, Payload>;
export type SoundDraft = Draft<SoundState>;

export type SoundHandler<Payload = void> = (
	state: SoundDraft,
	payload: Payload,
) => void;
