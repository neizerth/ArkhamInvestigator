import { goToPage } from "@modules/core/router/shared/lib";
import { selectReferenceCard } from "@modules/stories/shared/lib";
import { routes } from "@shared/config";
import type { AppThunk } from "@shared/model";

type OpenReferenceCardPayload = {
	returnToRevealModal?: "yes" | "no";
};

export const openReferenceCard =
	({ returnToRevealModal }: OpenReferenceCardPayload = {}): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const card = selectReferenceCard(state);

		const page = card
			? routes.chaosBagReferenceView
			: routes.chaosBagReferenceEdit;

		dispatch(
			goToPage({
				pathname: page,
				params: {
					returnToRevealModal,
				},
			}),
		);
	};
