import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadInvestigatorsData } from "@shared/api";

export const loadAppData = createAsyncThunk(
  'app/loadData',
  loadInvestigatorsData
)