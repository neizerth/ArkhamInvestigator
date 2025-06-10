import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadArkhamDBInvestigatorData } from "../../../../../../../../../shared/api/arkhamDB";
import { loadGameTranslationData } from "../../../../../../../../../shared/api/gameData";

export const fetchTranslationData = createAsyncThunk(
	"i18n/loadTranslationsData",
	loadGameTranslationData,
);

export const fetchArkhamDBTranslationData = createAsyncThunk(
	"i18n/loadArkhamDBInvestigatorTranslations",
	loadArkhamDBInvestigatorData,
);
