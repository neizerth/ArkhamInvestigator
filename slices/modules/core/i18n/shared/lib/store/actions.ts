import { createAction } from "@reduxjs/toolkit";

export const loadLanguage = createAction<string | null>("i18n/loadLanguage");
