import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { II18nState } from "./i18n";

export type I18NReducer<Payload> = CaseReducer<II18nState, PayloadAction<Payload>>
