import { singleChaosTokenReturned } from "../features/return/returnSingleChaosToken/returnSingleChaosToken";

export const createReturnFilterAction = (id: string) => (action: unknown) => {
	if (!singleChaosTokenReturned.match(action)) {
		return false;
	}

	const { payload } = action;
	return payload.token.id === id;
};
