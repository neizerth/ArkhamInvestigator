import { promptConfirmed } from "../store";

type Options = {
	actionId?: string;
	modalId?: string;
};

export const createPromptModalActionFilter =
	({ modalId, actionId }: Options) =>
	(action: unknown) => {
		if (!promptConfirmed.match(action)) {
			return false;
		}

		const { payload } = action;

		if (!modalId && !actionId) {
			return false;
		}

		if (actionId && payload.modalAction?.id !== actionId) {
			return false;
		}

		return modalId === payload.modalId;
	};
