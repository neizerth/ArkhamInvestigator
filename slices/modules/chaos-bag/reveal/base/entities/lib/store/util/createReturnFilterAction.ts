import { chaosTokenReturned } from "../actions";

export const createReturnFilterAction = (id: string) => (action: unknown) => {
	if (!chaosTokenReturned.match(action)) {
		return false;
	}

	const { payload } = action;
	return payload.token.id === id;
};
