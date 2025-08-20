import { modalConfirmed } from "./modalConfirmed";

type Options = {
	modalId: string;
	modalActionId?: string;
};

export const createConfirmModalFilter =
	({ modalId, modalActionId }: Options) =>
	(action: unknown) => {
		if (!modalConfirmed.match(action)) {
			return false;
		}

		const { payload } = action;

		if (payload.modalId !== modalId) {
			return false;
		}

		if (modalActionId && modalActionId !== payload.modalAction.id) {
			return false;
		}

		return true;
	};
