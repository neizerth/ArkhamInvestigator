import { createAction } from "@reduxjs/toolkit";

export const changeLanguage = createAction<string | null>(
	"i18n/changeLanguage",
);

export const languageChanged = createAction<string>("i18n/languageChanged");
