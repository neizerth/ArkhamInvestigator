import {
	selectCurrentInvestigatorDetails,
	setInvestigatorVariant,
} from "@shared/lib";
import type { AppThunkCreator, InvestigatorDetailItem } from "@shared/model";

export const changeVariant: AppThunkCreator =
	(item: InvestigatorDetailItem | null) => (dispatch, getState) => {
		const state = getState();
		const details = selectCurrentInvestigatorDetails(state);
		const code = details?.investigator.code;

		if (!code) {
			return;
		}

		dispatch(
			setInvestigatorVariant({
				code,
				variantId: item?.value || null,
			}),
		);
	};
