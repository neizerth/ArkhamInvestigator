import {
	selectCurrentSignatureGroup,
	setInvestigatorSignature,
} from "@shared/lib";
import type { AppThunkCreator, InvestigatorDetailItem } from "@shared/model";

export const changeSignature: AppThunkCreator =
	(item: InvestigatorDetailItem | null) => (dispatch, getState) => {
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
