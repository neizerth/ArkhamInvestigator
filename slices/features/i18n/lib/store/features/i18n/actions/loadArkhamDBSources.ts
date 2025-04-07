import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadArkhamDBInvestigatorData } from "../../../../../../../shared/api/arkhamDB";

export const loadArkhamDBSources = createAsyncThunk(
	"i18n/loadArkhamDBInvestigatorTranslations",
	loadArkhamDBInvestigatorData,
);
