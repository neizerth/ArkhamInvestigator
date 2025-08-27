import { createAction } from "@reduxjs/toolkit";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";

export const updateBoardSignatures = createAction<InvestigatorSignatureGroup[]>(
	"signature/updateBoardSignatures",
);
