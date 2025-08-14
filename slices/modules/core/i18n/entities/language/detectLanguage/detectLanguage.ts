import { createAction } from "@reduxjs/toolkit";

export type DetectLanguagePayload = {
	availableLanguages: string[];
};

export const detectLanguage = createAction<DetectLanguagePayload>(
	"i18n/detectLanguage",
);
