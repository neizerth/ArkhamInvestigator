import {
	selectCurrentSignatureGroup,
	setInvestigatorSignature,
} from "@shared/lib";
import type { AppThunk, InvestigatorDetailItem } from "@shared/model";

export const changeSignature =
	(item: InvestigatorDetailItem | null): AppThunk =>
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
