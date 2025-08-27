import { createAction } from "@reduxjs/toolkit";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";

export const updateSignatureGroups = createAction<InvestigatorSignatureGroup[]>(
	"signature/updateGroups",
);
