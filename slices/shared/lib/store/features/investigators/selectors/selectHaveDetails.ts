import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "../../../../util";
import { selectSignatureGroups } from "../investigators";

export const selectHaveDetails = (id: string) =>
	createSelector([selectSignatureGroups], (groups) => {
		const group = groups.find(whereId(id));

		if (!group) {
			return false;
		}

		return group.signatures.length > 1 || group.skins?.length > 0;
	});
