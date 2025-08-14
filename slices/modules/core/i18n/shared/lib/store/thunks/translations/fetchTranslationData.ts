import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadGameTranslationData } from "@shared/api";

export const fetchTranslationData = createAsyncThunk(
	"i18n/loadTranslationsData",
	loadGameTranslationData,
);
