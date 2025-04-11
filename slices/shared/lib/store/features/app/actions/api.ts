import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../../../../api";

export const loadInvestigatorsMediaData = createAsyncThunk(
	"app/loadInvestigatorsMediaData",
	API.loadInvestigatorsMediaData,
);

export const loadInvestigatorSignatures = createAsyncThunk(
	"app/loadInvestigatorSignatures",
	API.loadSignatures,
);
