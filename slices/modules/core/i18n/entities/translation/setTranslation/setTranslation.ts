import { createAction } from "@reduxjs/toolkit";
import type { Translation } from "../../../shared/model";

export type SetTranslationPayload = {
	language: string;
	translation: Translation;
};

export const setTranslation = createAction<SetTranslationPayload>(
	"i18n/setTranslation",
);
