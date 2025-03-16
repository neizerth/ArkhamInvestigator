import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadGameTranslationData } from "../../../../../../../shared/api/gameData";

export const fetchTranslationData = createAsyncThunk(
  'app/loadTranslationsData',
  loadGameTranslationData
)
