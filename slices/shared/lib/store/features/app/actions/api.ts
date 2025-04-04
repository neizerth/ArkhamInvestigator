import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "@shared/api";

export const loadInvestigatorsMediaData = createAsyncThunk(
	"app/loadInvestigatorsMediaData",
	API.loadInvestigatorsMediaData,
);
