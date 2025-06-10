import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadArkhamDBInvestigatorData } from "@shared/api";

export const loadArkhamDBSources = createAsyncThunk(
	"i18n/loadArkhamDBInvestigatorTranslations",
	loadArkhamDBInvestigatorData,
);
