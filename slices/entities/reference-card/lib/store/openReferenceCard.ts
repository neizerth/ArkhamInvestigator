import { routes } from "@shared/config";
import { goToPage, selectReferenceCard } from "@shared/lib";
import type { AppThunk } from "@shared/model";

export const openReferenceCard = (): AppThunk => (dispatch, getState) => {
	const state = getState();

	const card = selectReferenceCard(state);

	const page = card
		? routes.chaosBagReferenceView
		: routes.chaosBagReferenceEdit;

	dispatch(goToPage(page));
};
