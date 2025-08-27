import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "../../../../../../../shared/lib/util";
import { selectSignatureGroups } from "../signature";

export const selectHaveDetails = (id: string) =>
	createSelector([selectSignatureGroups], (groups) => {
		const group = groups.find(whereId(id));

		if (!group) {
			return false;
		}

		return group.signatures.length > 1 || group.skins?.length > 0;
	});
