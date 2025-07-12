import { promptConfirmed } from "../store";

type Options = {
	actionId: string;
	modalId?: string;
};

export const createPromptModalActionFilter =
	({ modalId, actionId }: Options) =>
	(action: unknown) => {
		if (!promptConfirmed.match(action)) {
			return false;
		}

		const { payload } = action;

		if (modalId && payload.modalId !== modalId) {
			return false;
		}

		return actionId === payload.modalAction?.id;
	};
