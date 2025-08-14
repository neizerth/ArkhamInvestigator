import { createAction } from "@reduxjs/toolkit";

export const restoreTranslation = createAction<string | null>(
	"i18n/restoreTranslation",
);

export const translationRestored = createAction<string>(
	"i18n/translationRestored",
);
