import { dataAPI } from "@shared/api";
import type { BuildInfo } from "arkham-investigator-data";
import { v4 } from "uuid";

const path = `/status.json?v=${v4()}`;

export const getAppStatusData = () => dataAPI.get<BuildInfo>(path);
