import type { CaseReducer, Draft, PayloadAction } from "@reduxjs/toolkit";
import type { I18NState } from "../lib/store/i18n";

export type I18NReducer<Payload> = CaseReducer<
	I18NState,
	PayloadAction<Payload>
>;

export type I18NDraft = Draft<I18NState>;

export type I18NHandler<Payload = void> = (
	state: I18NDraft,
	payload: Payload,
) => void;
