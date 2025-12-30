import { createAction } from "@reduxjs/toolkit";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";

type ToggleSelectedSignaturePayload = {
	group: InvestigatorSignatureGroup;
	showDetails?: boolean;
};

export const toggleSelectedSignature =
	createAction<ToggleSelectedSignaturePayload>("selection/toggleSignature");
