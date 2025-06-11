import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { I18nState } from "./i18n";

export type I18NReducer<Payload> = CaseReducer<
	I18nState,
	PayloadAction<Payload>
>;
