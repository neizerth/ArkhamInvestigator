import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadGameTranslationData } from "@shared/api";

export const loadTranslations = createAsyncThunk(
  'app/loadTranslationsData',
  loadGameTranslationData
)