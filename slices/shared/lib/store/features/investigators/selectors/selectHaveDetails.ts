import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectSignatureGroups } from "../investigators";

export const selectHaveDetails = (id: string) =>
	createSelector([selectSignatureGroups], (groups) => {
		const group = groups.find(propEq(id, "id"));

		if (!group) {
			return false;
		}

		return group.signatures.length > 1 || group.skins?.length > 0;
	});
