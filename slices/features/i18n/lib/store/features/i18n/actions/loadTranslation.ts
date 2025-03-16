import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadGameTranslationData } from "../../../../../../../shared/api/gameData";
import { AppThunkCreator } from "@shared/lib";
import { setLoadingLanguage } from "../i18n";

export const fetchTranslationData = createAsyncThunk(
  'app/loadTranslationsData',
  loadGameTranslationData
)

export const loadTranslation: AppThunkCreator = (language: string) => (dispatch) => {
  dispatch(fetchTranslationData(language));
  dispatch(setLoadingLanguage(language));
}