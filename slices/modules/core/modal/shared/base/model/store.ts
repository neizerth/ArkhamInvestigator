import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { ModalState } from "../lib";

export type ModalReducer<Payload = void> = StateReducer<ModalState, Payload>;
export type ModalDraft = Draft<ModalState>;

export type ModalHandler<Payload = void> = (
	state: ModalDraft,
	payload: Payload,
) => void;
