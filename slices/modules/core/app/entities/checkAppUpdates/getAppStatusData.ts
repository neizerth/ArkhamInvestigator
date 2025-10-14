import { dataAPI } from "@shared/api";
import type { BuildInfo } from "arkham-investigator-data";
import { v4 } from "uuid";

export const getAppStatusData = () =>
	dataAPI.get<BuildInfo>(`/status.json?v=${v4()}`);
