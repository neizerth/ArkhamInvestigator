import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadGameTranslationData } from "../../../../../../../shared/api/gameData";

export const loadTranslationData = createAsyncThunk(
  'app/loadTranslationsData',
  loadGameTranslationData
)