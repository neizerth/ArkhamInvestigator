import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadGameTranslationData } from "../../../../../../../shared/api/gameData";

export const loadTranslations = createAsyncThunk(
  'app/loadTranslationsData',
  loadGameTranslationData
)