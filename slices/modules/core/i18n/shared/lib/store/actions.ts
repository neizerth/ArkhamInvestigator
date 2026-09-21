import { createAction } from "@reduxjs/toolkit";

export const loadLanguage = createAction<string | null>("i18n/loadLanguage");

export const loadLanguageFailed = createAction<string>(
	"i18n/loadLanguageFailed",
);
