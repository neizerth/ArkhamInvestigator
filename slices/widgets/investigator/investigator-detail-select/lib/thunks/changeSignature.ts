import type { SignatureDetailItem as Item } from "@modules/signature/base/shared/model";
import {
	selectCurrentSignatureGroup,
	setInvestigatorSignature,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";

export const changeSignature =
	(item: Item | null): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const group = selectCurrentSignatureGroup(state);
		const code = group?.code;

		if (!code) {
			return;
		}

		dispatch(
			setInvestigatorSignature({
				code,
				signatureId: item?.value || null,
			}),
		);
	};
