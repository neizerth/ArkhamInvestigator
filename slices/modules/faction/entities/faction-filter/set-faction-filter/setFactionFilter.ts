import type { FactionFilterType } from "@modules/faction/shared/model";
import { createAction } from "@reduxjs/toolkit";

export const setFactionFilter =
	createAction<FactionFilterType>("factionFilter/set");
