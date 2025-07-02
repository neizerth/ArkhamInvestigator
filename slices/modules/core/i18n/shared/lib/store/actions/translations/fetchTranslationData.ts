import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	loadArkhamDBInvestigatorData,
	loadGameTranslationData,
} from "@shared/api";

export const fetchTranslationData = createAsyncThunk(
	"i18n/loadTranslationsData",
	loadGameTranslationData,
);

export const fetchArkhamDBTranslationData = createAsyncThunk(
	"i18n/loadArkhamDBInvestigatorTranslations",
	loadArkhamDBInvestigatorData,
);
