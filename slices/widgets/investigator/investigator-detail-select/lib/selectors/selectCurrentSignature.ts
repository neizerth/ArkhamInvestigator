import {
	selectCurrentSignatureGroup,
	selectCurrentSignatureId,
} from "@shared/lib";
import { whereId } from "@shared/lib/util";
import type { RootState } from "@shared/model";

export const selectCurrentSignature = (state: RootState) => {
	const group = selectCurrentSignatureGroup(state);
	const signatureId = selectCurrentSignatureId(state);
	if (!group) {
		return;
	}
	if (signatureId) {
		return group.signatures.find(whereId(signatureId));
	}
	return group.signatures[0];
};
