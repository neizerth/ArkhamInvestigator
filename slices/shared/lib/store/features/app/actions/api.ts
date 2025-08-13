import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../../../../api";

export const loadLocaleData = createAsyncThunk(
	"app/loadLocaleData",
	API.loadLocaleData,
);
