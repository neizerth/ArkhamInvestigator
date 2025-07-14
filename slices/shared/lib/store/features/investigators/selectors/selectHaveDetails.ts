import type { RootState } from "@shared/model";
import { whereId } from "../../../../util";
import { selectSignatureGroups } from "../investigators";

export const selectHaveDetails = (id: string) => (state: RootState) => {
	const groups = selectSignatureGroups(state);
	const group = groups.find(whereId(id));

	if (!group) {
		return false;
	}

	return group.signatures.length > 1 || group.skins?.length > 0;
};
